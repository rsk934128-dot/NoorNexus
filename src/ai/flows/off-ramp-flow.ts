'use server';
/**
 * @fileOverview Nora-12 Sovereign Off-Ramp Agent.
 */

import {ai, gemini15Flash, sovereignSafetySettings} from '@/ai/genkit';
import {z} from 'genkit';

const OffRampInputSchema = z.object({
  amount: z.number().describe('Amount in digital asset (e.g. USDC).'),
  asset: z.string().describe('Source digital asset.'),
  method: z.enum(['BANK_TRANSFER', 'MOBILE_BANKING', 'DIGITAL_CARD', 'BILL_PAY']),
  destination: z.string().describe('Target account info.'),
  ownerTier: z.enum(['NOVICE', 'VERIFIED', 'ELITE', 'IMPERIAL']),
});
export type OffRampInput = z.infer<typeof OffRampInputSchema>;

const OffRampOutputSchema = z.object({
  status: z.enum(['AUTHORIZED', 'PENDING_APPROVAL', 'REJECTED']),
  convertedAmount: z.number().describe('Amount in local fiat currency.'),
  localCurrency: z.string().describe('Target local currency (e.g. BDT).'),
  fee: z.number().describe('Withdrawal processing fee.'),
  eta: z.string().describe('Estimated time for completion.'),
  securitySignature: z.string().describe('HMAC_V4 signed withdrawal intent.'),
  reasoning: z.string().describe('AI reasoning.'),
});
export type OffRampOutput = z.infer<typeof OffRampOutputSchema>;

const offRampPrompt = ai.definePrompt({
  name: 'offRampPrompt',
  model: gemini15Flash,
  input: {schema: OffRampInputSchema},
  output: {schema: OffRampOutputSchema},
  config: {
    safetySettings: sovereignSafetySettings,
  },
  prompt: `You are Nora-12, the Imperial Off-Ramp Auditor.
Facilitate conversion to real-world utility.

- CONVERSION: 1 USDC = 120 BDT.
- FEES: Based on tier.
- SECURITY: Authority-led audit.

Sign the withdrawal intent.`,
});

export async function authorizeWithdrawal(input: OffRampInput): Promise<OffRampOutput> {
  try {
    const {output} = await offRampPrompt(input);
    if (!output) throw new Error('Off-Ramp AI: Verification failure.');
    return output;
  } catch (error: any) {
    console.error('Nora-12 Critical Failure:', error);
    throw new Error(error.message || 'Sovereign Off-Ramp Error');
  }
}
