'use server';
/**
 * @fileOverview HMAC_V4 configuration generator.
 */

import {ai, gemini15Flash, sovereignSafetySettings} from '@/ai/genkit';
import {z} from 'genkit';

const HmacV4ConfigGeneratorInputSchema = z.object({
  nodeName: z.string().describe('The name of the distributed ledger node.'),
  region: z.string().describe('The geographical region of the node.'),
  securityProtocolStatus: z.string().describe('The desired security protocol status.'),
  timeWindowMinutes: z.number().int().positive().describe('The time window in minutes.'),
});
export type HmacV4ConfigGeneratorInput = z.infer<typeof HmacV4ConfigGeneratorInputSchema>;

const HmacV4ConfigGeneratorOutputSchema = z.object({
  masterKey: z.string().describe('The generated master key for the node.'),
  region: z.string().describe('The geographical region of the node.'),
  protocolStatus: z.string().describe('The security protocol status.'),
  logic: z.string().describe('A description of the security handshake logic.'),
  description: z.string().describe('A summary description.'),
});
export type HmacV4ConfigGeneratorOutput = z.infer<typeof HmacV4ConfigGeneratorOutputSchema>;

const hmacV4ConfigGeneratorPrompt = ai.definePrompt({
  name: 'hmacV4ConfigGeneratorPrompt',
  model: gemini15Flash,
  input: {schema: HmacV4ConfigGeneratorInputSchema},
  output: {schema: HmacV4ConfigGeneratorOutputSchema},
  config: {
    safetySettings: sovereignSafetySettings,
  },
  prompt: `Generate an HMAC_V4 security handshake configuration.
Node Name: {{{nodeName}}}
Region: {{{region}}}

Provide logic and key summary.`,
});

export async function generateHmacV4Config(input: HmacV4ConfigGeneratorInput): Promise<HmacV4ConfigGeneratorOutput> {
  try {
    const {output} = await hmacV4ConfigGeneratorPrompt(input);
    if (!output) throw new Error('Failed to generate configuration.');
    return output;
  } catch (error: any) {
    console.error('Config Generator Error:', error);
    throw new Error(error.message || 'Security AI Error');
  }
}
