'use server';
/**
 * @fileOverview Nora-AI Sports Analyst.
 */

import {ai, gemini15Flash, sovereignSafetySettings} from '@/ai/genkit';
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
  model: gemini15Flash,
  input: {schema: MatchInsightInputSchema},
  output: {schema: MatchInsightOutputSchema},
  config: {
    safetySettings: sovereignSafetySettings,
  },
  prompt: `You are the Nora-AI Sports Analyst.
Provide high-performance tactical analysis.

MATCH: {{{homeTeam}}} vs {{{awayTeam}}}
SCORE: {{{currentScore}}}

Be decisive. Your analysis informs the Sovereign Sports Network.`,
});

export async function getMatchInsight(input: MatchInsightInput): Promise<MatchInsightOutput> {
  try {
    const {output} = await sportsInsightPrompt(input);
    if (!output) throw new Error('Sports AI: Insight failure.');
    return output;
  } catch (error: any) {
    console.error('Sports AI Failure:', error);
    throw new Error(error.message || 'Sports Neural Link Error');
  }
}
