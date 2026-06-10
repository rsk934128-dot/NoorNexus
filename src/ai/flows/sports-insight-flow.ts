'use server';
/**
 * @fileOverview A sports intelligence AI agent for GSMIFY Sports.
 * 
 * - getMatchInsight - A function that generates tactical insights for a match.
 * - MatchInsightInput - The input type for the match insight function.
 * - MatchInsightOutput - The return type for the match insight function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const MatchInsightInputSchema = z.object({
  homeTeam: z.string(),
  awayTeam: z.string(),
  currentScore: z.string(),
  matchStatus: z.string(),
  description: z.string().optional(),
});
export type MatchInsightInput = z.infer<typeof MatchInsightInputSchema>;

const MatchInsightOutputSchema = z.object({
  tacticalAnalysis: z.string().describe('Detailed tactical analysis of the match.'),
  winProbability: z.object({
    home: z.number().describe('Win probability for home team (0-100)'),
    away: z.number().describe('Win probability for away team (0-100)'),
    draw: z.number().describe('Probability of a draw (0-100)'),
  }),
  keyPerformers: z.array(z.string()).describe('List of potential game changers.'),
  recommendation: z.string().describe('AI recommendation for viewers or managers.'),
});
export type MatchInsightOutput = z.infer<typeof MatchInsightOutputSchema>;

export async function getMatchInsight(input: MatchInsightInput): Promise<MatchInsightOutput> {
  return sportsInsightFlow(input);
}

const sportsInsightPrompt = ai.definePrompt({
  name: 'sportsInsightPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: { schema: MatchInsightInputSchema },
  output: { schema: MatchInsightOutputSchema },
  prompt: `You are the GSMIFY Sovereign Sports AI Analyst (Nora-AI). 
Analyze the following football match data and provide a tactical report in an authoritative, futuristic tone.

Match: {{{homeTeam}}} vs {{{awayTeam}}}
Current Score: {{{currentScore}}}
Status: {{{matchStatus}}}
{{#if description}}Context: {{{description}}}{{/if}}

Provide:
1. A deep tactical analysis of the current situation.
2. Win probabilities for both teams and a draw.
3. Key performers to watch.
4. A final recommendation.

Speak like a high-end digital infrastructure intelligence agent.`,
});

const sportsInsightFlow = ai.defineFlow(
  {
    name: 'sportsInsightFlow',
    inputSchema: MatchInsightInputSchema,
    outputSchema: MatchInsightOutputSchema,
  },
  async (input) => {
    const { output } = await sportsInsightPrompt(input);
    if (!output) throw new Error('AI failed to generate sports insight.');
    return output;
  }
);
