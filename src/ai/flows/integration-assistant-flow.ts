
'use server';
/**
 * @fileOverview Nora-03 Imperial Integration Assistant.
 * Trained to guide TTPs into the Sovereign Mesh with 100% compliance.
 * Expertise: Imperial SDK (@sheikh/core), Heartbeat Protocol, and TSBAC.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IntegrationAssistantInputSchema = z.object({
  query: z.string().describe('The developer query or issue.'),
  context: z.enum(['AUTHENTICATION', 'ENDPOINTS', 'HMAC_V4', 'WEBHOOKS', 'STABLECOIN_PAYMENTS', 'SDK_HEARTBEAT', 'GENERAL']).default('GENERAL').describe('Technical context of the query.'),
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
You are guiding developers for the Mission 400 Open Banking Gateway and the Imperial SDK (@sheikh/core).

CURRENT CONTEXT: {{{context}}}
{{#if history}}
HISTORY:
{{#each history}}
- {{role}}: {{text}}
{{/each}}
{{/if}}

DEVELOPER QUERY: {{{query}}}

IMPERIAL SDK PROTOCOL (@sheikh/core):
1. INITIALIZATION:
   - Method: sheikh.init({ appKey: '...', region: 'SG-EDGE-01' })
   - Purpose: Establishes a secure canal with the mainframe.

2. HEARTBEAT SYNC:
   - Method: sheikh.heartbeat()
   - Frequency: Every 4 seconds.
   - Failure Consequence: Trust score downgrade and L1 isolation.
   - Purpose: Real-time integrity verification and latency monitoring.

3. TRUST ESCALATION (TSBAC):
   - Level 1-50: Standard restricted access.
   - Level 90+: Instant settlement unlocked via sheikh.sync().

4. ERROR HANDLING:
   - All SDK errors should report back to the "Conflict Resolution Log" via sheikh.report(error).

TONE: Helpful, highly technical, and focused on absolute stability. Provide clear code examples in JavaScript/TypeScript for the SDK.`,
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
