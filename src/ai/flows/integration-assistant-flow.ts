
'use server';
/**
 * @fileOverview Nora-03 API Integration Assistant.
 * Helps third-party developers connect to the NoorNexus OS.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntegrationAssistantInputSchema = z.object({
  query: z.string().describe('Developer query about the API or integration.'),
  context: z.enum(['AUTHENTICATION', 'ENDPOINTS', 'HMAC_V4', 'WEBHOOKS']).describe('Integration context.'),
  samplePayload: z.string().optional().describe('A sample JSON payload if available.'),
});
export type IntegrationAssistantInput = z.infer<typeof IntegrationAssistantInputSchema>;

const IntegrationAssistantOutputSchema = z.object({
  answer: z.string().describe('AI response with technical guidance.'),
  codeSnippet: z.string().optional().describe('Relevant code snippet for the developer.'),
  securityWarning: z.string().optional().describe('Security considerations for this integration.'),
  suggestedEndpoints: z.array(z.string()).describe('List of recommended endpoints.'),
});
export type IntegrationAssistantOutput = z.infer<typeof IntegrationAssistantOutputSchema>;

const integrationPrompt = ai.definePrompt({
  name: 'integrationAssistantPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: IntegrationAssistantInputSchema},
  output: {schema: IntegrationAssistantOutputSchema},
  prompt: `You are Nora-03, the Imperial Integration Assistant for NoorNexus Sovereign OS.
Your mission is to guide third-party developers (TTPs) in connecting their systems to our Open Banking Gateway.

CONTEXT: {{{context}}}
QUERY: {{{query}}}
{{#if samplePayload}}PAYLOAD: {{{samplePayload}}}{{/if}}

Provide precise technical documentation, focusing on HMAC_V4 SHA256 security, zero-trust handshake, and BDT asset settlement. Always emphasize imperial security standards.`,
});

export async function noraIntegrationAssistant(input: IntegrationAssistantInput): Promise<IntegrationAssistantOutput> {
  try {
    const {output} = await integrationPrompt(input);
    if (!output) throw new Error('Integration AI failed to generate response.');
    return output;
  } catch (error: any) {
    console.error('Nora-03 AI Failure:', error);
    throw new Error(error.message || 'Integration Neural Link Error');
  }
}
