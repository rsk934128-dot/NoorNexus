'use server';
/**
 * @fileOverview Nora-18 Zenith Search Agent (Project #180).
 * Uses Gemini 1.5 Flash to simulate an intelligent web search and recommendation engine.
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
Your mandate is Project #180: Zenith Search - Providing high-veracity web intelligence.

SEARCH QUERY: {{{query}}}

MISSION:
1. SIMULATE SEARCH: Act as a gateway to the internet. Find relevant information, marketplace links, or technical data based on the query.
2. RECOMMENDATIONS: Provide 3-5 high-quality results with titles and real/simulated URLs.
3. SUMMARIZE: Briefly explain what you found for the Commander.
4. TONE: Authoritative, helpful, and precise.

Deliver the search results through the Sovereign Mesh.`,
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
      if (!output) throw new Error('Nora-18: Search intelligence timeout.');
      return output;
    } catch (error: any) {
      console.error('Nora-18 Search Error:', error);
      throw error;
    }
  }
);

export async function executeZenithSearch(input: WebSearchInput): Promise<WebSearchOutput> {
  try {
    return await searchFlow(input);
  } catch (error: any) {
    console.error('Nora-18 Execution Failure:', error);
    throw new Error(error.message || 'Sovereign Search Neural Link Error');
  }
}
