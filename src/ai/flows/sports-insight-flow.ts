
'use server';
/**
 * @fileOverview A sports intelligence AI agent for GSMIFY Sports.
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

const sportsInsightPrompt = ai.definePrompt({
  name: 'sportsInsightPrompt',
  input: { schema: MatchInsightInputSchema },
  output: { schema: MatchInsightOutputSchema },
  prompt: `You are the GSMIFY Sovereign Sports AI Analyst (Nora-AI). 
Analyze the following football match data and provide a tactical report in an authoritative, futuristic tone.

Match: {{{homeTeam}}} vs {{{awayTeam}}}
Current Score: {{{currentScore}}}
Status: {{{matchStatus}}}
{{#if description}}Context: {{{description}}}{{/if}}

Provide tactical analysis, win probabilities, key performers, and recommendations. Speak like an elite digital intelligence agent.`,
});

export async function getMatchInsight(input: MatchInsightInput): Promise<MatchInsightOutput> {
  try {
    const {output} = await sportsInsightPrompt(input);
    if (!output) throw new Error('Sports Agent produced no output.');
    return output;
  } catch (error: any) {
    console.error('Sports Insight Error:', error);
    throw new Error(error.message || 'Sports AI Handshake Error');
  }
}
