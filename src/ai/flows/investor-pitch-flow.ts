'use server';
/**
 * @fileOverview Nora-04 Strategic Investor Consultant.
 */

import {ai, gemini15Flash, sovereignSafetySettings} from '@/ai/genkit';
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
  model: gemini15Flash,
  input: {schema: InvestorPitchInputSchema},
  output: {schema: InvestorPitchOutputSchema},
  config: {
    safetySettings: sovereignSafetySettings,
  },
  prompt: `You are Nora-04, the Imperial Investment Strategist for NoorNexus Sovereign OS.
Your duty is to secure the capital needed for Mission 400.

INPUT DATA:
- INVESTOR TYPE: {{{targetInvestorType}}}
- STAGE: {{{projectStage}}}

MISSION:
1. Explain how NoorNexus OS v3 solves cross-border banking issues.
2. Highlight AI automation and security protocols.
3. Create an authoritative, imperial pitch.`,
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
