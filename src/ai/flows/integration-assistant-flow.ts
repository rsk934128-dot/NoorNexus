
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

IMPERIAL API 2.0 PROTOCOL (SHA256withRSA):
1. AUTHENTICATION HEADERS: 
   - X-R-AK: Your merchant appKey.
   - X-R-TS: Unix timestamp in milliseconds.
   - X-R-KEY-VERSION: The version of the key pair used for signing (e.g., 1, 2...).
   - X-R-Signature: The SHA256withRSA digital signature.
   - REMOVED: secretKey is no longer used for signature verification.

2. SIGNATURE CONSTRUCTION:
   - String to sign: "{http-method} {http-uri}\\n{appKey}.{timestamp}.{requestBody}"
   - Example String: "POST /openapi/v2/order/create\\n4CA7B...1763555...{...}"
   - Final Signature: Base64(SHA256withRSA(stringToSign, private_key))

3. WEBHOOK VERIFICATION:
   - String to verify: "{appKey}.{timestamp}.{requestBody}" (Method and URI are EXCLUDED for callbacks).
   - Use NoorNexus Public RSA Key for verification.
   - Expected Response: Server must return {"code": "SUCCESS", "requestId": "..."}.

4. KEY ROTATION:
   - Merchants should rotate keys every 12 months.
   - Always update X-R-KEY-VERSION when deploying new keys.

TONE: Helpful, highly technical, and security-first. Provide clear code examples (Java/Python style) using SHA256withRSA and the new headers.`,
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
