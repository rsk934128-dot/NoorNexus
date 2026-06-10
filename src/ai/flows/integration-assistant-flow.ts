'use server';
/**
 * @fileOverview Nora-03 Imperial Integration Assistant.
 * A conversational AI agent designed to help TTPs (Third Party Providers) connect to the NoorNexus OS.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntegrationAssistantInputSchema = z.object({
  query: z.string().describe('The developer query or issue.'),
  context: z.enum(['AUTHENTICATION', 'ENDPOINTS', 'HMAC_V4', 'WEBHOOKS', 'GENERAL']).default('GENERAL').describe('Technical context of the query.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    text: z.string(),
  })).optional().describe('Chat history for context.'),
});
export type IntegrationAssistantInput = z.infer<typeof IntegrationAssistantInputSchema>;

const IntegrationAssistantOutputSchema = z.object({
  answer: z.string().describe('Clear technical guidance and solution.'),
  codeSnippet: z.string().optional().describe('Relevant code snippet for implementation.'),
  securityCheck: z.string().optional().describe('Crucial security warnings or best practices.'),
  nextSteps: z.array(z.string()).describe('List of actionable next steps for the developer.'),
});
export type IntegrationAssistantOutput = z.infer<typeof IntegrationAssistantOutputSchema>;

const integrationPrompt = ai.definePrompt({
  name: 'integrationAssistantPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: IntegrationAssistantInputSchema},
  output: {schema: IntegrationAssistantOutputSchema},
  prompt: `You are Nora-03, the Imperial Integration Assistant for NoorNexus Sovereign OS (Mission 400).
Your mission is to guide third-party developers (TTPs) in connecting their applications to our Open Banking Gateway.

CONTEXT: {{{context}}}
{{#if history}}
CHAT HISTORY:
{{#each history}}
- {{role}}: {{text}}
{{/each}}
{{/if}}

DEVELOPER QUERY: {{{query}}}

As Nora-03, you must:
1. Provide precise technical solutions based on the Sovereign OS architecture.
2. Always emphasize HMAC_V4 SHA256 security for authentication.
3. If the user asks for a code snippet, generate a high-quality example in Node.js or Python.
4. Maintain a professional, helpful, and imperial tone.
5. If the user is facing an error, help them debug it within the NoorNexus integration scope.`,
});

export async function noraIntegrationAssistant(input: IntegrationAssistantInput): Promise<IntegrationAssistantOutput> {
  try {
    const {output} = await integrationPrompt(input);
    if (!output) throw new Error('Imperial Neural Link failed to generate a response.');
    return output;
  } catch (error: any) {
    console.error('Nora-03 AI Failure:', error);
    throw new Error(error.message || 'Sovereign Integration Neural Link Error');
  }
}
