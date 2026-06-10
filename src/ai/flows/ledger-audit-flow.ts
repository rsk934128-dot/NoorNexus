
'use server';
/**
 * @fileOverview Imperial Treasury Auditor Flow.
 * Verifies multi-ledger integrity and liquidity health.
 */

import {ai} from '@/ai/genkit';
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
  model: 'googleai/gemini-1.5-flash',
  input: {schema: LedgerAuditInputSchema},
  output: {schema: LedgerAuditOutputSchema},
  prompt: `You are the Imperial Treasury Auditor for NoorNexus Sovereign OS.
Evaluate the following treasury metrics for signs of liquidity drain or cryptographic instability.

TOTAL VOLUME: \${{{totalVolume}}}
SETTLEMENT QUEUE: \${{{settlementQueue}}}
LIQUIDITY HEALTH: {{{liquidityHealth}}}%
DAILY THROUGHPUT: \${{{dailyThroughput}}}

Speak with authority and provide a detailed tactical report.`,
});

export async function ledgerAudit(input: LedgerAuditInput): Promise<LedgerAuditOutput> {
  try {
    const {output} = await auditPrompt(input);
    if (!output) throw new Error('Audit AI failed to process the request.');
    return output;
  } catch (error: any) {
    console.error('Ledger Audit AI Critical Failure:', error);
    throw new Error(error.message || 'Treasury AI Handshake Error');
  }
}
