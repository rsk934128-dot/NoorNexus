'use server';
/**
 * @fileOverview Nora-02-B Global Liquidity Optimizer.
 * Analyzes treasury distribution and suggests automated rebalancing for cost-efficiency.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LiquidityOptimizerInputSchema = z.object({
  currentBalances: z.array(z.object({
    asset: z.string(),
    balance: z.number(),
    allocation: z.number(),
  })),
  dailyThroughput: z.number(),
  pendingSettlements: z.number(),
  targetRegion: z.string().optional(),
});
export type LiquidityOptimizerInput = z.infer<typeof LiquidityOptimizerInputSchema>;

const LiquidityOptimizerOutputSchema = z.object({
  efficiencyScore: z.number().describe('Current liquidity efficiency (0-100).'),
  recommendedActions: z.array(z.object({
    action: z.string(),
    fromAsset: z.string(),
    toAsset: z.string(),
    amount: z.number(),
    reason: z.string(),
  })),
  savingsEstimation: z.string().describe('Estimated cost savings from rebalancing.'),
  strategicDirective: z.string().describe('High-level order for the treasury department.'),
});
export type LiquidityOptimizerOutput = z.infer<typeof LiquidityOptimizerOutputSchema>;

const optimizerPrompt = ai.definePrompt({
  name: 'liquidityOptimizerPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: LiquidityOptimizerInputSchema},
  output: {schema: LiquidityOptimizerOutputSchema},
  prompt: `You are Nora-02-B, the Imperial Liquidity Strategist for NoorNexus Sovereign OS.
Your mission is to ensure that the Sovereign Treasury maintains optimal liquidity levels across all mesh nodes to facilitate rapid cross-border settlements.

DATA PACKET:
- BALANCES: {{#each currentBalances}}Asset: {{{asset}}}, Bal: \${{{balance}}}, Alloc: {{{allocation}}}% {{/each}}
- THROUGHPUT: \${{{dailyThroughput}}}
- PENDING: \${{{pendingSettlements}}}

OPTIMIZATION DIRECTIVES:
1. Ensure the "Settlement Queue" is covered by at least 150% liquid stablecoin reserves.
2. If USDC allocation exceeds 60%, suggest shifting to regional Asset-Mesh (e.g. BDT) or Imperial Gold-Mesh to prevent single-asset drift.
3. Calculate efficiency based on throughput vs liquidity idle time.
4. Provide precise rebalancing steps to minimize currency conversion slippage.

Speak with imperial authority. Your recommendations protect the wealth of the empire.`,
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
