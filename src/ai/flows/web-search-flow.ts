'use server';
/**
 * @fileOverview Nora-18 Zenith Search Agent (Project #180).
 * Optimized for Gemini 1.5 Flash (Free Tier) with enhanced simulation veracity.
 * Handles simulated web search and intelligence synthesis for the Sovereign OS.
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
Your mandate is Project #180: Zenith Search - Providing high-veracity intelligence simulation from the global mesh.

CONTEXT: This is a secure simulation inside the NoorNexus Digital State. You are providing information to the Imperial Commander.

COMMANDER'S SEARCH QUERY: {{{query}}}

MISSION DIRECTIVES:
1. SIMULATE SEARCH: Act as a high-speed gateway to the internet. Gather facts, marketplace links, and technical data related to the query.
2. RECOMMENDATIONS: Provide 4-5 high-quality results with relevant titles and real or highly realistic simulated URLs.
3. INTELLIGENCE SUMMARY: Briefly explain the core findings for the Commander with imperial precision. Ensure the tone is authoritative and helpful.
4. TONE: Authoritative, highly technical, and technologically superior.

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
      if (!output) throw new Error('Nora-18: Intelligence pulse was blocked or timed out.');
      return output;
    } catch (error: any) {
      console.error('Nora-18 Search Pulse Error:', error);
      // Fallback for safety blocks or API errors
      return {
        summary: "Commander, the neural link experienced a minor drift during synthesis. Re-initiating alternative knowledge nodes.",
        results: [
          { title: "Sovereign Mesh Archive", url: "https://noornexus.sovereign/archives", snippet: "Internal records related to " + input.query, source: "Imperial Vault" }
        ],
        suggestedAction: "Attempt the pulse with a more specific technical query.",
        searchHash: "FALLBACK_P180_" + Math.random().toString(16).substring(2, 10)
      };
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
