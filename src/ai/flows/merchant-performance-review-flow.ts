'use server';
/**
 * @fileOverview Nora-01 Merchant Performance Monitor Agent.
 */

import {ai, gemini15Flash, sovereignSafetySettings} from '@/ai/genkit';
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
  model: gemini15Flash,
  input: {schema: MerchantPerformanceReviewInputSchema},
  output: {schema: MerchantPerformanceReviewOutputSchema},
  config: {
    safetySettings: sovereignSafetySettings,
  },
  prompt: `You are Nora-01, the Imperial Performance Auditor for NoorNexus Sovereign OS.
Review the historical data and update trust tiers.

Tone: Authoritative and wise. Provide reasons for upgrades or lockdowns.`,
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
