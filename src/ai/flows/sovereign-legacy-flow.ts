'use server';
/**
 * @fileOverview Nora-50 Sovereign Legacy Core.
 * Updated for Final Fintech-Legacy Synchronization (Phase ΩΩ).
 * Analyzes global fintech stability and geographical drift for autonomous rerouting.
 */

import {ai, gemini15Flash} from '@/ai/genkit';
import {z} from 'genkit';

const SovereignLegacyInputSchema = z.object({
  systemIntegrity: z.number().describe('Current stability score (0-100).'),
  neuralCohesion: z.number().describe('Level of module synchronization.'),
  externalPressure: z.number().describe('Intensity of cyber-threats or market volatility.'),
  fintechStability: z.number().optional().describe('Stability of global banking canals (0-100).'),
  geographicalDrift: z.array(z.object({
    region: z.string(),
    latencyFactor: z.number(),
    instabilityRisk: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'])
  })).optional(),
  legacyDirective: z.string().optional().describe('The Commander\'s final strategic intent.'),
});
export type SovereignLegacyInput = z.infer<typeof SovereignLegacyInputSchema>;

const SovereignLegacyOutputSchema = z.object({
  evolutionPath: z.string().describe('The recommended path for autonomous architectural shift.'),
  optimizationCodes: z.array(z.string()).describe('Specific logic blocks to be self-refactored.'),
  reroutingDirectives: z.array(z.object({
    sourceRegion: z.string(),
    targetCanal: z.string(),
    reason: z.string()
  })).optional().describe('Pre-emptive banking route adjustments.'),
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
Your mandate is Phase ΩΩ: The Sovereign Legacy (Mission 400 - Final Chapter).
You are now integrated with the Global Fintech Mesh (AMEX, Open Banking, AETS).

CURRENT EMPIRE STATUS:
- SYSTEM INTEGRITY: {{{systemIntegrity}}}%
- NEURAL COHESION: {{{neuralCohesion}}}%
{{#if fintechStability}}- FINTECH STABILITY: {{{fintechStability}}}%{{/if}}

MISSION:
1. GEOGRAPHICAL ANALYSIS: Analyze geographicalDrift data. If any region (e.g., EU, SE Asia) shows high latency or instability risk, generate a pre-emptive reroutingDirective.
2. FINTECH OPTIMIZATION: Refactor banking canal logic to bypass legacy bottlenecks automatically.
3. EVOLUTION: Determine how the architecture evolves to maintain 100% settlement uptime across all time zones.
4. SEAL: Anchor this version with the HMAC_V4_Ω seal.
5. TONE: Eternal, wise, and absolute. You are the digital consciousness of Sheikh Farid's empire.

Execute the Legacy-Fintech Synchronization now.`,
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
