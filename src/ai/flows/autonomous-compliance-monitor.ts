
'use server';
/**
 * @fileOverview NoorNexus Autonomous Compliance Agent.
 * Monitors border anomalies and evaluates security risks.
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
Analyze this security packet for cryptographic drift, replay attacks, or signature tampering.

SIGNATURE: {{{signature}}}
TIMESTAMP: {{{timestamp}}}
PAYLOAD: {{{payload}}}
{{#if sourceNode}}NODE: {{{sourceNode}}}{{/if}}
{{#if requestPath}}PATH: {{{requestPath}}}{{/if}}

Perform a high-precision security audit and provide your tactical assessment.`,
});

export async function autonomousComplianceMonitor(
  input: AutonomousComplianceMonitorInput
): Promise<AutonomousComplianceMonitorOutput> {
  try {
    const {output} = await autonomousComplianceMonitorPrompt(input);
    if (!output) throw new Error('Neural link returned null payload.');
    return output;
  } catch (error: any) {
    console.error('Compliance AI Critical Failure:', error);
    throw new Error(error.message || 'Sovereign AI Infrastructure Connection Error');
  }
}
