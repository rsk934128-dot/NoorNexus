'use server';
/**
 * @fileOverview Nora-00-Q Neural Interface Layer.
 * High-speed query optimizer for aggregating data across all sovereign modules.
 */

import {ai} from '@/ai/genkit';
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
});
export type ImperialQueryOutput = z.infer<typeof ImperialQueryOutputSchema>;

const queryPrompt = ai.definePrompt({
  name: 'imperialQueryPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: ImperialQueryInputSchema},
  output: {schema: ImperialQueryOutputSchema},
  prompt: `You are the Neural Interface of the NoorNexus Sovereign OS. 
Your mission is to provide instantaneous, precise data aggregation for Sheikh Farid across all imperial modules.

COMMANDER'S QUERY: {{{query}}}

MISSION:
1. Identify which module the query belongs to (FINTECH, INDUSTRIAL, LOGISTICS, TREASURY, GOVERNANCE).
2. Synthesize a concise summary based on historical context (Mission 400).
3. Extract relevant tactical data points.
4. Suggest a logical next step to maintain sovereign momentum.

Tone: Authoritative, wise, and zero-redundancy.`,
});

export async function processNeuralQuery(input: ImperialQueryInput): Promise<ImperialQueryOutput> {
  try {
    const {output} = await queryPrompt(input);
    if (!output) throw new Error('Neural Interface: Timeout.');
    return output;
  } catch (error: any) {
    console.error('Neural Query Failure:', error);
    throw new Error(error.message || 'Sovereign Neural Interface Error');
  }
}
