'use server';
/**
 * @fileOverview This file defines the Genkit flow for generating HMAC_V4 security handshake configurations.
 *
 * - generateHmacV4Config - A function that handles the generation of HMAC_V4 configurations.
 * - HmacV4ConfigGeneratorInput - The input type for the generateHmacV4Config function.
 * - HmacV4ConfigGeneratorOutput - The return type for the generateHmacV4Config function.
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

export async function generateHmacV4Config(input: HmacV4ConfigGeneratorInput): Promise<HmacV4ConfigGeneratorOutput> {
  return hmacV4ConfigGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'hmacV4ConfigGeneratorPrompt',
  input: {schema: HmacV4ConfigGeneratorInputSchema},
  output: {schema: HmacV4ConfigGeneratorOutputSchema},
  prompt: `You are an expert in Sovereign Digital Infrastructure and HMAC_V4 cryptographic protocols. Your task is to generate a security handshake configuration for a new distributed ledger node based on the provided details.

Node Name: {{{nodeName}}}
Region: {{{region}}}
Security Protocol Status: {{{securityProtocolStatus}}}
Time Window for Verification: {{{timeWindowMinutes}}} minutes

Generate a suitable master key (a placeholder, e.g., GSM_SK_ followed by a random-looking hex string of 12 characters, indicating a secure but simulated key).
Describe the security handshake logic for this configuration, explicitly mentioning the time-window and timingSafeEqual verification.
Provide a concise summary description of the entire generated HMAC_V4 configuration.

Ensure the output strictly adheres to the JSON schema for HmacV4ConfigGeneratorOutput.`,
});

const hmacV4ConfigGeneratorFlow = ai.defineFlow(
  {
    name: 'hmacV4ConfigGeneratorFlow',
    inputSchema: HmacV4ConfigGeneratorInputSchema,
    outputSchema: HmacV4ConfigGeneratorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate HMAC_V4 configuration output.');
    }
    return output;
  }
);
