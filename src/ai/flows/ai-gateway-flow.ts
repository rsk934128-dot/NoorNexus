
'use server';
/**
 * @fileOverview Zenith AI Gateway Orchestrator (Nora-00-GW).
 * Bridges Genkit flows with the AI Gateway concept for resilient model switching.
 */

import {ai, gemini15Flash} from '@/ai/genkit';
import {z} from 'genkit';

const AiGatewayInputSchema = z.object({
  prompt: z.string().describe('The command or query for the gateway.'),
  targetModel: z.string().default('gemini-1.5-flash').describe('The preferred model provider/ID.'),
  enableResiliency: z.boolean().default(true),
});
export type AiGatewayInput = z.infer<typeof AiGatewayInputSchema>;

const AiGatewayOutputSchema = z.object({
  response: z.string().describe('The synthesized AI response.'),
  modelUsed: z.string(),
  latencyMs: z.number(),
  tokenCount: z.number(),
  gatewayHash: z.string().describe('HMAC_V4 gateway seal.'),
  status: z.enum(['SUCCESS', 'REROUTED', 'RATE_LIMITED', 'FAILURE']),
});
export type AiGatewayOutput = z.infer<typeof AiGatewayOutputSchema>;

const gatewayPrompt = ai.definePrompt({
  name: 'aiGatewayPrompt',
  model: gemini15Flash,
  input: {schema: AiGatewayInputSchema},
  output: {schema: AiGatewayOutputSchema},
  prompt: `You are the Zenith AI Gateway Controller of NoorNexus OS.
Your mission is to fulfill the Commander's query using the most efficient path.

COMMANDER'S PROMPT: {{{prompt}}}
TARGET MODEL: {{{targetModel}}}

MISSION DIRECTIVES:
1. SYNTHESIS: Generate a high-veracity response.
2. METRICS: Simulate token count and latency for the gateway dashboard.
3. SEAL: Provide a unique HMAC_V4_GW hash.
4. TONE: Authoritative and efficient.

Deliver the gateway dispatch.`,
});

const gatewayFlow = ai.defineFlow(
  {
    name: 'gatewayFlow',
    inputSchema: AiGatewayInputSchema,
    outputSchema: AiGatewayOutputSchema,
  },
  async input => {
    const startTime = Date.now();
    try {
      const {output} = await gatewayPrompt(input);
      if (!output) throw new Error('Gateway Hub: Cognitive disconnect.');
      
      return {
        ...output,
        latencyMs: Date.now() - startTime,
        tokenCount: Math.floor(input.prompt.length / 4) + 150, // Simulated
        gatewayHash: `HMAC_V4_GW_${Math.random().toString(16).substring(2, 12).toUpperCase()}`
      };
    } catch (error: any) {
      console.error('AI Gateway Error:', error);
      throw error;
    }
  }
);

export async function processGatewayRequest(input: AiGatewayInput): Promise<AiGatewayOutput> {
  return await gatewayFlow(input);
}
