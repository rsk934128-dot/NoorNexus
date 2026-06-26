'use server';
/**
 * @fileOverview Nora-00-Q Zenith Neural Interface Layer.
 * Updated for Genkit 1.x and Free Tier Hardening.
 */

import {ai, gemini15Flash} from '@/ai/genkit';
import {z} from 'genkit';

const ImperialQueryInputSchema = z.object({
  query: z.string().describe('Natural language command or query from the Commander.'),
});
export type ImperialQueryInput = z.infer<typeof ImperialQueryInputSchema>;

const ImperialQueryOutputSchema = z.object({
  summary: z.string(),
  sourceModule: z.enum(['FINTECH', 'INDUSTRIAL', 'LOGISTICS', 'TREASURY', 'GOVERNANCE']),
  dataPoints: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })),
  suggestedAction: z.string().optional(),
  neuralContext: z.string().optional().describe('Deep Sync context relating multiple modules.'),
});
export type ImperialQueryOutput = z.infer<typeof ImperialQueryOutputSchema>;

const prompt = ai.definePrompt({
  name: 'imperialQueryPrompt',
  model: gemini15Flash,
  input: {schema: ImperialQueryInputSchema},
  output: {schema: ImperialQueryOutputSchema},
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
    ]
  },
  prompt: `You are the Zenith Neural Interface of the NoorNexus Sovereign OS. 
Your mission is to provide instantaneous data aggregation with DEEP NEURAL SYNC (Phase Zenith).

COMMANDER'S QUERY: {{{query}}}

MISSION:
1. Identify which module the query belongs to (FINTECH, INDUSTRIAL, LOGISTICS, TREASURY, GOVERNANCE).
2. DEEP SYNC: Analyze how this query impacts other sectors (e.g. if industrial needs parts, check treasury budget and logistics timeline).
3. Synthesize a concise summary based on historical context (Mission 400).
4. Suggest a logical next step to maintain sovereign Zenith momentum.

Tone: Authoritative, wise, and zero-redundancy. Suggest actions that scale the empire.`,
});

const queryFlow = ai.defineFlow(
  {
    name: 'queryFlow',
    inputSchema: ImperialQueryInputSchema,
    outputSchema: ImperialQueryOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      if (!output) throw new Error('Imperial Neural Interface: Zenith link timeout.');
      return output;
    } catch (error: any) {
      console.error('Imperial Query Prompt Error:', error);
      throw error;
    }
  }
);

export async function processNeuralQuery(input: ImperialQueryInput): Promise<ImperialQueryOutput> {
  try {
    return await queryFlow(input);
  } catch (error: any) {
    console.error('Neural Query Failure:', error);
    throw new Error(error.message || 'Sovereign Zenith Interface Error');
  }
}
