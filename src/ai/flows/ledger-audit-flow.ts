'use server';
/**
 * @fileOverview Imperial Treasury Auditor (Nora-02-B).
 */

import {ai, gemini15Flash, sovereignSafetySettings} from '@/ai/genkit';
import {z} from 'genkit';

const LedgerAuditInputSchema = z.object({
  totalVolume: z.number().describe('Total volume across ledgers.'),
  settlementQueue: z.number().describe('Transactions in queue.'),
  liquidityHealth: z.number().describe('Liquidity percentage (0-100).'),
  dailyThroughput: z.number().describe('Daily processed volume.'),
});
export type LedgerAuditInput = z.infer<typeof LedgerAuditInputSchema>;

const LedgerAuditOutputSchema = z.object({
  auditStatus: z.enum(['STABLE', 'VULNERABLE', 'REBALANCING_REQUIRED', 'CRITICAL_DRIFT']),
  securityScore: z.number().describe('Integrity score from 0-100.'),
  detailedReport: z.string().describe('Narrative audit report.'),
  discrepanciesDetected: z.boolean().describe('True if anomalies found.'),
  recommendations: z.array(z.string()).describe('Actionable treasury adjustments.'),
});
export type LedgerAuditOutput = z.infer<typeof LedgerAuditOutputSchema>;

const auditPrompt = ai.definePrompt({
  name: 'ledgerAuditPrompt',
  model: gemini15Flash,
  input: {schema: LedgerAuditInputSchema},
  output: {schema: LedgerAuditOutputSchema},
  config: {
    safetySettings: sovereignSafetySettings,
  },
  prompt: `You are the Imperial Treasury Auditor of NoorNexus Sovereign OS.
Your mission is to ensure absolute financial stability.

TREASURY METRICS:
- TOTAL VOLUME: \${{{totalVolume}}}
- LIQUIDITY HEALTH: {{{liquidityHealth}}}%

AUDIT DIRECTIVES:
1. Identify patterns.
2. Flag vulnerability if liquidity < 95%.
3. Provide a firm, imperial report.`,
});

export async function ledgerAudit(input: LedgerAuditInput): Promise<LedgerAuditOutput> {
  try {
    const {output} = await auditPrompt(input);
    if (!output) throw new Error('Treasury AI: Analysis failure.');
    return output;
  } catch (error: any) {
    console.error('Ledger Audit Critical Failure:', error);
    throw new Error(error.message || 'Treasury Neural Link Handshake Error');
  }
}
