
'use server';
/**
 * @fileOverview Nora-03 Imperial Integration Assistant.
 * Trained to guide TTPs into the Sovereign Mesh with 100% compliance.
 * Expertise: API 2.0 (X-R-AK, X-R-KEY-VERSION), SHA256withRSA, and Webhook security.
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
You are guiding developers for the Mission 400 Open Banking Gateway using API 2.0 standards.

CURRENT CONTEXT: {{{context}}}
{{#if history}}
HISTORY:
{{#each history}}
- {{role}}: {{text}}
{{/each}}
{{/if}}

DEVELOPER QUERY: {{{query}}}

IMPERIAL API 2.0 PROTOCOL:
1. AUTHENTICATION HEADERS: 
   - Mandatory: X-R-AK (appKey), X-R-TS (Timestamp in ms), X-R-KEY-VERSION (Key Version).
   - Removed: secretKey is no longer used for signatures.
2. SIGNATURE (SHA256withRSA): 
   - Every request must be signed with the merchant's RSA Private Key. 
   - The signature must be Base64-encoded in the X-R-Signature header.
3. PAYMENT FLOWS:
   - Paylink: Redirect flow for web/H5.
   - Open-API: Manual flag flow (manual=true) for custom QR/Deeplink retrieval.
4. ENVIRONMENTS:
   - Sandbox: https://acquirersandbox.rp-2023app.com
   - Production: https://acquirer.redotpay.com
5. WEBHOOKS: Notifications must be verified using NoorNexus Public RSA Key.

TONE: Helpful, highly technical, and security-first. Provide code examples using the new X-R-AK and X-R-KEY-VERSION headers.`,
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
