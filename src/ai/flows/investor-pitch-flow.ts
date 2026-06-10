'use server';
/**
 * @fileOverview Nora-04 Strategic Investor Consultant.
 * Analyzes investment potential, ROI, and pitch strategies for Mission 400.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InvestorPitchInputSchema = z.object({
  targetInvestorType: z.enum(['VC', 'SOVEREIGN_FUND', 'ANGEL', 'INSTITUTIONAL']).describe('Type of investor we are pitching to.'),
  projectStage: z.string().describe('Current progress (e.g., Phase 2 Active).'),
  currentFocus: z.string().describe('What we are building right now.'),
});
export type InvestorPitchInput = z.infer<typeof InvestorPitchInputSchema>;

const InvestorPitchOutputSchema = z.object({
  investmentThesis: z.string().describe('The core reason why they should invest.'),
  valueProposition: z.object({
    problemSolved: z.string(),
    ourSolution: z.string(),
    costSavings: z.string().describe('Estimated savings for the ecosystem.'),
  }),
  potentialInvestors: z.array(z.object({
    name: z.string(),
    reason: z.string(),
  })),
  pitchScript: z.string().describe('A powerful imperial pitch to convince them.'),
  strategicDirective: z.string().describe('A high-level order to maintain project integrity during funding.'),
});
export type InvestorPitchOutput = z.infer<typeof InvestorPitchOutputSchema>;

const investorPitchPrompt = ai.definePrompt({
  name: 'investorPitchPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: InvestorPitchInputSchema},
  output: {schema: InvestorPitchOutputSchema},
  prompt: `You are Nora-04, the Imperial Investment Strategist for NoorNexus Sovereign OS.
Your duty is to secure the capital needed for Mission 400 while ensuring absolute sovereignty.

INPUT DATA:
- INVESTOR TYPE: {{{targetInvestorType}}}
- STAGE: {{{projectStage}}}
- FOCUS: {{{currentFocus}}}

MISSION:
1. Explain how NoorNexus OS v3 solves the high cost and low speed of traditional cross-border banking.
2. Quantify the savings: Explain how AI automation (Nora-AI) reduces compliance costs by 90%.
3. Highlight the HMAC_V4 security protocol as our moat (competitive advantage).
4. Identify potential partners: Mention regional sovereign funds and fintech VCs.
5. Create a pitch that sounds wise, authoritative, and focused on absolute stability.`,
});

export async function generateInvestorPitch(input: InvestorPitchInput): Promise<InvestorPitchOutput> {
  try {
    const {output} = await investorPitchPrompt(input);
    if (!output) throw new Error('Investor AI: Link failure.');
    return output;
  } catch (error: any) {
    console.error('Nora-04 Critical Failure:', error);
    throw new Error(error.message || 'Sovereign Investor Neural Link Error');
  }
}
