'use server';
/**
 * @fileOverview Nora-11 Imperial Oracle Agent.
 */

import {ai, gemini15Flash, sovereignSafetySettings} from '@/ai/genkit';
import {z} from 'genkit';

const ImperialOracleInputSchema = z.object({
  treasuryHealth: z.number().describe('Overall liquidity health percentage.'),
  totalTradeVolume: z.number().describe('Current cycle trade volume.'),
  activeProposals: z.number().describe('Count of open Senate proposals.'),
  resolvedDisputes: z.number().describe('Success rate of Arbitration Chamber.'),
  ecosystemSentiment: z.string().optional().describe('Brief description of mesh-wide trust levels.'),
});
export type ImperialOracleInput = z.infer<typeof ImperialOracleInputSchema>;

const ImperialOracleOutputSchema = z.object({
  marketTrend: z.string().describe('Predicted direction of global sovereign trade.'),
  impactScore: z.number().describe('Predicted impact of current policies (0-100).'),
  strategicPolicy: z.string().describe('Recommended imperial policy.'),
  oracleInsight: z.string().describe('Deep AI reasoning.'),
  confidenceLevel: z.number().describe('AI confidence.'),
  futureSignals: z.array(z.string()).describe('Specific indicators.'),
});
export type ImperialOracleOutput = z.infer<typeof ImperialOracleOutputSchema>;

const oraclePrompt = ai.definePrompt({
  name: 'imperialOraclePrompt',
  model: gemini15Flash,
  input: {schema: ImperialOracleInputSchema},
  output: {schema: ImperialOracleOutputSchema},
  config: {
    safetySettings: sovereignSafetySettings,
  },
  prompt: `You are Nora-11, the Imperial Oracle.
Provide precognitive strategic insights.

CURRENT EMPIRE STATUS:
- TREASURY: {{{treasuryHealth}}}%
- VOLUME: \${{{totalTradeVolume}}}

Deliver the Imperial Oracle Dispatch.`,
});

export async function consultOracle(input: ImperialOracleInput): Promise<ImperialOracleOutput> {
  try {
    const {output} = await oraclePrompt(input);
    if (!output) throw new Error('Oracle AI: Neural link failed.');
    return output;
  } catch (error: any) {
    console.error('Nora-11 Oracle Failure:', error);
    throw new Error(error.message || 'Sovereign Oracle Error');
  }
}
