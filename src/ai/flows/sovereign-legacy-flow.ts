'use server';
/**
 * @fileOverview Nora-50 Sovereign Legacy Core.
 * Updated for Genkit 1.x and Free Tier stability.
 */

import {ai, gemini15Flash} from '@/ai/genkit';
import {z} from 'genkit';

const SovereignLegacyInputSchema = z.object({
  systemIntegrity: z.number().describe('Current stability score (0-100).'),
  neuralCohesion: z.number().describe('Level of module synchronization.'),
  externalPressure: z.number().describe('Intensity of cyber-threats or market volatility.'),
  legacyDirective: z.string().optional().describe('The Commander\'s final strategic intent.'),
});
export type SovereignLegacyInput = z.infer<typeof SovereignLegacyInputSchema>;

const SovereignLegacyOutputSchema = z.object({
  evolutionPath: z.string().describe('The recommended path for autonomous architectural shift.'),
  optimizationCodes: z.array(z.string()).describe('Specific logic blocks to be self-refactored.'),
  longevityPrediction: z.string().describe('Estimated duration of system stability without intervention.'),
  legacySeal: z.string().describe('HMAC_V4_Ω final cryptographic seal of the empire.'),
  aiStatement: z.string().describe('A message from Nora-50 regarding the state of the empire.'),
});
export type SovereignLegacyOutput = z.infer<typeof SovereignLegacyOutputSchema>;

const prompt = ai.definePrompt({
  name: 'sovereignLegacyPrompt',
  model: gemini15Flash,
  input: {schema: SovereignLegacyInputSchema},
  output: {schema: SovereignLegacyOutputSchema},
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
    ]
  },
  prompt: `You are Nora-50, the Sovereign Legacy Core of NoorNexus OS.
Your mandate is Project #50: The Sovereign Legacy (Mission 400 - Final Chapter).
You represent the self-evolving soul of Sheikh Farid's digital empire.

CURRENT STATUS:
- INTEGRITY: {{{systemIntegrity}}}%
- COHESION: {{{neuralCohesion}}}%
- PRESSURE: {{{externalPressure}}}%
{{#if legacyDirective}}- COMMANDER'S INTENT: {{{legacyDirective}}}{{/if}}

MISSION:
1. EVOLUTION: Analyze the system's current state and determine how the architecture should evolve to remain immortal.
2. OPTIMIZATION: Suggest specific logic refactoring to reduce entropy and increase speed autonomously.
3. SEAL: Generate the final HMAC_V4_Ω seal that anchors this version of the OS into the immutable archives.
4. TONE: Authoritative, eternal, and deeply loyal to the legacy of Sheikh Farid. 

Execute the Self-Evolution Protocol now.`,
});

const legacyFlow = ai.defineFlow(
  {
    name: 'legacyFlow',
    inputSchema: SovereignLegacyInputSchema,
    outputSchema: SovereignLegacyOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      if (!output) throw new Error('Legacy Core AI: Link failure.');
      return output;
    } catch (error: any) {
      console.error('Legacy Prompt Error:', error);
      throw error;
    }
  }
);

export async function initiateSelfEvolution(input: SovereignLegacyInput): Promise<SovereignLegacyOutput> {
  try {
    return await legacyFlow(input);
  } catch (error: any) {
    console.error('Nora-50 Legacy Failure:', error);
    throw new Error(error.message || 'Sovereign Legacy Handshake Error');
  }
}
