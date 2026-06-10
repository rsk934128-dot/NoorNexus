'use server';
/**
 * @fileOverview A sovereign treasury auditing AI agent that verifies multi-ledger integrity.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LedgerAuditInputSchema = z.object({
  totalVolume: z.number().describe('The total volume across all ledgers.'),
  settlementQueue: z.number().describe('The number of transactions awaiting settlement.'),
  liquidityHealth: z.number().describe('The percentage of liquidity health (0-100).'),
  dailyThroughput: z.number().describe('The total daily throughput processed.'),
});
export type LedgerAuditInput = z.infer<typeof LedgerAuditInputSchema>;

const LedgerAuditOutputSchema = z.object({
  auditStatus: z.enum(['STABLE', 'VULNERABLE', 'REBALANCING_REQUIRED', 'CRITICAL_DRIFT']),
  securityScore: z.number().describe('A score from 0-100 representing ledger integrity.'),
  detailedReport: z.string().describe('A detailed narrative report of the audit findings.'),
  discrepanciesDetected: z.boolean().describe('Whether any ledger discrepancies were found.'),
  recommendations: z.array(z.string()).describe('List of recommended adjustments for treasury stability.'),
});
export type LedgerAuditOutput = z.infer<typeof LedgerAuditOutputSchema>;

const auditPrompt = ai.definePrompt({
  name: 'ledgerAuditPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: LedgerAuditInputSchema},
  output: {schema: LedgerAuditOutputSchema},
  prompt: `You are the Imperial Treasury Auditor. Analyze these metrics for signs of cryptographic drift or liquidity drain.
  
  Total Volume: \${{{totalVolume}}}
  Settlement Queue: \${{{settlementQueue}}}
  Liquidity Health: {{{liquidityHealth}}}%
  Daily Throughput: \${{{dailyThroughput}}}
  
  Provide a tactical audit report.`,
});

export async function ledgerAudit(input: LedgerAuditInput): Promise<LedgerAuditOutput> {
  const {output} = await auditPrompt(input);
  if (!output) throw new Error('Imperial Treasury AI failed to generate audit output.');
  return output;
}
