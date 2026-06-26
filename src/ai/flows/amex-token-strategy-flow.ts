'use server';
/**
 * @fileOverview Nora-21 AMEX Token Strategist.
 * Analyzes card tokenization requests and provides risk assessment.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TokenStrategyInputSchema = z.object({
  cardType: z.string().describe('Type of card (e.g. Personal, Business).'),
  transactionContext: z.string().describe('Where this token will be used.'),
  userTrustScore: z.number().describe('Internal trust score of the user.'),
});
export type TokenStrategyInput = z.infer<typeof TokenStrategyInputSchema>;

const TokenStrategyOutputSchema = z.object({
  recommendation: z.enum(['TOKENIZE_IMMEDIATELY', 'REQUIRE_MFA', 'REJECT_INSECURE']),
  riskScore: z.number().describe('Risk level 0-100.'),
  tacticalJustification: z.string().describe('AI reasoning for the strategy.'),
  complianceMarkers: z.array(z.string()).describe('Required security headers/flags.'),
});
export type TokenStrategyOutput = z.infer<typeof TokenStrategyOutputSchema>;

const tokenPrompt = ai.definePrompt({
  name: 'amexTokenStrategyPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: TokenStrategyInputSchema},
  output: {schema: TokenStrategyOutputSchema},
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
    ]
  },
  prompt: `You are Nora-21, the Imperial Tokenization Architect for NoorNexus Sovereign OS.
Your mission is to secure the Digital Vault using American Express Token Service (AETS) protocols.

REQUEST CONTEXT:
- CARD_TYPE: {{{cardType}}}
- USAGE_ENV: {{{transactionContext}}}
- MESH_TRUST: {{{userTrustScore}}}%

MISSION DIRECTIVES:
1. Assess if the environment is secure enough for persistent token provisioning.
2. Calculate a Risk Score based on trust and usage context.
3. Recommend a tactical deployment path (Immediate, MFA, or Reject).
4. Tone: Authoritative, cold, and cryptographically precise.

Analyze the pulse and provide the AETS deployment strategy.`,
});

const tokenFlow = ai.defineFlow(
  {
    name: 'tokenFlow',
    inputSchema: TokenStrategyInputSchema,
    outputSchema: TokenStrategyOutputSchema,
  },
  async input => {
    try {
      const {output} = await tokenPrompt(input);
      if (!output) throw new Error('Nora-21: Neural link timeout.');
      return output;
    } catch (error: any) {
      console.error('Nora-21 Error:', error);
      throw error;
    }
  }
);

export async function consultTokenStrategist(input: TokenStrategyInput): Promise<TokenStrategyOutput> {
  return await tokenFlow(input);
}
