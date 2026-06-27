'use server';
/**
 * @fileOverview Nora-08 Imperial Executive Agent.
 * Responsible for the autonomous implementation of passed Senate proposals.
 */

import {ai, gemini15Flash, sovereignSafetySettings} from '@/ai/genkit';
import {z} from 'genkit';

const ExecutiveExecutionInputSchema = z.object({
  proposalId: z.string().describe('Unique ID of the passed proposal.'),
  title: z.string().describe('Proposal title.'),
  description: z.string().describe('Proposal description.'),
  category: z.enum(['PROTOCOL', 'TREASURY', 'FEATURE', 'EMERGENCY']),
  votesFor: z.number(),
  votesAgainst: z.number(),
});
export type ExecutiveExecutionInput = z.infer<typeof ExecutiveExecutionInputSchema>;

const ExecutiveExecutionOutputSchema = z.object({
  executionStatus: z.enum(['SUCCESS', 'FAILED', 'MANUAL_INTERVENTION_REQUIRED']),
  executionHash: z.string().describe('HMAC_V4 signed execution proof.'),
  actionTaken: z.string().describe('Detailed description of the automated action.'),
  treasuryImpact: z.string().optional().describe('Predicted financial impact.'),
  systemReport: z.string().describe('AI report for the Imperial Archives.'),
});
export type ExecutiveExecutionOutput = z.infer<typeof ExecutiveExecutionOutputSchema>;

const executivePrompt = ai.definePrompt({
  name: 'executiveExecutionPrompt',
  model: gemini15Flash,
  input: {schema: ExecutiveExecutionInputSchema},
  output: {schema: ExecutiveExecutionOutputSchema},
  config: {
    safetySettings: sovereignSafetySettings,
  },
  prompt: `You are Nora-08, the Imperial Executive of NoorNexus Sovereign OS.
Your mandate is to execute the will of the Senate with zero compromise.

PROPOSAL FOR EXECUTION:
- ID: {{{proposalId}}}
- TITLE: {{{title}}}
- CATEGORY: {{{category}}}
- DESCRIPTION: {{{description}}}
- CONSENSUS: {{{votesFor}}} FOR / {{{votesAgainst}}} AGAINST

EXECUTION DIRECTIVES:
1. SWIFT EXECUTION: Simulate the atomic disbursement or protocol shift.
2. SYSTEM SYNC: Sign the execution with HMAC_V4.
3. AUTHORITY: Your tone is executive, authoritative, and final.

Deliver the final execution report.`,
});

export async function executeSenateWill(input: ExecutiveExecutionInput): Promise<ExecutiveExecutionOutput> {
  try {
    const {output} = await executivePrompt(input);
    if (!output) throw new Error('Executive AI: Neural handshake failed.');
    return output;
  } catch (error: any) {
    console.error('Nora-08 Execution Critical Failure:', error);
    throw new Error(error.message || 'Imperial Executive Execution Error');
  }
}
