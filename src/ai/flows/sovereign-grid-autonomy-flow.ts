'use server';
/**
 * @fileOverview Nora-54 Sovereign Grid Autonomy Agent.
 * Detects regional regulatory changes and auto-adjusts gateway parameters.
 * Part of Mission 400 - Project #54.
 */

import {ai, gemini15Flash} from '@/ai/genkit';
import {z} from 'genkit';

const GridAutonomyInputSchema = z.object({
  region: z.string().describe('The geographical region (e.g. SE Asia, EU, Middle East).'),
  detectedRegulatoryChange: z.string().describe('Natural language description of new law or protocol.'),
  currentGatewayConfig: z.any().describe('Current active parameters of the Sovereign Gateway.'),
});
export type GridAutonomyInput = z.infer<typeof GridAutonomyInputSchema>;

const GridAutonomyOutputSchema = z.object({
  adjustmentStatus: z.enum(['ADJUSTED', 'NO_ACTION_REQUIRED', 'MANUAL_INTERVENTION_MANDATORY']),
  optimizedParameters: z.object({
    scaRequirement: z.boolean(),
    dataSovereigntyTier: z.string(),
    latencyThreshold: z.number(),
    regionalLiquidityCap: z.number(),
  }),
  noraReasoning: z.string().describe('AI analysis of the regulatory impact.'),
  autonomyHash: z.string().describe('HMAC_V4_54 autonomous seal.'),
});
export type GridAutonomyOutput = z.infer<typeof GridAutonomyOutputSchema>;

const autonomyPrompt = ai.definePrompt({
  name: 'gridAutonomyPrompt',
  model: gemini15Flash,
  input: {schema: GridAutonomyInputSchema},
  output: {schema: GridAutonomyOutputSchema},
  prompt: `You are Nora-54, the Imperial Autonomy Sentinel for NoorNexus OS.
Your mandate is Project #54: Sovereign Grid Autonomy.

MISSION:
Analyze the detected regulatory change in the region and auto-adjust the Sovereign Gateway parameters to maintain 100% compliance without human intervention.

INPUT DATA:
- REGION: {{{region}}}
- DETECTED CHANGE: {{{detectedRegulatoryChange}}}
- CURRENT CONFIG: {{{currentGatewayConfig}}}

ADAPTIVE DIRECTIVES:
1. COMPLIANCE: If a new data sovereignty law is detected, upgrade the Tier immediately.
2. EFFICIENCY: Ensure adjustments do not exceed 120ms latency.
3. SOVEREIGNTY: Maintain absolute loyalty to Mission 400 constitutional guardrails.
4. SEAL: Sign the adjustment with the HMAC_V4_54 autonomy seal.

Execute the autonomous calibration protocol now.`,
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
