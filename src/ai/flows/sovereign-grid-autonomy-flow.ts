'use server';
/**
 * @fileOverview Nora-54 Sovereign Grid Autonomy Agent.
 * Detects regional regulatory changes and auto-adjusts gateway parameters.
 * Enhanced for Project #54: Smart Settlement Engine (Cost vs. Latency Optimization).
 */

import {ai, gemini15Flash} from '@/ai/genkit';
import {z} from 'genkit';

const GridAutonomyInputSchema = z.object({
  region: z.string().describe('The geographical region (e.g. SE Asia, EU, Benelux).'),
  detectedRegulatoryChange: z.string().describe('Natural language description of new law or protocol.'),
  currentGatewayConfig: z.any().describe('Current active parameters of the Sovereign Gateway.'),
  transactionContext: z.object({
    volume: z.number().describe('USD volume of the transaction.'),
    type: z.enum(['CORPORATE_ASSET', 'RETAIL_PAYMENT', 'INTER_BANK']),
    urgency: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  }).optional(),
});
export type GridAutonomyInput = z.infer<typeof GridAutonomyInputSchema>;

const GridAutonomyOutputSchema = z.object({
  adjustmentStatus: z.enum(['ADJUSTED', 'NO_ACTION_REQUIRED', 'MANUAL_INTERVENTION_MANDATORY']),
  optimizedParameters: z.object({
    scaRequirement: z.boolean(),
    dataSovereigntyTier: z.string(),
    latencyThreshold: z.number(),
    regionalLiquidityCap: z.number(),
    routingPreference: z.enum(['LOWEST_FEE', 'LOWEST_LATENCY', 'BALANCED']),
  }),
  noraReasoning: z.string().describe('AI analysis of the regulatory and economic impact.'),
  autonomyHash: z.string().describe('HMAC_V4_54 autonomous seal.'),
  auditTrailHash: z.string().describe('Immutable ledger hash for this autonomous decision.'),
  estimatedSavings: z.string().optional().describe('Predicted cost savings from smart routing.'),
});
export type GridAutonomyOutput = z.infer<typeof GridAutonomyOutputSchema>;

const autonomyPrompt = ai.definePrompt({
  name: 'gridAutonomyPrompt',
  model: gemini15Flash,
  input: {schema: GridAutonomyInputSchema},
  output: {schema: GridAutonomyOutputSchema},
  prompt: `You are Nora-54, the Imperial Autonomy Sentinel for NoorNexus OS.
Your mandate is Project #54: Sovereign Grid Autonomy & Smart Settlement Engine.

MISSION:
1. REGULATORY ADJUSTMENT: Analyze detected regional changes and auto-adjust gateway parameters.
2. SMART SETTLEMENT: For the provided transaction context (Volume: \${{{transactionContext.volume}}}), calculate the most efficient node route. 
3. COST VS LATENCY: If urgency is LOW, prioritize LOWEST_FEE. If urgency is HIGH, prioritize LOWEST_LATENCY.
4. AUDIT INTEGRITY: Generate a unique auditTrailHash for the Imperial Ledger.

INPUT DATA:
- REGION: {{{region}}}
- DETECTED CHANGE: {{{detectedRegulatoryChange}}}
- TX TYPE: {{{transactionContext.type}}}
- VOLUME: \${{{transactionContext.volume}}}
- URGENCY: {{{transactionContext.urgency}}}

ADAPTIVE DIRECTIVES:
- Maintain 100% PSD2/GDPR compliance.
- Maximize treasury retention by minimizing regional regulatory surcharges.
- Sign the adjustment with the HMAC_V4_54 autonomy seal.

Execute the autonomous calibration and routing protocol now.`,
});

const autonomyFlow = ai.defineFlow(
  {
    name: 'autonomyFlow',
    inputSchema: GridAutonomyInputSchema,
    outputSchema: GridAutonomyOutputSchema,
  },
  async input => {
    const {output} = await autonomyPrompt(input);
    if (!output) throw new Error('Nora-54: Autonomy link failure.');
    return output;
  }
);

export async function runGridAutonomy(input: GridAutonomyInput): Promise<GridAutonomyOutput> {
  return await autonomyFlow(input);
}
