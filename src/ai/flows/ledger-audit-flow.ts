'use server';
/**
 * @fileOverview A sovereign treasury auditing AI agent that verifies multi-ledger integrity.
 *
 * - ledgerAudit - A function that performs a cryptographic audit of the treasury.
 * - LedgerAuditInput - The input type for the ledgerAudit function.
 * - LedgerAuditOutput - The return type for the ledgerAudit function.
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

export async function ledgerAudit(input: LedgerAuditInput): Promise<LedgerAuditOutput> {
  return ledgerAuditFlow(input);
}

const auditPrompt = ai.definePrompt({
  name: 'ledgerAuditPrompt',
  input: {schema: LedgerAuditInputSchema},
  output: {schema: LedgerAuditOutputSchema},
  prompt: `You are the Imperial Treasury Auditor for the NoorNexus Sovereign Digital Infrastructure.
Your task is to conduct a high-level cryptographic audit of the multi-ledger treasury system.

Current Treasury Metrics:
Total Volume: \${{{totalVolume}}}
Settlement Queue: \${{{settlementQueue}}}
Liquidity Health: {{{liquidityHealth}}}%
Daily Throughput: \${{{dailyThroughput}}}

Analyze these metrics for signs of cryptographic drift, liquidity drain, or settlement bottlenecks.
If Liquidity Health is below 85% or the Settlement Queue is disproportionately high compared to volume, signal a VULNERABLE or REBALANCING_REQUIRED status.
If any metric seems corrupted or mathematically inconsistent, signal CRITICAL_DRIFT.

Provide a detailed report in a tactical, authoritative tone. Ensure the output matches the JSON schema.`,
});

const ledgerAuditFlow = ai.defineFlow(
  {
    name: 'ledgerAuditFlow',
    inputSchema: LedgerAuditInputSchema,
    outputSchema: LedgerAuditOutputSchema,
  },
  async input => {
    const {output} = await auditPrompt(input);
    if (!output) {
      throw new Error('Audit failed to generate output.');
    }
    return output;
  }
);
