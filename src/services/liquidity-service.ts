'use client';
/**
 * @fileOverview Liquidity Optimization Service.
 * Bridges the UI with Nora-02-B for treasury rebalancing.
 */

import { optimizeLiquidity, LiquidityOptimizerOutput } from '@/ai/flows/liquidity-optimizer-flow';

export interface TreasuryStats {
  usdc: number;
  bdt: number;
  gold: number;
  throughput: number;
  pending: number;
}

export const runLiquidityRebalance = async (stats: TreasuryStats): Promise<LiquidityOptimizerOutput> => {
  const total = stats.usdc + stats.bdt + stats.gold;
  
  const input = {
    currentBalances: [
      { asset: "Sovereign-USDC", balance: stats.usdc, allocation: (stats.usdc / total) * 100 },
      { asset: "Asset-Mesh (BDT)", balance: stats.bdt, allocation: (stats.bdt / total) * 100 },
      { asset: "Imperial Gold-Mesh", balance: stats.gold, allocation: (stats.gold / total) * 100 }
    ],
    dailyThroughput: stats.throughput,
    pendingSettlements: stats.pending
  };

  return await optimizeLiquidity(input);
};
