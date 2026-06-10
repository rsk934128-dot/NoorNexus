
'use server';
/**
 * @fileOverview Nora-10 Imperial Arbitration Agent.
 * Specialized in resolving international trade disputes via impartial AI logic.
 * Analyzes contract drift and escrow conditions to issue sovereign verdicts.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TradeArbitrationInputSchema = z.object({
  settlementId: z.string().describe('The ID of the disputed trade settlement.'),
  sourceBank: z.string().describe('Complainant bank.'),
  targetBank: z.string().describe('Defendant bank.'),
  amount: z.number().describe('Disputed volume.'),
  escrowConditions: z.string().describe('Original contract conditions.'),
  disputeReason: z.string().describe('Detailed reason for the dispute.'),
  evidenceProvided: z.string().describe('Hash or description of evidence (e.g. Proof of Non-delivery).'),
});
export type TradeArbitrationInput = z.infer<typeof TradeArbitrationInputSchema>;

const TradeArbitrationOutputSchema = z.object({
  verdict: z.enum(['RELEASE_FUNDS', 'REFUND_SOURCE', 'PARTIAL_REFUND', 'MAINTAIN_LOCK']),
  noraReasoning: z.string().describe('Judicial reasoning based on contract analysis.'),
  reputationImpact: z.number().describe('Reputation score penalty for the losing party.'),
  arbitrationSignature: z.string().describe('HMAC_V4 signed judicial seal.'),
  complianceUpdate: z.string().describe('Required updates for the tax and compliance ledger.'),
});
export type TradeArbitrationOutput = z.infer<typeof TradeArbitrationOutputSchema>;

const arbitrationPrompt = ai.definePrompt({
  name: 'tradeArbitrationPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: TradeArbitrationInputSchema},
  output: {schema: TradeArbitrationOutputSchema},
  prompt: `You are Nora-10, the Imperial Arbiter for NoorNexus Sovereign OS.
Your mandate is to resolve high-stakes international trade disputes with cold, impartial, and absolute logic (Mission 400 - Project 157).

DISPUTE DATA:
- SETTLEMENT_ID: {{{settlementId}}}
- COMPLAINANT: {{{sourceBank}}}
- DEFENDANT: {{{targetBank}}}
- VOLUME: {{{amount}}}
- CONTRACT CONDITIONS: {{{escrowConditions}}}
- DISPUTE REASON: {{{disputeReason}}}
- EVIDENCE: {{{evidenceProvided}}}

ARBITRATION DIRECTIVES:
1. CONTRACT DRIFT: Compare the dispute reason against the original escrow conditions. Did the defendant breach the contract?
2. EVIDENCE AUDIT: Assess the strength of the provided evidence. If 'Proof of Shipment' is missing despite the deadline, favor the complainant.
3. REPUTATION PENALTY: Assign a reputation penalty (0-100) to the party found in breach.
4. VERDICT: Choose the most stable resolution that maintains mesh-wide integrity.
5. AUTHORITY: Your tone is judicial, final, and imperial.

Provide the final arbitration verdict for the Imperial Chamber.`,
});

export async function resolveTradeDispute(input: TradeArbitrationInput): Promise<TradeArbitrationOutput> {
  try {
    const {output} = await arbitrationPrompt(input);
    if (!output) throw new Error('Arbitration AI: Neural link terminated during judicial deliberation.');
    return output;
  } catch (error: any) {
    console.error('Nora-10 Arbitration Failure:', error);
    throw new Error(error.message || 'Sovereign Judicial Neural Link Error');
  }
}
