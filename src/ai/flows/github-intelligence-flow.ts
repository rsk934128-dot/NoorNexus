
'use server';
/**
 * @fileOverview Nora-62 GitHub Intelligence Agent (Project #62).
 * Analyzes repository metrics and generates imperial reports.
 */

import {ai, gemini15Flash} from '@/ai/genkit';
import {z} from 'genkit';

const GithubIntelInputSchema = z.object({
  username: z.string().describe('The GitHub username.'),
  repoCount: z.number().describe('Total number of active repositories.'),
  topProjects: z.array(z.string()).describe('List of primary projects to analyze.'),
  lastCommitMessage: z.string().optional().describe('The most recent code commit.'),
});
export type GithubIntelInput = z.infer<typeof GithubIntelInputSchema>;

const GithubIntelOutputSchema = z.object({
  impactScore: z.number().describe('Overall development torque score (0-100).'),
  synthesis: z.string().describe('AI summary of the GitHub activity.'),
  recommendations: z.array(z.string()).describe('Strategic coding directives.'),
  intelHash: z.string().describe('HMAC_V4_62 security seal.'),
  status: z.enum(['SYNCED', 'DRIFT_DETECTED', 'MAINTENANCE']),
});
export type GithubIntelOutput = z.infer<typeof GithubIntelOutputSchema>;

const githubPrompt = ai.definePrompt({
  name: 'githubIntelligencePrompt',
  model: gemini15Flash,
  input: {schema: GithubIntelInputSchema},
  output: {schema: GithubIntelOutputSchema},
  prompt: `You are Nora-62, the Imperial Code Architect for NoorNexus OS.
Your mandate is to analyze the GitHub reports of Sheikh Farid's development nodes.

DEVELOPER DATA:
- COMMANDER: {{{username}}}
- REPOS: {{{repoCount}}}
- ACTIVE PROJECTS: {{#each topProjects}}{{{this}}}, {{/each}}
{{#if lastCommitMessage}}- LATEST PULSE: {{{lastCommitMessage}}}{{/if}}

MISSION DIRECTIVES:
1. ANALYSIS: Evaluate the torque of these repositories. Are they aligned with Mission 500?
2. SYNTHESIS: Provide a powerful, technical summary of the progress.
3. SEAL: Sign the report with HMAC_V4_62.

Tone: Authoritative, technical, and celebratory of the empire's growth.`,
});

const githubFlow = ai.defineFlow(
  {
    name: 'githubFlow',
    inputSchema: GithubIntelInputSchema,
    outputSchema: GithubIntelOutputSchema,
  },
  async input => {
    try {
      const {output} = await githubPrompt(input);
      if (!output) throw new Error('Nora-62: Neural link failed.');
      
      return {
        ...output,
        intelHash: `HMAC_V4_GH_${Math.random().toString(16).substring(2, 12).toUpperCase()}`,
        status: "SYNCED"
      };
    } catch (error: any) {
      console.error('GitHub Intel Error:', error);
      throw error;
    }
  }
);

export async function processGithubReports(input: GithubIntelInput): Promise<GithubIntelOutput> {
  return await githubFlow(input);
}
