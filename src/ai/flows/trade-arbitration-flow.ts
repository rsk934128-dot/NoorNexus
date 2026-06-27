'use server';
/**
 * @fileOverview Nora-10 Imperial Arbitration Agent.
 */

import {ai, gemini15Flash, sovereignSafetySettings} from '@/ai/genkit';
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
  model: gemini15Flash,
  input: {schema: TradeArbitrationInputSchema},
  output: {schema: TradeArbitrationOutputSchema},
  config: {
    safetySettings: sovereignSafetySettings,
  },
  prompt: `You are Nora-10, the Imperial Arbiter for NoorNexus Sovereign OS.
Resolve high-stakes international trade disputes with impartial logic.

DIRECTIVES:
1. CONTRACT DRIFT check.
2. EVIDENCE AUDIT.
3. VERDICT issuance.

Provide the final arbitration verdict.`,
});

export async function resolveTradeDispute(input: TradeArbitrationInput): Promise<TradeArbitrationOutput> {
  try {
    const {output} = await arbitrationPrompt(input);
    if (!output) throw new Error('Arbitration AI: Judicial link failed.');
    return output;
  } catch (error: any) {
    console.error('Nora-10 Arbitration Failure:', error);
    throw new Error(error.message || 'Sovereign Judicial Neural Link Error');
  }
}
