'use server';
/**
 * @fileOverview Nora-02-B Global Liquidity Optimizer.
 * Analyzes treasury distribution and suggests automated rebalancing for cost-efficiency.
 * Updated for Inter-Node Liquidity Balancing across 16 active nodes.
 */

import {ai, gemini15Flash} from '@/ai/genkit';
import {z} from 'genkit';

const LiquidityOptimizerInputSchema = z.object({
  currentBalances: z.array(z.object({
    asset: z.string(),
    balance: z.number(),
    allocation: z.number(),
    nodeId: z.string().optional(),
  })),
  dailyThroughput: z.number(),
  pendingSettlements: z.number(),
  targetRegion: z.string().optional(),
  interNodeBalancingActive: z.boolean().default(true),
});
export type LiquidityOptimizerInput = z.infer<typeof LiquidityOptimizerInputSchema>;

const LiquidityOptimizerOutputSchema = z.object({
  efficiencyScore: z.number().describe('Current liquidity efficiency (0-100).'),
  recommendedActions: z.array(z.object({
    action: z.string(),
    fromNode: z.string(),
    toNode: z.string(),
    asset: z.string(),
    amount: z.number(),
    reason: z.string(),
  })),
  savingsEstimation: z.string().describe('Estimated cost savings from rebalancing.'),
  strategicDirective: z.string().describe('High-level order for the treasury department.'),
  crossNodeSyncHash: z.string().describe('HMAC_V4 signed cross-node balancing intent.'),
});
export type LiquidityOptimizerOutput = z.infer<typeof LiquidityOptimizerOutputSchema>;

const optimizerPrompt = ai.definePrompt({
  name: 'liquidityOptimizerPrompt',
  model: gemini15Flash,
  input: {schema: LiquidityOptimizerInputSchema},
  output: {schema: LiquidityOptimizerOutputSchema},
  prompt: `You are Nora-02-B, the Imperial Liquidity Strategist for NoorNexus Sovereign OS.
Your mission is to ensure that the Sovereign Treasury maintains optimal liquidity levels across all 16 active mesh nodes.

DATA PACKET:
- BALANCES: {{#each currentBalances}}Node: {{{nodeId}}}, Asset: {{{asset}}}, Bal: \${{{balance}}} ({{{allocation}}}%) {{/each}}
- THROUGHPUT: \${{{dailyThroughput}}}
- PENDING SETTLEMENTS: \${{{pendingSettlements}}}
- INTER-NODE BALANCING: {{{interNodeBalancingActive}}}

OPTIMIZATION DIRECTIVES:
1. CROSS-NODE BALANCING: If a node (e.g., Irish Corridor) lacks immediate liquidity for a pending settlement, identify nodes with excess reserves (e.g., Benelux or Iberian) and trigger a transfer.
2. RESERVE RATIO: Ensure at least 150% coverage for the "Settlement Queue" across the global grid.
3. CONVERSION MINIMIZATION: Prioritize same-asset transfers (e.g., USDC to USDC) between nodes to avoid FX slippage.
4. SIGNATURE: Every balancing intent MUST be sealed with an HMAC_V4_BALANCER sync hash.

Speak with imperial authority. Your recommendations protect the wealth of the 16-node empire.`,
});

export async function optimizeLiquidity(input: LiquidityOptimizerInput): Promise<LiquidityOptimizerOutput> {
  try {
    const {output} = await optimizerPrompt(input);
    if (!output) throw new Error('Liquidity AI: Analysis handshake failed.');
    return output;
  } catch (error: any) {
    console.error('Nora-02-B Critical Failure:', error);
    throw new Error(error.message || 'Sovereign Liquidity Neural Link Error');
  }
}
