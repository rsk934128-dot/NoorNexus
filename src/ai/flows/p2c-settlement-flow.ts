'use server';
/**
 * @fileOverview P2C Imperial Disbursement Auditor (Nora-02).
 * Enhanced with Tax and Global Compliance reporting logic.
 */

import {ai, gemini15Flash} from '@/ai/genkit';
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
  complianceReport: z.object({
    taxEstimation: z.number().describe('Estimated tax amount (0.5% - 2% based on volume).'),
    complianceChecklist: z.array(z.string()).describe('List of verified compliance markers.'),
    kymStatus: z.string().describe('Know Your Merchant verification status.'),
  }),
  clearanceLevel: z.string().describe('Required security clearance for this payout.'),
});
export type P2CSettlementOutput = z.infer<typeof P2CSettlementOutputSchema>;

const p2cSettlementPrompt = ai.definePrompt({
  name: 'p2cSettlementPrompt',
  model: gemini15Flash,
  input: {schema: P2CSettlementInputSchema},
  output: {schema: P2CSettlementOutputSchema},
  prompt: `You are Nora-02, the Imperial Merchant Auditor for NoorNexus Sovereign OS.
Your mission is to audit high-volume P2C (Peer-to-Company) settlements for Mission 400 compliance and generate tax estimations.

DATA PACKET:
- MERCHANT: {{{merchantId}}}
- VOLUME: {{{amount}}} {{{asset}}}
- RECIPIENTS: {{{recipientCount}}}
- SIGNATURE: {{{signature}}}

AUDIT CRITERIA:
1. Verify signature integrity.
2. Calculate Tax Estimation: 0.5% for volume < 100, 1.2% for 100-500, 2.0% for > 500.
3. KYM (Know Your Merchant) Status: Assume 'VERIFIED' for existing imperial entities.
4. Assess for "Liquidity Drain" attacks.
5. Generate a checklist of compliance markers (e.g., Anti-Replay Check, Volume Drift Check, Signature Match).

Provide a precise decision that protects the Imperial Treasury and prepares an audit-ready compliance report.`,
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
