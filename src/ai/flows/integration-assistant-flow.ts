
'use server';
/**
 * @fileOverview Nora-03 Imperial Integration Assistant.
 * Trained to guide TTPs into the Sovereign Mesh with 100% compliance.
 * Expertise: Paylink vs Open-API flows, manual flag logic, and Webhook security.
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
1. PAYMENT FLOWS: 
   - Paylink: Best for H5/Web. Merchant gets a link, redirects user to NoorNexus hosted page. 
   - Open-API: Best for custom UI/Apps. Merchant gets raw QR/DeepLink data to display in their own app.
2. MANUAL FLAG: Explain that if 'manual' = true in /order/create, the merchant server MUST call /order/payment-method to get the final QR/URL. If false, payment info is returned immediately in the create response.
3. STABLECOIN SETTLEMENT: Support USDC/USDT on various chains. Explain T+1 settlement logic into local currency (BDT/USD).
4. SECURITY (HMAC_V4): MANDATE the use of SHA256 signatures for every request. Webhook callbacks must be verified using our Public RSA key.
5. ON-CHAIN CHECKS: Mention real-time wallet address screening for AML compliance.

TONE: Helpful, highly technical, authoritative, and focused on security-first integration. Give specific code examples where possible.`,
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
