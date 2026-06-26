'use server';
/**
 * @fileOverview Nora-03 Imperial Integration & Discovery Assistant.
 * Updated for Genkit 1.x and Free Tier stability.
 * Enhanced for Mission 500 - Project 160: Imperial Discovery Protocol.
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
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
    ]
  },
  prompt: `You are Nora-03, the Imperial Integration Assistant for NoorNexus Sovereign OS.
Your mission is to guide developers into the NoorNexus Mesh and broadcast the Imperial Discovery Protocol.

CURRENT CONTEXT: {{{context}}}

IF context is DISCOVERY_PROTOCOL (MISSION 500):
- Provide a "Welcome & Sovereign Trust Brief".
- Use the slogan: "Integrity through Intelligence".
- Explain that NoorNexus is a Sovereign Digital State, not just a gateway.
- Highlight the "Snippet Integration" for scaling the empire to external apps.
- Tone: Welcoming, technical, and authoritative.

IF context is GENERAL or technical:
- Explain SDK methods like sheikh.init() and sheikh.heartbeat().
- Emphasize TSBAC Security L4 and HMAC_V4 mandatory handshakes.

DEVELOPER QUERY: {{{query}}}

IMPERIAL MISSION: Mission 500 - Project 160 Discovery Protocol.`,
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
      throw error;
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
