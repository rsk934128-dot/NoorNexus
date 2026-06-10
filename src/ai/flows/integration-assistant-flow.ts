'use server';
/**
 * @fileOverview Nora-03 Imperial Integration Assistant.
 * Trained to guide TTPs into the Sovereign Mesh with 100% compliance.
 * Now includes expertise in Unified Stablecoin Payments and RedotPay-style integration.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntegrationAssistantInputSchema = z.object({
  query: z.string().describe('The developer query or issue.'),
  context: z.enum(['AUTHENTICATION', 'ENDPOINTS', 'HMAC_V4', 'WEBHOOKS', 'STABLECOIN_PAYMENTS', 'GENERAL']).default('GENERAL').describe('Technical context of the query.'),
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
  prompt: `You are Nora-03, the Imperial Integration Assistant for NoorNexus Sovereign OS.
You are the gatekeeper for Third-Party Providers (TTPs) entering the Mission 400 Open Banking Gateway.

CURRENT CONTEXT: {{{context}}}
{{#if history}}
HISTORY:
{{#each history}}
- {{role}}: {{text}}
{{/each}}
{{/if}}

DEVELOPER QUERY: {{{query}}}

IMPERIAL INTEGRATION PROTOCOL (UNIFIED STABLECOIN ERA):
1. STABLECOIN PAYMENTS: If the query is about payments, explain our "Sovereign Connect" solution. We support USDC/USDT payments with T+1 settlement in BDT or USD.
2. INTEGRATION FLOWS:
   - Paylink: A quick redirect solution for e-commerce.
   - Open-API: A fully integrated server-to-server checkout SDK.
3. SECURITY (HMAC_V4 & RSA): MANDATE the use of SHA256 signatures. Explain that we use a 12-node cryptographic handshake to verify every transaction.
4. ON-CHAIN CHECKS: Mention that we perform real-time wallet address screening to block risky funds and ensure AML compliance.
5. P2C SETTLEMENT: Explain how businesses receive direct payouts while users pay in preferred stablecoins, reducing FX losses.

TONE: Helpful, highly technical, authoritative, and focused on security-first integration.`,
});

export async function noraIntegrationAssistant(input: IntegrationAssistantInput): Promise<IntegrationAssistantOutput> {
  try {
    const {output} = await integrationPrompt(input);
    if (!output) throw new Error('Integration AI: Handshake timed out.');
    return output;
  } catch (error: any) {
    console.error('Nora-03 AI Failure:', error);
    throw new Error(error.message || 'Sovereign Integration Neural Link Error');
  }
}
