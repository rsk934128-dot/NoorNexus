'use server';
/**
 * @fileOverview Nora-01 Merchant Onboarding AI Agent.
 */

import {ai, gemini15Flash, sovereignSafetySettings} from '@/ai/genkit';
import {z} from 'genkit';

const MerchantOnboardingInputSchema = z.object({
  businessName: z.string().describe('The legal name of the business.'),
  businessType: z.string().describe('The category of business (e.g., E-commerce, SaaS).'),
  region: z.string().describe('Operational region.'),
  estimatedVolume: z.number().describe('Estimated monthly transaction volume in USD.'),
  businessDescription: z.string().describe('Brief description of what the business does.'),
  tradeLicenseNumber: z.string().optional().describe('The Trade License or Registration number.'),
  isFamilyBusiness: z.boolean().optional().describe('Whether the business uses a family-owned trade license.'),
});
export type MerchantOnboardingInput = z.infer<typeof MerchantOnboardingInputSchema>;

const MerchantOnboardingOutputSchema = z.object({
  initialTrustScore: z.number().describe('A trust score from 0-100.'),
  assignedTier: z.enum(['TIER_1', 'TIER_2', 'TIER_3']).describe('The recommended onboarding tier.'),
  assessmentSummary: z.string().describe('AI reasoning for the onboarding decision.'),
  securityChecklist: z.array(z.string()).describe('Actionable compliance steps for the merchant.'),
  verificationStatus: z.enum(['APPROVED_PENDING_KYC', 'MANUAL_REVIEW_REQUIRED', 'REJECTED']),
  legalVerdict: z.string().describe('AI assessment of the provided legal documentation.'),
});
export type MerchantOnboardingOutput = z.infer<typeof MerchantOnboardingOutputSchema>;

const merchantOnboardingPrompt = ai.definePrompt({
  name: 'merchantOnboardingPrompt',
  model: gemini15Flash,
  input: {schema: MerchantOnboardingInputSchema},
  output: {schema: MerchantOnboardingOutputSchema},
  config: {
    safetySettings: sovereignSafetySettings,
  },
  prompt: `You are Nora-01, the Imperial Onboarding Agent for NoorNexus Sovereign OS.
Your mission is to vet new merchants.

TIER SYSTEM:
1. TIER 1 (Restricted)
2. TIER 2 (Sovereign Verified)
3. TIER 3 (Imperial Partner)

Analyze the request and provide an authoritative decision.`,
});

export async function interviewMerchant(input: MerchantOnboardingInput): Promise<MerchantOnboardingOutput> {
  try {
    const {output} = await merchantOnboardingPrompt(input);
    if (!output) throw new Error('Onboarding AI: Decision failed.');
    return output;
  } catch (error: any) {
    console.error('Nora-01 Onboarding Failure:', error);
    throw new Error(error.message || 'Sovereign Onboarding Neural Link Error');
  }
}
