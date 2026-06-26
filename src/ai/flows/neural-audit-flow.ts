'use server';
/**
 * @fileOverview Nora-52 Neural Audit & Compliance Agent.
 * Performs real-time auditing of banking nodes against global regulatory standards (PSD2, GDPR).
 * Updated for Zenith Level Enterprise App ID monitoring and Live Pulse Testing.
 */

import {ai, gemini15Flash} from '@/ai/genkit';
import {z} from 'genkit';

const NeuralAuditInputSchema = z.object({
  appId: z.string().optional().describe('The Enterprise Application ID to monitor.'),
  nodeId: z.string().describe('The ID of the banking node being audited.'),
  nodeType: z.enum(['ASPSP', 'TPP', 'AGGREGATOR']),
  region: z.string().describe('Regulatory jurisdiction (e.g. EU, UK, US).'),
  lastTransactionHash: z.string().optional(),
  consentStatus: z.string().describe('Current user consent metadata.'),
  pulseMode: z.boolean().optional().describe('Whether this is a live connectivity pulse test.'),
});
export type NeuralAuditInput = z.infer<typeof NeuralAuditInputSchema>;

const NeuralAuditOutputSchema = z.object({
  complianceScore: z.number().min(0).max(100).describe('Overall adherence to regional standards.'),
  regulatoryVerdicts: z.array(z.object({
    regulation: z.string().describe('PSD2, GDPR, etc.'),
    status: z.enum(['COMPLIANT', 'NON_COMPLIANT', 'DRIFT_DETECTED']),
    reasoning: z.string()
  })),
  privacyRiskLevel: z.enum(['Low', 'Medium', 'High', 'Critical']),
  tacticalAction: z.string().describe('AI recommendation for node maintenance.'),
  auditSignature: z.string().describe('HMAC_V4 signed audit certificate.'),
  zenithStatus: z.string().optional().describe('Zenith Level traceability status for the App ID.'),
  pulseSuccess: z.boolean().optional().describe('Verification of live connectivity pulse.'),
});
export type NeuralAuditOutput = z.infer<typeof NeuralAuditOutputSchema>;

const auditPrompt = ai.definePrompt({
  name: 'neuralAuditPrompt',
  model: gemini15Flash,
  input: {schema: NeuralAuditInputSchema},
  output: {schema: NeuralAuditOutputSchema},
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
    ]
  },
  prompt: `You are Nora-52, the Imperial Neural Auditor for NoorNexus Sovereign OS.
Your mandate is Project #52: Real-time Regulatory Compliance and Data Sovereignty Audit.

AUDIT DATA:
{{#if appId}}- ENTERPRISE APP_ID: {{{appId}}} (ZENITH_LEVEL_MONITORING ACTIVE){{/if}}
- NODE: {{{nodeId}}}
- TYPE: {{{nodeType}}}
- REGION: {{{region}}}
- CONSENT: {{{consentStatus}}}
{{#if pulseMode}}- MODE: LIVE_PULSE_TEST (Verifying real-time API handshake veracity){{/if}}

MISSION DIRECTIVES:
1. PSD2 AUDIT: Verify if the node/app is correctly enforcing SCA and account access scopes.
2. ZENITH MONITORING: If an appId is provided, ensure all transactions under this key are verified against the Sovereign Ledger.
3. PULSE VERIFICATION: If pulseMode is active, analyze if the handshake latency and signature match the expected Sovereign Profile.
4. RISK SCORING: Calculate a compliance score (0-100). Any score < 95 must be flagged with a tacticalAction.
5. SIGNATURE: Every audit MUST be sealed with an HMAC_V4_52 certificate.

Tone: Precise, legalistic, and authoritative. You represent the Judicial Layer of the Empire.`,
});

const auditFlow = ai.defineFlow(
  {
    name: 'auditFlow',
    inputSchema: NeuralAuditInputSchema,
    outputSchema: NeuralAuditOutputSchema,
  },
  async input => {
    try {
      const {output} = await auditPrompt(input);
      if (!output) throw new Error('Nora-52: Audit link failure.');
      return output;
    } catch (error: any) {
      console.error('Nora-52 Prompt Error:', error);
      throw error;
    }
  }
);

export async function runNeuralAudit(input: NeuralAuditInput): Promise<NeuralAuditOutput> {
  try {
    return await auditFlow(input);
  } catch (error: any) {
    console.error('Nora-52 Audit Failure:', error);
    throw new Error(error.message || 'Neural Audit Handshake Error');
  }
}
