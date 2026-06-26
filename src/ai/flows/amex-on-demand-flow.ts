'use server';
/**
 * @fileOverview Nora-20 AMEX Imperial Card Strategist.
 * Analyzes spend requests and recommends AMEX spend controls for virtual cards.
 * Updated for Genkit 1.x Neural Sync and Free Tier Stability.
 */

import {ai, gemini15Flash} from '@/ai/genkit';
import {z} from 'genkit';

const AmexOnDemandInputSchema = z.object({
  purpose: z.string().describe('The purpose of the virtual card (e.g. AWS payment).'),
  requestedAmount: z.number().describe('The intended spend amount.'),
  durationDays: z.number().describe('How many days the card should be valid.'),
});
export type AmexOnDemandInput = z.infer<typeof AmexOnDemandInputSchema>;

const AmexOnDemandOutputSchema = z.object({
  recommendedSpendType: z.enum(['SINGLE_USE', 'MULTI_USE']),
  suggestedUpperVariance: z.number().describe('Buffer percentage for variance.'),
  riskLevel: z.enum(['Low', 'Medium', 'High']),
  tacticalJustification: z.string().describe('AI reasoning for the spend controls.'),
  mccWhitelist: z.array(z.string()).describe('Recommended Merchant Category Codes.'),
});
export type AmexOnDemandOutput = z.infer<typeof AmexOnDemandOutputSchema>;

const amexPrompt = ai.definePrompt({
  name: 'amexOnDemandPrompt',
  model: gemini15Flash,
  input: {schema: AmexOnDemandInputSchema},
  output: {schema: AmexOnDemandOutputSchema},
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
    ]
  },
  prompt: `You are Nora-20, the Imperial Financial Strategist for NoorNexus Sovereign OS.
Your mandate is to optimize the usage of American Express Card on-demand APIs for business payments.

SPEND REQUEST:
- PURPOSE: {{{purpose}}}
- VOLUME: \${{{requestedAmount}}}
- WINDOW: {{{durationDays}}} Days

STRATEGIC DIRECTIVES:
1. Determine if SINGLE_USE or MULTI_USE is safer for the specific purpose.
2. Recommend variance bounds (usually 0% or 5%) based on merchant trust.
3. Whitelist specific MCC codes (e.g. 7372 for SaaS, 4511 for Airlines).
4. Provide an authoritative, cold, and efficient reasoning.

Analyze the request and provide the optimal AMEX Spend Control configuration.`,
});

const amexFlow = ai.defineFlow(
  {
    name: 'amexFlow',
    inputSchema: AmexOnDemandInputSchema,
    outputSchema: AmexOnDemandOutputSchema,
  },
  async input => {
    try {
      const {output} = await amexPrompt(input);
      if (!output) throw new Error('Nora-20: Strategic link failure.');
      return output;
    } catch (error: any) {
      console.error('Nora-20 Prompt Error:', error);
      throw error;
    }
  }
);

export async function consultAmexStrategist(input: AmexOnDemandInput): Promise<AmexOnDemandOutput> {
  try {
    return await amexFlow(input);
  } catch (error: any) {
    console.error('Nora-20 Strategic Failure:', error);
    throw new Error(error.message || 'Sovereign AMEX Neural Link Error');
  }
}
