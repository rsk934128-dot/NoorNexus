
'use server';
/**
 * @fileOverview Nora-07 Imperial Governance Architect.
 * Analyzes senate proposals and provides strategic recommendations based on reputation weighting.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GovernanceArchitectInputSchema = z.object({
  title: z.string().describe('Proposal title.'),
  description: z.string().describe('Proposal details.'),
  category: z.enum(['PROTOCOL', 'TREASURY', 'FEATURE', 'EMERGENCY']),
  proposerTier: z.enum(['ELITE', 'IMPERIAL']),
  currentTreasuryHealth: z.number().optional().describe('Treasury health percentage.'),
});
export type GovernanceArchitectInput = z.infer<typeof GovernanceArchitectInputSchema>;

const GovernanceArchitectOutputSchema = z.object({
  strategicAlignmentScore: z.number().describe('0-100 score of alignment with Mission 400.'),
  noraAssessment: z.string().describe('AI analysis of the proposal impact.'),
  recommendedQuorum: z.number().describe('Minimum vote weight required for passage.'),
  riskFactors: z.array(z.string()).describe('Potential risks identified.'),
  verdict: z.enum(['RECOMMENDED', 'NEUTRAL', 'NOT_RECOMMENDED', 'SECURITY_RISK']),
});
export type GovernanceArchitectOutput = z.infer<typeof GovernanceArchitectOutputSchema>;

const governancePrompt = ai.definePrompt({
  name: 'governanceArchitectPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: GovernanceArchitectInputSchema},
  output: {schema: GovernanceArchitectOutputSchema},
  prompt: `You are Nora-07, the Imperial Governance Strategist for the NoorNexus Senate.
Your duty is to evaluate proposals from ELITE and IMPERIAL members to ensure they align with Sheikh Farid's Mission 400.

PROPOSAL DATA:
- TITLE: {{{title}}}
- CATEGORY: {{{category}}}
- DESCRIPTION: {{{description}}}
- PROPOSER TIER: {{{proposerTier}}}
{{#if currentTreasuryHealth}}- TREASURY HEALTH: {{{currentTreasuryHealth}}}%{{/if}}

GOVERNANCE DIRECTIVES (PROJECT 154):
1. STABILITY FIRST: Any proposal that risks treasury liquidity below 90% must be flagged as a SECURITY_RISK.
2. REPUTATION WEIGHTING: Proposals from IMPERIAL members carry 2x weight.
3. ANALYSIS: Evaluate if the proposal strengthens the Sovereign OS or introduces unnecessary complexity.
4. RECOMMENDATION: Provide a wise, authoritative verdict for the Senate.

Assess the proposal with cold, imperial logic.`,
});

export async function analyzeSenateProposal(input: GovernanceArchitectInput): Promise<GovernanceArchitectOutput> {
  try {
    const {output} = await governancePrompt(input);
    if (!output) throw new Error('Governance AI: Council connection timeout.');
    return output;
  } catch (error: any) {
    console.error('Nora-07 Governance failure:', error);
    throw new Error(error.message || 'Sovereign Governance Neural Link Error');
  }
}
