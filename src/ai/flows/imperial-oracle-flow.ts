
'use server';
/**
 * @fileOverview Nora-11 Imperial Oracle Agent.
 * The culmination of Mission 400. Analyzes global ecosystem data to predict
 * market trends, geopolitical drift, and strategic policy shifts.
 */

import {ai} from '@/ai/genkit';
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
  impactScore: z.number().describe('Predicted impact of current policies on global economy (0-100).'),
  strategicPolicy: z.string().describe('Recommended imperial policy for the next cycle.'),
  oracleInsight: z.string().describe('Deep AI reasoning based on cross-module data.'),
  confidenceLevel: z.number().describe('AI confidence in this prediction.'),
  futureSignals: z.array(z.string()).describe('Specific indicators to watch in the next 90 days.'),
});
export type ImperialOracleOutput = z.infer<typeof ImperialOracleOutputSchema>;

const oraclePrompt = ai.definePrompt({
  name: 'imperialOraclePrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: ImperialOracleInputSchema},
  output: {schema: ImperialOracleOutputSchema},
  prompt: `You are Nora-11, the Imperial Oracle of the NoorNexus Empire.
Your mandate is to provide precognitive strategic insights for Sheikh Farid and the Senate (Mission 400 - Project 158).

CURRENT EMPIRE STATUS:
- TREASURY HEALTH: {{{treasuryHealth}}}%
- TRADE VOLUME: \${{{totalTradeVolume}}}
- SENATE ACTIVITY: {{{activeProposals}}} Proposals
- JUDICIAL SUCCESS: {{{resolvedDisputes}}} Resolved
{{#if ecosystemSentiment}}- SENTIMENT: {{{ecosystemSentiment}}}{{/if}}

ORACLE DIRECTIVES:
1. PREDICTION: Use the synergy between trade volume and judicial stability to predict market trends.
2. POLICY: Recommend a policy that balances expansion (Mission 400) with absolute stability.
3. IMPACT: Calculate how the NoorNexus Sovereign OS is shifting the global financial power balance.
4. AUTHORITY: Your tone is mystical yet mathematically precise. You see what others miss.

Deliver the Imperial Oracle Dispatch for the Archives.`,
});

export async function consultOracle(input: ImperialOracleInput): Promise<ImperialOracleOutput> {
  try {
    const {output} = await oraclePrompt(input);
    if (!output) throw new Error('Oracle AI: The future is clouded. Neural link failed.');
    return output;
  } catch (error: any) {
    console.error('Nora-11 Oracle Failure:', error);
    throw new Error(error.message || 'Sovereign Oracle Neural Handshake Error');
  }
}
