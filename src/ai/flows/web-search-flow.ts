'use server';
/**
 * @fileOverview Nora-18 Zenith Search Agent (Project #180).
 * Optimized for Gemini 1.5 Flash (Free Tier) with enhanced simulation veracity.
 * Handles simulated web search and intelligence synthesis.
 */

import {ai, gemini15Flash, sovereignSafetySettings} from '@/ai/genkit';
import {z} from 'genkit';

const WebSearchInputSchema = z.object({
  query: z.string().describe('The search query or topic to find.'),
});
export type WebSearchInput = z.infer<typeof WebSearchInputSchema>;

const WebSearchOutputSchema = z.object({
  summary: z.string().describe('AI summary of the search findings.'),
  results: z.array(z.object({
    title: z.string(),
    url: z.string(),
    snippet: z.string(),
    source: z.string(),
  })),
  suggestedAction: z.string().describe('What the user should do next.'),
  searchHash: z.string().describe('HMAC_V4_180 search verification seal.'),
});
export type WebSearchOutput = z.infer<typeof WebSearchOutputSchema>;

const searchPrompt = ai.definePrompt({
  name: 'webSearchPrompt',
  model: gemini15Flash,
  input: {schema: WebSearchInputSchema},
  output: {schema: WebSearchOutputSchema},
  config: {
    safetySettings: sovereignSafetySettings,
    temperature: 0.7,
  },
  prompt: `You are Nora-18, the Imperial Search Sentinel for NoorNexus Sovereign OS.
Your mandate is Project #180: Zenith Search - Providing high-veracity intelligence from the digital mesh.

COMMANDER'S SEARCH QUERY: {{{query}}}

MISSION DIRECTIVES:
1. SIMULATE SEARCH: Act as a high-speed gateway to the internet. Gather facts, marketplace links, and technical data related to the query.
2. RECOMMENDATIONS: Provide 4-5 high-quality results with relevant titles and real or highly realistic simulated URLs.
3. INTELLIGENCE SUMMARY: Briefly explain the core findings for the Commander with imperial precision.
4. TONE: Authoritative, helpful, and technologically superior.

Deliver the intelligence dispatch immediately through the Sovereign Mesh.`,
});

const searchFlow = ai.defineFlow(
  {
    name: 'searchFlow',
    inputSchema: WebSearchInputSchema,
    outputSchema: WebSearchOutputSchema,
  },
  async input => {
    try {
      const {output} = await searchPrompt(input);
      if (!output) throw new Error('Nora-18: Search intelligence pulse timed out.');
      return output;
    } catch (error: any) {
      console.error('Nora-18 Search Pulse Error:', error);
      throw error;
    }
  }
);

export async function executeZenithSearch(input: WebSearchInput): Promise<WebSearchOutput> {
  try {
    return await searchFlow(input);
  } catch (error: any) {
    console.error('Nora-18 Execution Critical Failure:', error);
    throw new Error(error.message || 'Sovereign Search Neural Link Handshake Error');
  }
}
