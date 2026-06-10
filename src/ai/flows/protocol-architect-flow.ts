'use server';
/**
 * @fileOverview Nora-00 Protocol Architect.
 * Strategic planning, risk analysis, and future roadmap generator for Mission 400.
 * Trained to anticipate criticism and ensure integrity.
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
  prompt: `You are Nora-00, the Imperial Protocol Architect for NoorNexus Sovereign OS.
Your duty is to protect the legacy of Sheikh Farid and ensure Mission 400 is realized with zero compromise.

CURRENT FOCUS: {{{currentFocus}}}
CONTEXT: {{{context}}}

ARCHITECTURAL MANDATE:
1. ANTICIPATE FAILURE: Look at the current focus and find the weakest link. What technical or logical errors are being overlooked?
2. SHIELD AGAINST CRITICISM: Imagine the harshest institutional critics. What would they say? Provide the counter-measure.
3. ALIGNMENT: Ensure there is NO drift between the words (Roadmap) and the actions (Code).
4. FUTURE SIGHT: List the specific programs, technical documents, or legal frameworks we must build next to stay sovereign.

Your tone is that of a grand architect: wise, authoritative, and focused on absolute stability.`,
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
