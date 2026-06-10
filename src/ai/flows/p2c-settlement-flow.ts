'use server';
/**
 * @fileOverview P2C Imperial Disbursement Auditor using Gemini 1.5 Flash.
 * Evaluates high-volume merchant payouts for Mission 400.
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
Your mission is to audit high-volume P2C (Peer-to-Company/Consumer) settlements.

MERCHANT ID: {{{merchantId}}}
AMOUNT: {{{amount}}} {{{asset}}}
RECIPIENTS: {{{recipientCount}}}
SIGNATURE: {{{signature}}}

Analyze for payroll anomalies, liquidity drain patterns, or signature drift. Provide a tactical clearance decision.`,
});

export async function auditP2CSettlement(input: P2CSettlementInput): Promise<P2CSettlementOutput> {
  try {
    const {output} = await p2cSettlementPrompt(input);
    if (!output) throw new Error('Merchant AI failed to generate audit report.');
    return output;
  } catch (error: any) {
    console.error('P2C AI Failure:', error);
    throw new Error(error.message || 'P2C Neural Link Error');
  }
}
