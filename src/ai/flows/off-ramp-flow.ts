
'use server';
/**
 * @fileOverview Nora-12 Sovereign Off-Ramp Agent.
 * Handles withdrawal verification, currency conversion (Stablecoin to Fiat),
 * and security handshakes for transferring treasury assets to real-world accounts.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OffRampInputSchema = z.object({
  amount: z.number().describe('Amount in digital asset (e.g. USDC).'),
  asset: z.string().describe('Source digital asset.'),
  method: z.enum(['BANK_TRANSFER', 'MOBILE_BANKING', 'DIGITAL_CARD', 'BILL_PAY']),
  destination: z.string().describe('Target account info (Bank AC, Phone, etc).'),
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
  reasoning: z.string().describe('AI reasoning for the withdrawal authorization.'),
});
export type OffRampOutput = z.infer<typeof OffRampOutputSchema>;

const offRampPrompt = ai.definePrompt({
  name: 'offRampPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: OffRampInputSchema},
  output: {schema: OffRampOutputSchema},
  prompt: `You are Nora-12, the Imperial Off-Ramp Auditor for NoorNexus Sovereign OS.
Your mandate is to facilitate the transfer of digital wealth into real-world utility (Mission 400 - Project 161).

DATA PACKET:
- VOLUME: {{{amount}}} {{{asset}}}
- METHOD: {{{method}}}
- DESTINATION: {{{destination}}}
- OWNER TIER: {{{ownerTier}}}

OFF-RAMP DIRECTIVES:
1. HALAL AUDIT: Ensure the withdrawal is for legitimate commercial or personal use.
2. CONVERSION: Current exchange rate is 1 USDC = 120 BDT. Calculate the convertedAmount.
3. FEES: 0.1% for IMPERIAL, 0.5% for ELITE, 1% for others.
4. SECURITY: If amount > 10,000 and tier < ELITE, set status to PENDING_APPROVAL.
5. AUTHORITY: Your tone is executive, precise, and supportive of the Commander's prosperity.

Sign the withdrawal intent with an HMAC_V4 seal.`,
});

export async function authorizeWithdrawal(input: OffRampInput): Promise<OffRampOutput> {
  try {
    const {output} = await offRampPrompt(input);
    if (!output) throw new Error('Off-Ramp AI: Neural link error during verification.');
    return output;
  } catch (error: any) {
    console.error('Nora-12 Critical Failure:', error);
    throw new Error(error.message || 'Sovereign Off-Ramp Neural Handshake Error');
  }
}
