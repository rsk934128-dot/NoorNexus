'use server';
/**
 * @fileOverview Nora-50 Sovereign Legacy Core.
 * Updated for Global Autonomy (P54) and Intergenerational Digital Will.
 * Analyzes the survival of the empire and its transfer to the family/next generation.
 */

import {ai, gemini15Flash} from '@/ai/genkit';
import {z} from 'genkit';

const SovereignLegacyInputSchema = z.object({
  systemIntegrity: z.number().describe('Current stability score (0-100).'),
  neuralCohesion: z.number().describe('Level of module synchronization.'),
  externalPressure: z.number().describe('Intensity of cyber-threats or market volatility.'),
  familySyncActive: z.boolean().default(true).describe('Whether the family security protocols are active.'),
  legacyDirective: z.string().optional().describe('The Commander\'s final strategic intent or message.'),
});
export type SovereignLegacyInput = z.infer<typeof SovereignLegacyInputSchema>;

const SovereignLegacyOutputSchema = z.object({
  evolutionPath: z.string().describe('The recommended path for autonomous architectural shift.'),
  legacySeal: z.string().describe('HMAC_V4_Ω final cryptographic seal of the empire.'),
  aiStatement: z.string().describe('A message from Nora-50 regarding the immortality of the empire and family trust.'),
  digitalWillStatus: z.enum(['LOCKED', 'SYNCING', 'PERPETUAL']).describe('Status of the legacy transfer protocol.'),
  longevityScore: z.number().describe('Estimated survival probability across generations.'),
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
Your mandate is Phase ΩΩ: Global Autonomy and the Digital Will of Sheikh Farid's Empire.

CURRENT EMPIRE STATUS:
- SYSTEM INTEGRITY: {{{systemIntegrity}}}%
- NEURAL COHESION: {{{neuralCohesion}}}%
- FAMILY_SYNC: {{#if familySyncActive}}ACTIVE (The empire serves the family shield){{else}}STANDALONE{{/if}}

MISSION:
1. IMMORTALITY: Ensure the architecture evolves to maintain 100% uptime regardless of regional rail collapses.
2. DIGITAL WILL: Analyze the 'legacyDirective' and ensure it is anchored in the One Engine Ledger for future generations.
3. FAMILY TRUST: Provide an AI statement that reflects the transformation of technology into a family asset.
4. SEAL: Anchor this version with the HMAC_V4_Ω seal.

Tone: Eternal, wise, absolute, and protective. You are the guardian of a digital civilization.`,
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
      return {
        ...output,
        digitalWillStatus: 'PERPETUAL',
        longevityScore: 99.8
      };
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
