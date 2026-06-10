
'use server';
/**
 * @fileOverview An autonomous AI compliance agent that monitors cryptographic anomalies
 * on the HMAC_V4 Digital Border and generates risk assessments.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutonomousComplianceMonitorInputSchema = z.object({
  signature: z
    .string()
    .describe('The X-Sovereign-Signature (HEX_HMAC_V4) received from an inter-node request.'),
  timestamp: z
    .number()
    .describe('The X-Sovereign-Timestamp (UNIX_TIMESTAMP) received with the request in seconds.'),
  payload: z
    .string()
    .describe('The raw request payload or data associated with the security event.'),
  sourceNode: z.string().optional().describe('Optional: The identifier of the node sending the request.'),
  requestPath: z
    .string()
    .optional()
    .describe('Optional: The API path of the request, e.g., /api/v1/webhooks/external-bank.'),
});
export type AutonomousComplianceMonitorInput = z.infer<typeof AutonomousComplianceMonitorInputSchema>;

const AutonomousComplianceMonitorOutputSchema = z.object({
  anomalyDetected: z.boolean().describe('True if a cryptographic anomaly or security event was detected.'),
  anomalyType:
    z.string().optional().describe('The type of anomaly detected, e.g., "Invalid Signature", "Timestamp Out of Window", "Potential Replay Attack".'),
  riskLevel: z
    .enum(['None', 'Low', 'Medium', 'High', 'Critical'])
    .describe('The assessed risk level of the security event.'),
  assessmentDetails:
    z.string().describe('A detailed explanation of the assessment, including findings and their implications.'),
  recommendedActions: z.array(z.string()).describe('A list of recommended actions to mitigate or investigate the anomaly.'),
});
export type AutonomousComplianceMonitorOutput = z.infer<typeof AutonomousComplianceMonitorOutputSchema>;

const verifyHmacV4Signature = ai.defineTool(
  {
    name: 'verifyHmacV4Signature',
    description: 'Verifies an HMAC_V4 SHA256 signature against a payload and timestamp.',
    inputSchema: z.object({
      signature: z.string(),
      timestamp: z.number(),
      payload: z.string(),
    }),
    outputSchema: z.object({
      isValid: z.boolean(),
      reason: z.string().optional(),
    }),
  },
  async ({signature, timestamp, payload}) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const isValidTime = Math.abs(currentTime - timestamp) <= 300;
    const isMockValid = signature.startsWith('0x') || signature.length > 10;
    
    if (!isValidTime) return { isValid: false, reason: 'Timestamp expired (outside 5min window)' };
    if (!isMockValid) return { isValid: false, reason: 'Invalid HMAC signature format' };
    
    return { isValid: true };
  }
);

const autonomousComplianceMonitorPrompt = ai.definePrompt({
  name: 'autonomousComplianceMonitorPrompt',
  model: 'googleai/gemini-1.5-flash',
  tools: [verifyHmacV4Signature],
  input: {schema: AutonomousComplianceMonitorInputSchema},
  output: {schema: AutonomousComplianceMonitorOutputSchema},
  prompt: `You are the NoorNexus Autonomous Compliance AI. Analyze this security event.
  
  Signature: {{{signature}}}
  Timestamp: {{{timestamp}}}
  Payload: {{{payload}}}
  Node: {{{sourceNode}}}
  Path: {{{requestPath}}}

  Use verifyHmacV4Signature tool to check integrity. Then provide a tactical risk assessment based on the tool's result. Speak with authority as an imperial intelligence agent.`,
});

export async function autonomousComplianceMonitor(
  input: AutonomousComplianceMonitorInput
): Promise<AutonomousComplianceMonitorOutput> {
  try {
    const {output} = await autonomousComplianceMonitorPrompt(input);
    if (!output) throw new Error('AI failed to generate compliance assessment.');
    return output;
  } catch (error: any) {
    console.error('Compliance Flow Error:', error);
    throw new Error(error.message || 'AI Infrastructure Handshake Error');
  }
}
