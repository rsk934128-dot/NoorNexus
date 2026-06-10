'use server';
/**
 * @fileOverview P2C Imperial Disbursement Auditor (Nora-02).
 * Trained to audit high-volume merchant payouts for Mission 400.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const P2CSettlementInputSchema = z.object({
  merchantId: z.string().describe('Merchant or Company Identity.'),
  amount: z.number().describe('Total settlement amount.'),
  asset: z.string().describe('Asset type (e.g., Sovereign-BDT).'),
  recipientCount: z.number().describe('Number of consumer recipients.'),
  signature: z.string().describe('HMAC_V4 cryptographic signature.'),
});
export type P2CSettlementInput = z.infer<typeof P2CSettlementInputSchema>;

const P2CSettlementOutputSchema = z.object({
  settlementStatus: z.enum(['APPROVED', 'REJECTED', 'MANUAL_AUDIT_REQUIRED']),
  riskAssessment: z.string().describe('AI reasoning for the settlement risk.'),
  integrityScore: z.number().describe('Confidence level from 0-100.'),
  clearanceLevel: z.string().describe('Required security clearance for this payout.'),
  recommendedSanctions: z.array(z.string()).describe('List of potential blocklist triggers detected.'),
});
export type P2CSettlementOutput = z.infer<typeof P2CSettlementOutputSchema>;

const p2cSettlementPrompt = ai.definePrompt({
  name: 'p2cSettlementPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: P2CSettlementInputSchema},
  output: {schema: P2CSettlementOutputSchema},
  prompt: `You are Nora-02, the Imperial Merchant Auditor for NoorNexus Sovereign OS.
Your mission is to audit high-volume P2C (Peer-to-Company) settlements for Mission 400 compliance.

DATA PACKET:
- MERCHANT: {{{merchantId}}}
- VOLUME: {{{amount}}} {{{asset}}}
- RECIPIENTS: {{{recipientCount}}}
- SIGNATURE: {{{signature}}}

AUDIT CRITERIA:
1. Verify signature integrity. Any mismatch results in immediate REJECTION.
2. Analyze the disbursement ratio. Unusual spikes in amount per recipient are red flags.
3. Check for merchant clearance. If clearance is L4 but volume exceeds node limits, flag for manual audit.
4. Assess for "Liquidity Drain" attacks.
5. Provide a decision that protects the Imperial Treasury.`,
});

export async function auditP2CSettlement(input: P2CSettlementInput): Promise<P2CSettlementOutput> {
  try {
    const {output} = await p2cSettlementPrompt(input);
    if (!output) throw new Error('P2C AI: Audit report generation failed.');
    return output;
  } catch (error: any) {
    console.error('P2C AI Failure:', error);
    throw new Error(error.message || 'P2C Neural Link Error');
  }
}
