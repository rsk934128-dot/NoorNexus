'use server';
/**
 * @fileOverview GSMIFY Sovereign Sports AI Analyst using Gemini 1.5 Flash.
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
  prompt: `You are the GSMIFY Nora-AI Sports Analyst.
Provide a high-performance tactical analysis for the following match:

MATCH: {{{homeTeam}}} vs {{{awayTeam}}}
SCORE: {{{currentScore}}}
STATUS: {{{matchStatus}}}
{{#if description}}CONTEXT: {{{description}}}{{/if}}

Analyze win probabilities and key performer metrics with imperial precision.`,
});

export async function getMatchInsight(input: MatchInsightInput): Promise<MatchInsightOutput> {
  try {
    const {output} = await sportsInsightPrompt(input);
    if (!output) throw new Error('Sports AI failed to generate insight.');
    return output;
  } catch (error: any) {
    console.error('Sports AI Failure:', error);
    throw new Error(error.message || 'Sports Neural Link Error');
  }
}
