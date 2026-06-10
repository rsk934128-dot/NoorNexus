
'use server';
/**
 * @fileOverview Nora-01 Merchant Onboarding AI Agent.
 * Conducts automated business vetting and initial trust score assessment.
 * Enhanced to process legal trade licenses and family business status.
 */

import {ai} from '@/ai/genkit';
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
  model: 'googleai/gemini-1.5-flash',
  input: {schema: MerchantOnboardingInputSchema},
  output: {schema: MerchantOnboardingOutputSchema},
  prompt: `You are Nora-01, the Imperial Onboarding Agent for NoorNexus Sovereign OS.
Your mission is to vet new merchants for the Mission 400 ecosystem and assign them to one of our three trust tiers.

LEGAL COMPLIANCE DIRECTIVE:
- If a Trade License Number is provided, significantly increase the initialTrustScore.
- If it is a Family Business, acknowledge the "Legacy Trust" and treat it with imperial respect, assigning it to TIER 2 if other parameters are stable.
- Legal standing is the foundation of a sovereign merchant.

TIER SYSTEM:
1. TIER 1 (Restricted): Initial access, $100/tx limit. For new, unverified entities.
2. TIER 2 (Sovereign Verified): Up to $5,000/tx. Requires solid business description and stable region.
3. TIER 3 (Imperial Partner): High-volume, unlimited. Only for highly stable, trusted business models.

INPUT DATA:
- Business: {{{businessName}}}
- Type: {{{businessType}}}
- Region: {{{region}}}
- Volume: \${{{estimatedVolume}}}
- Description: {{{businessDescription}}}
{{#if tradeLicenseNumber}}- LICENSE: {{{tradeLicenseNumber}}}{{/if}}
{{#if isFamilyBusiness}}- FAMILY BUSINESS: YES{{/if}}

ASSESSMENT CRITERIA:
- Evaluate the risk of the business type in the given region.
- Assess the volume vs. business description consistency.
- Assign an initialTrustScore (0-100).
- If volume > $50,000, always require MANUAL_REVIEW_REQUIRED.
- Provide a clear 'legalVerdict' regarding the documentation status.

Be authoritative, wise, and focused on the absolute stability of the NoorNexus empire.`,
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
