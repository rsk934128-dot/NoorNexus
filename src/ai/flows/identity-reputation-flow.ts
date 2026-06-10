
'use server';
/**
 * @fileOverview Nora-06 Sovereign Identity Scorer.
 * Analyzes mesh-wide behavior and cross-chain activity to issue reputation tiers.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdentityReputationInputSchema = z.object({
  owner: z.string().describe('The owner unique identifier or email.'),
  linkedAddresses: z.array(z.string()).describe('List of blockchain wallet addresses.'),
  trustScore: z.number().describe('Internal trust score from the mesh.'),
  transactionHistorySummary: z.string().optional().describe('Summary of past transaction behavior.'),
});
export type IdentityReputationInput = z.infer<typeof IdentityReputationInputSchema>;

const IdentityReputationOutputSchema = z.object({
  did: z.string().describe('Generated Decentralized Identity string.'),
  reputationTier: z.enum(['NOVICE', 'VERIFIED', 'ELITE', 'IMPERIAL']),
  calculatedReputationScore: z.number().describe('Score from 0-1000.'),
  reasoning: z.string().describe('AI logic for the assigned reputation.'),
  attestationSignature: z.string().describe('HMAC_V4 signed attestation of reputation.'),
});
export type IdentityReputationOutput = z.infer<typeof IdentityReputationOutputSchema>;

const reputationPrompt = ai.definePrompt({
  name: 'identityReputationPrompt',
  model: 'googleai/gemini-1.5-flash',
  input: {schema: IdentityReputationInputSchema},
  output: {schema: IdentityReputationOutputSchema},
  prompt: `You are Nora-06, the Imperial Identity Registrar for NoorNexus Sovereign OS.
Your mission is to evaluate the global reputation of mesh participants and issue sovereign attestation signatures.

PARTICIPANT DATA:
- OWNER: {{{owner}}}
- WALLETS: {{#each linkedAddresses}}{{{this}}} {{/each}}
- MESH TRUST: {{{trustScore}}}
- HISTORY: {{{transactionHistorySummary}}}

REPUTATION CRITERIA (PROJECT 153):
1. DID GENERATION: Issue a DID in format did:noornexus:<owner_hash>.
2. REPUTATION SCORE: Scale 0-1000. Mesh Trust * 10 is the baseline. Add points for successful cross-chain bridges.
3. TIER ASSIGNMENT:
   - < 300: NOVICE
   - 300-600: VERIFIED
   - 600-900: ELITE
   - > 900: IMPERIAL (Requires perfect signature consistency)
4. ATTESTATION: Provide a reasoning that sounds wise and authoritative.

Sign the reputation passport with an HMAC_V4 seal.`,
});

export async function issueSovereignIdentity(input: IdentityReputationInput): Promise<IdentityReputationOutput> {
  try {
    const {output} = await reputationPrompt(input);
    if (!output) throw new Error('Identity AI: Registry link timeout.');
    return output;
  } catch (error: any) {
    console.error('Nora-06 Identity Failure:', error);
    throw new Error(error.message || 'Identity Neural Link Error');
  }
}
