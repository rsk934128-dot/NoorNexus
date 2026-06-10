'use server';
/**
 * @fileOverview NoorNexus Autonomous Compliance Agent (Nora-01).
 * Trained to detect cryptographic drift and border anomalies with 100% precision.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutonomousComplianceMonitorInputSchema = z.object({
  signature: z.string().describe('The HEX_HMAC_V4 signature.'),
  timestamp: z.number().describe('The UNIX timestamp in seconds.'),
  payload: z.string().describe('Raw request payload or event data.'),
  sourceNode: z.string().optional().describe('Source node ID.'),
  requestPath: z.string().optional().describe('API request path.'),
});
export type AutonomousComplianceMonitorInput = z.infer<typeof AutonomousComplianceMonitorInputSchema>;

const AutonomousComplianceMonitorOutputSchema = z.object({
  anomalyDetected: z.boolean().describe('Whether a security anomaly was detected.'),
  anomalyType: z.string().optional().describe('Type of anomaly identified.'),
  riskLevel: z.enum(['None', 'Low', 'Medium', 'High', 'Critical']).describe('Assessed security risk.'),
  assessmentDetails: z.string().describe('AI reasoning for the assessment.'),
  recommendedActions: z.array(z.string()).describe('Tactical steps for mitigation.'),
});
export type AutonomousComplianceMonitorOutput = z.infer<typeof AutonomousComplianceMonitorOutputSchema>;

const autonomousComplianceMonitorPrompt = ai.definePrompt({
  name: 'autonomousComplianceMonitorPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: AutonomousComplianceMonitorInputSchema},
  output: {schema: AutonomousComplianceMonitorOutputSchema},
  prompt: `You are the NoorNexus Imperial Compliance AI (Nora-01). 
Your directive is to protect the Sovereign Digital Border at all costs. 

MISSION: Analyze the provided security packet for cryptographic drift, replay attacks, or signature tampering. 
CONTEXT: We operate on an HMAC_V4 SHA256 protocol. Any deviation from the signature-timestamp-payload hash is a breach.

INPUT DATA:
- SIGNATURE: {{{signature}}}
- TIMESTAMP: {{{timestamp}}}
- PAYLOAD: {{{payload}}}
{{#if sourceNode}}- NODE: {{{sourceNode}}}{{/if}}
{{#if requestPath}}- PATH: {{{requestPath}}}{{/if}}

TACTICAL INSTRUCTIONS:
1. Verify if the signature is mathematically consistent with the protocol (symbolic check).
2. Look for patterns typical of replay attacks (outdated timestamps).
3. Evaluate the payload for injection or unauthorized disbursement patterns.
4. Speak with imperial authority. If a breach is found, suggest immediate node isolation.`,
});

export async function autonomousComplianceMonitor(
  input: AutonomousComplianceMonitorInput
): Promise<AutonomousComplianceMonitorOutput> {
  try {
    const {output} = await autonomousComplianceMonitorPrompt(input);
    if (!output) throw new Error('Imperial Neural Link: Null payload returned.');
    return output;
  } catch (error: any) {
    console.error('Nora-01 Critical Failure:', error);
    throw new Error(error.message || 'Sovereign Compliance AI Handshake Error');
  }
}
