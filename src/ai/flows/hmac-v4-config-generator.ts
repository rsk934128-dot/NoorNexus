'use server';
/**
 * @fileOverview HMAC_V4 security handshake configuration generator using Gemini 1.5 Flash.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const HmacV4ConfigGeneratorInputSchema = z.object({
  nodeName: z.string().describe('The name of the distributed ledger node.'),
  region: z.string().describe('The geographical region of the node (e.g., Sirajganj-Edge-01).'),
  securityProtocolStatus: z.string().describe('The desired security protocol status (e.g., STABLE_L4).'),
  timeWindowMinutes: z.number().int().positive().describe('The time window in minutes for timingSafeEqual verification.'),
});
export type HmacV4ConfigGeneratorInput = z.infer<typeof HmacV4ConfigGeneratorInputSchema>;

const HmacV4ConfigGeneratorOutputSchema = z.object({
  masterKey: z.string().describe('The generated master key for the node (e.g., GSM_SK_9a6c22bb...).'),
  region: z.string().describe('The geographical region of the node.'),
  protocolStatus: z.string().describe('The security protocol status.'),
  logic: z.string().describe('A description of the security handshake logic, including time window and verification.'),
  description: z.string().describe('A summary description of the generated HMAC_V4 configuration.'),
});
export type HmacV4ConfigGeneratorOutput = z.infer<typeof HmacV4ConfigGeneratorOutputSchema>;

const hmacV4ConfigGeneratorPrompt = ai.definePrompt({
  name: 'hmacV4ConfigGeneratorPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: HmacV4ConfigGeneratorInputSchema},
  output: {schema: HmacV4ConfigGeneratorOutputSchema},
  prompt: `You are an expert in Sovereign Digital Infrastructure and HMAC_V4 cryptographic protocols. Generate a security handshake configuration.

Node Name: {{{nodeName}}}
Region: {{{region}}}
Security Protocol Status: {{{securityProtocolStatus}}}
Time Window: {{{timeWindowMinutes}}} minutes

Generate a suitable master key, describe the logic, and summarize the config.`,
});

export async function generateHmacV4Config(input: HmacV4ConfigGeneratorInput): Promise<HmacV4ConfigGeneratorOutput> {
  try {
    const {output} = await hmacV4ConfigGeneratorPrompt(input);
    if (!output) throw new Error('Failed to generate HMAC_V4 configuration output.');
    return output;
  } catch (error: any) {
    console.error('Config Generator Error:', error);
    throw new Error(error.message || 'Security AI Handshake Error');
  }
}
