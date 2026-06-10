
'use server';
/**
 * @fileOverview Nora-01 Merchant Performance Monitor Agent.
 * Conducts automated merchant lifecycle review and tier adjustment recommendations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MerchantPerformanceReviewInputSchema = z.object({
  businessName: z.string().describe('The name of the business.'),
  currentTier: z.enum(['TIER_1', 'TIER_2', 'TIER_3']),
  trustScore: z.number().min(0).max(100),
  transactionCount: z.number().describe('Number of transactions in the last 90 days.'),
  actualVolume: z.number().describe('Total transaction volume in USD.'),
  anomaliesDetected: z.number().default(0).describe('Count of high-risk flags from Nora-02.'),
});
export type MerchantPerformanceReviewInput = z.infer<typeof MerchantPerformanceReviewInputSchema>;

const MerchantPerformanceReviewOutputSchema = z.object({
  recommendedTier: z.enum(['TIER_1', 'TIER_2', 'TIER_3']),
  recommendedTrustScore: z.number().describe('Updated trust score based on performance.'),
  reviewSummary: z.string().describe('AI reasoning for the performance decision.'),
  actionRequired: z.enum(['NONE', 'UPGRADE_PENDING', 'DOWNGRADE_PENDING', 'LOCKDOWN_IMMEDIATE']),
  nextSteps: z.array(z.string()).describe('Tactical steps for the merchant.'),
});
export type MerchantPerformanceReviewOutput = z.infer<typeof MerchantPerformanceReviewOutputSchema>;

const merchantPerformanceReviewPrompt = ai.definePrompt({
  name: 'merchantPerformanceReviewPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: MerchantPerformanceReviewInputSchema},
  output: {schema: MerchantPerformanceReviewOutputSchema},
  prompt: `You are Nora-01, the Imperial Performance Auditor for NoorNexus Sovereign OS.
Your mission is to review the lifecycle of existing merchants and adjust their trust tiers based on historical data.

TIER SYSTEM REVIEW CRITERIA:
1. UPGRADE TO TIER 2: Requires > 500 successful transactions, $10,000+ volume, and 0 anomalies.
2. UPGRADE TO TIER 3: Requires > 5000 transactions, $100,000+ volume, and high historical integrity.
3. DOWNGRADE: If anomalies > 2 or sudden "Liquidity Drain" patterns detected by Nora-02.
4. LOCKDOWN: If anomalies > 5 or critical signature drift.

INPUT DATA:
- Merchant: {{{businessName}}}
- Current Tier: {{{currentTier}}}
- Trust Score: {{{trustScore}}}
- Transactions: {{{transactionCount}}}
- Volume: \${{{actualVolume}}}
- Anomalies: {{{anomaliesDetected}}}

Your summary should sound authoritative and wise. Provide clear reasons for upgrades or downgrades.`,
});

export async function reviewMerchantPerformance(input: MerchantPerformanceReviewInput): Promise<MerchantPerformanceReviewOutput> {
  try {
    const {output} = await merchantPerformanceReviewPrompt(input);
    if (!output) throw new Error('Performance AI: Audit failed.');
    return output;
  } catch (error: any) {
    console.error('Nora-01 Performance Review Failure:', error);
    throw new Error(error.message || 'Sovereign Performance Neural Link Error');
  }
}
