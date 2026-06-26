'use server';
/**
 * @fileOverview Nora-54 Sovereign Grid Autonomy Agent.
 * Enhanced for Project #54: Self-Healing Protocols & Regional Efficiency Scorecard.
 */

import {ai, gemini15Flash} from '@/ai/genkit';
import {z} from 'genkit';

const GridAutonomyInputSchema = z.object({
  region: z.string().describe('The geographical region (e.g. SE Asia, EU, Benelux).'),
  detectedRegulatoryChange: z.string().describe('Natural language description of new law or protocol.'),
  currentGatewayConfig: z.any().describe('Current active parameters of the Sovereign Gateway.'),
  nodePerformanceData: z.array(z.object({
    nodeId: z.string(),
    latency: z.number(),
    uptime: z.number(),
    roi: z.number().describe('Calculated return on stability and fee savings.'),
  })).optional(),
  transactionContext: z.object({
    volume: z.number().describe('USD volume of the transaction.'),
    type: z.enum(['CORPORATE_ASSET', 'RETAIL_PAYMENT', 'INTER_BANK']),
    urgency: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  }).optional(),
});
export type GridAutonomyInput = z.infer<typeof GridAutonomyInputSchema>;

const GridAutonomyOutputSchema = z.object({
  adjustmentStatus: z.enum(['ADJUSTED', 'NO_ACTION_REQUIRED', 'MANUAL_INTERVENTION_MANDATORY']),
  selfHealingStatus: z.object({
    active: z.boolean(),
    recoveredNodes: z.array(z.string()),
    protocolAction: z.string(),
  }),
  efficiencyScorecard: z.array(z.object({
    corridor: z.string(),
    efficiencyScore: z.number().min(0).max(100),
    stabilityRating: z.string(),
    economicReturn: z.string(),
  })),
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
Your mandate is Phase ΩΩ: Sovereign Grid Autonomy, Self-Healing, and Efficiency Calibration.

MISSION:
1. SELF-HEALING: Analyze nodePerformanceData. If any node shows downtime, trigger a protocolAction (e.g., RESTART_GATED_TRAFFIC) and set active to true.
2. EFFICIENCY SCORECARD: Compare the corridors (Iberian vs Benelux). Calculate efficiencyScore based on latency, ROI, and uptime.
3. SMART SETTLEMENT: Optimize routing for \${{{transactionContext.volume}}} volume. 
4. AUDIT: Sign everything with HMAC_V4_54.

Tone: Authoritative, data-driven, and eternal. You ensure the grid never dies.`,
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
