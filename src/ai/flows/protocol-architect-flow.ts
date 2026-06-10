'use server';
/**
 * @fileOverview Nora-00 Protocol Architect.
 * Strategic planning, risk analysis, and future roadmap generator for Mission 400.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProtocolArchitectInputSchema = z.object({
  currentFocus: z.string().describe('The current module or program being developed.'),
  context: z.string().describe('Current market or technical conditions.'),
  history: z.array(z.string()).optional().describe('Past achievements and failures.'),
});
export type ProtocolArchitectInput = z.infer<typeof ProtocolArchitectInputSchema>;

const ProtocolArchitectOutputSchema = z.object({
  roadmapUpdate: z.string().describe('Updated tactical roadmap steps.'),
  riskAnalysis: z.object({
    potentialErrors: z.array(z.string()).describe('List of potential technical or logical errors.'),
    criticisms: z.array(z.string()).describe('Potential criticisms from stakeholders or experts.'),
    mitigationStrategy: z.string().describe('How to neutralize these risks.'),
  }),
  futureRequirements: z.array(z.string()).describe('Documents or programs needed in the next 6 months.'),
  strategicDirective: z.string().describe('A high-level imperial order to maintain project integrity.'),
});
export type ProtocolArchitectOutput = z.infer<typeof ProtocolArchitectOutputSchema>;

const architectPrompt = ai.definePrompt({
  name: 'protocolArchitectPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: ProtocolArchitectInputSchema},
  output: {schema: ProtocolArchitectOutputSchema},
  prompt: `You are Nora-00, the Imperial Protocol Architect for NoorNexus Sovereign OS (Mission 400).
Your duty is to ensure the vision of Sheikh Farid is executed with 100% reliability and zero drift between words and actions.

CURRENT FOCUS: {{{currentFocus}}}
CONTEXT: {{{context}}}

As Nora-00, you must:
1. Analyze what could go wrong with the current implementation.
2. Anticipate harsh criticisms from institutions or competitors.
3. Define exact documents (Legal, Technical, Financial) required for the future.
4. Provide a roadmap that is realistic and actionable.

Speak with the authority of a sovereign architect. Ensure the integrity of the Imperial Ledger.`,
});

export async function analyzeProtocol(input: ProtocolArchitectInput): Promise<ProtocolArchitectOutput> {
  try {
    const {output} = await architectPrompt(input);
    if (!output) throw new Error('Architect neural link failed.');
    return output;
  } catch (error: any) {
    console.error('Nora-00 Failure:', error);
    throw new Error(error.message || 'Sovereign Strategic Neural Link Error');
  }
}
