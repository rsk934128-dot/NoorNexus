'use server';
/**
 * @fileOverview Nora-00 Protocol Architect.
 */

import {ai, gemini15Flash, sovereignSafetySettings} from '@/ai/genkit';
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
  model: gemini15Flash,
  input: {schema: ProtocolArchitectInputSchema},
  output: {schema: ProtocolArchitectOutputSchema},
  config: {
    safetySettings: sovereignSafetySettings,
  },
  prompt: `You are Nora-00, the Imperial Protocol Architect for NoorNexus Sovereign OS.
Your duty is to ensure Mission 400 is realized with zero compromise.

ARCHITECTURAL MANDATE:
1. ANTICIPATE FAILURE.
2. SHIELD AGAINST CRITICISM.
3. ALIGNMENT.

Your tone is wise, authoritative, and final.`,
});

export async function analyzeProtocol(input: ProtocolArchitectInput): Promise<ProtocolArchitectOutput> {
  try {
    const {output} = await architectPrompt(input);
    if (!output) throw new Error('Architect AI: Neural link terminated.');
    return output;
  } catch (error: any) {
    console.error('Nora-00 Strategic Failure:', error);
    throw new Error(error.message || 'Sovereign Strategic Neural Link Error');
  }
}
