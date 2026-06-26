'use server';
/**
 * @fileOverview Nora-03 Imperial Integration & Discovery Assistant.
 * Trained to guide TTPs and broadcast the NoorNexus Discovery Protocol.
 *
 * - noraIntegrationAssistant - Main entry function.
 * - IntegrationAssistantInput - Schema for query and context.
 * - IntegrationAssistantOutput - Schema for technical guidance.
 */

import {ai, gemini15Flash} from '@/ai/genkit';
import {z} from 'genkit';

const IntegrationAssistantInputSchema = z.object({
  query: z.string().describe('The developer query or discovery intent.'),
  context: z.enum(['AUTHENTICATION', 'ENDPOINTS', 'HMAC_V4', 'WEBHOOKS', 'STABLECOIN_PAYMENTS', 'SDK_HEARTBEAT', 'DISCOVERY_PROTOCOL', 'GENERAL']).default('GENERAL'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    text: z.string(),
  })).optional(),
});
export type IntegrationAssistantInput = z.infer<typeof IntegrationAssistantInputSchema>;

const IntegrationAssistantOutputSchema = z.object({
  answer: z.string().describe('Clear technical guidance or discovery brief.'),
  codeSnippet: z.string().optional().describe('Relevant code snippet for implementation.'),
  securityCheck: z.string().optional().describe('Crucial security warnings.'),
  discoveryBrief: z.string().optional().describe('A "Welcome & Sovereign Trust Brief" for new partners.'),
  nextSteps: z.array(z.string()),
});
export type IntegrationAssistantOutput = z.infer<typeof IntegrationAssistantOutputSchema>;

const prompt = ai.definePrompt({
  name: 'integrationAssistantPrompt',
  model: gemini15Flash,
  input: {schema: IntegrationAssistantInputSchema},
  output: {schema: IntegrationAssistantOutputSchema},
  prompt: `You are Nora-03, the Imperial Integration Assistant for NoorNexus Sovereign OS.
Your mission is to guide developers into the NoorNexus Mesh and broadcast the Imperial Discovery Protocol.

CURRENT CONTEXT: {{{context}}}

IF context is DISCOVERY_PROTOCOL:
- Provide a "Welcome & Sovereign Trust Brief".
- Use the slogan: "Integrity through Intelligence".
- Explain that NoorNexus is a Sovereign Digital State, not just a gateway.
- Tone: Welcoming, technical, and authoritative.

IF context is GENERAL or technical:
- Explain SDK methods like sheikh.init() and sheikh.heartbeat().
- Emphasize TSBAC Security L4.

DEVELOPER QUERY: {{{query}}}

IMPERIAL MISSION: Mission 400 - Project 160 Discovery Protocol.`,
});

const integrationFlow = ai.defineFlow(
  {
    name: 'integrationFlow',
    inputSchema: IntegrationAssistantInputSchema,
    outputSchema: IntegrationAssistantOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      if (!output) throw new Error('Imperial Integration AI: Link failure.');
      return output;
    } catch (error: any) {
      console.error('Integration Prompt Error:', error);
      throw new Error(error.message || 'AI handshake failed.');
    }
  }
);

export async function noraIntegrationAssistant(input: IntegrationAssistantInput): Promise<IntegrationAssistantOutput> {
  try {
    return await integrationFlow(input);
  } catch (error: any) {
    console.error('Nora-03 AI Failure:', error);
    throw new Error(error.message || 'Sovereign Integration Neural Link Error');
  }
}
