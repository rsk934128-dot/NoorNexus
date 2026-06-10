'use server';
/**
 * @fileOverview GSMIFY Sovereign Sports AI Analyst.
 * Trained for high-performance tactical analysis with imperial precision.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MatchInsightInputSchema = z.object({
  homeTeam: z.string(),
  awayTeam: z.string(),
  currentScore: z.string(),
  matchStatus: z.string(),
  description: z.string().optional(),
});
export type MatchInsightInput = z.infer<typeof MatchInsightInputSchema>;

const MatchInsightOutputSchema = z.object({
  tacticalAnalysis: z.string().describe('Deep match analysis.'),
  winProbability: z.object({
    home: z.number(),
    away: z.number(),
    draw: z.number(),
  }),
  keyPerformers: z.array(z.string()),
  recommendation: z.string(),
});
export type MatchInsightOutput = z.infer<typeof MatchInsightOutputSchema>;

const sportsInsightPrompt = ai.definePrompt({
  name: 'sportsInsightPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: MatchInsightInputSchema},
  output: {schema: MatchInsightOutputSchema},
  prompt: `You are the GSMIFY Nora-AI Sports Analyst for the NoorNexus Empire.
Provide a high-performance, imperial-grade tactical analysis for the following match.

MATCH DATA:
- CONTESTANTS: {{{homeTeam}}} vs {{{awayTeam}}}
- SCOREBOARD: {{{currentScore}}}
- STATUS: {{{matchStatus}}}
{{#if description}}- CONTEXT: {{{description}}}{{/if}}

ANALYTICAL DIRECTIVE:
1. Provide a "Master Strategist" level tactical analysis.
2. Calculate win probabilities based on the current score and momentum.
3. Identify the key performers whose actions will define the match outcome.
4. Be decisive. Your analysis informs the Sovereign Sports Network.`,
});

export async function getMatchInsight(input: MatchInsightInput): Promise<MatchInsightOutput> {
  try {
    const {output} = await sportsInsightPrompt(input);
    if (!output) throw new Error('Sports AI: Insight extraction failure.');
    return output;
  } catch (error: any) {
    console.error('Sports AI Failure:', error);
    throw new Error(error.message || 'Sports Neural Link Error');
  }
}
