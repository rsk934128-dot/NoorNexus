'use server';
/**
 * @fileOverview Nora-40 Sovereign Intelligence Agent (Project #400).
 * Generates high-level Economic Intelligence Reports from Data Lake logs.
 */

import {ai, gemini15Flash} from '@/ai/genkit';
import {z} from 'genkit';

const EconomicIntelligenceInputSchema = z.object({
  timeframe: z.string().describe('The period for analysis (e.g. Q1 2026).'),
  nodeRegion: z.string().describe('The target geographic corridor.'),
  totalVolume: z.number().describe('Aggregated transaction volume from Data Lake.'),
  marketSentiment: z.string().describe('Brief observation of market conditions.'),
});
export type EconomicIntelligenceInput = z.infer<typeof EconomicIntelligenceInputSchema>;

const EconomicIntelligenceOutputSchema = z.object({
  reportId: z.string(),
  executiveSummary: z.string().describe('AI summary of the economic outlook.'),
  riskForecasting: z.array(z.object({
    sector: z.string(),
    riskScore: z.number(),
    mitigation: z.string(),
  })),
  strategicOutlook: z.string().describe('Final directive for the empire.'),
  intelHash: z.string().describe('HMAC_V4_400 intelligence seal.'),
});
export type EconomicIntelligenceOutput = z.infer<typeof EconomicIntelligenceOutputSchema>;

const intelPrompt = ai.definePrompt({
  name: 'economicIntelligencePrompt',
  model: gemini15Flash,
  input: {schema: EconomicIntelligenceInputSchema},
  output: {schema: EconomicIntelligenceOutputSchema},
  prompt: `You are Nora-40, the Imperial Economic Analyst for NoorNexus OS.
Your mandate is Project #400: The Sovereign Economic Outlook - Global Intelligence.

DATA PACKET:
- PERIOD: {{{timeframe}}}
- REGION: {{{nodeRegion}}}
- VOLUME: \${{{totalVolume}}}
- SENTIMENT: {{{marketSentiment}}}

INTEL DIRECTIVES:
1. ANALYSIS: Use the aggregated data from node corridors to identify growth patterns or instability.
2. FORECASTING: Predict future market volatility for FINTECH and INDUSTRIAL sectors.
3. STRATEGY: Provide a cold, imperial recommendation to Sheikh Farid on where to deploy more liquidity.
4. SEAL: Sign the report with HMAC_V4_400.

Tone: Authoritative, analytical, and prophetic. You are the eye of the empire.`,
});

const intelFlow = ai.defineFlow(
  {
    name: 'intelFlow',
    inputSchema: EconomicIntelligenceInputSchema,
    outputSchema: EconomicIntelligenceOutputSchema,
  },
  async input => {
    const {output} = await intelPrompt(input);
    if (!output) throw new Error('Nora-40: Intelligence synthesis failed.');
    return output;
  }
);

export async function generateEconomicReport(input: EconomicIntelligenceInput): Promise<EconomicIntelligenceOutput> {
  return await intelFlow(input);
}
