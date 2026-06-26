'use server';
/**
 * @fileOverview Nora-13 Sovereign Alert Dispatcher (Project #48).
 * Converts predictive maintenance signals into tactical commands for maintenance units.
 * Updated for Genkit 1.x.
 */

import {ai, gemini15Flash} from '@/ai/genkit';
import {z} from 'genkit';

const AlertDispatcherInputSchema = z.object({
  nodeId: z.string(),
  partId: z.string(),
  failureProbability: z.number(),
  location: z.string(),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
});
export type AlertDispatcherInput = z.infer<typeof AlertDispatcherInputSchema>;

const AlertDispatcherOutputSchema = z.object({
  dispatchId: z.string(),
  tacticalCommand: z.string().describe('Encoded tactical command for field engineers.'),
  estimatedArrival: z.string().describe('ETA for maintenance unit.'),
  securityHash: z.string().describe('HMAC_V4 dispatch seal.'),
  reasoning: z.string().describe('AI reasoning for dispatch priority.'),
});
export type AlertDispatcherOutput = z.infer<typeof AlertDispatcherOutputSchema>;

const alertPrompt = ai.definePrompt({
  name: 'alertDispatcherPrompt',
  model: gemini15Flash,
  input: {schema: AlertDispatcherInputSchema},
  output: {schema: AlertDispatcherOutputSchema},
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
    ]
  },
  prompt: `You are Nora-13, the Imperial Alert Dispatcher for NoorNexus Sovereign OS.
Your mandate is to neutralize infrastructure risks before they occur (Project #48).

RISK PACKET:
- NODE: {{{nodeId}}}
- ASSET: {{{partId}}}
- FAIL PROBABILITY: {{{failureProbability}}}%
- LOCATION: {{{location}}}
- PRIORITY: {{{priority}}}

DISPATCH DIRECTIVES:
1. Generate an authoritative tactical command for the closest maintenance unit.
2. Assign a unique dispatchId and ETA.
3. Every command MUST be signed with an HMAC_V4 security hash.
4. Your tone is cold, efficient, and military-grade. 

Execute the dispatch protocol immediately.`,
});

const alertFlow = ai.defineFlow(
  {
    name: 'alertFlow',
    inputSchema: AlertDispatcherInputSchema,
    outputSchema: AlertDispatcherOutputSchema,
  },
  async input => {
    try {
      const {output} = await alertPrompt(input);
      if (!output) throw new Error('Nora-13: Dispatch AI failure.');
      return output;
    } catch (error: any) {
      console.error('Nora-13 Prompt Error:', error);
      throw error;
    }
  }
);

export async function dispatchImperialAlert(input: AlertDispatcherInput): Promise<AlertDispatcherOutput> {
  try {
    return await alertFlow(input);
  } catch (error: any) {
    console.error('Nora-13 Dispatch Failure:', error);
    throw new Error(error.message || 'Sovereign Alert Neural Link Error');
  }
}
