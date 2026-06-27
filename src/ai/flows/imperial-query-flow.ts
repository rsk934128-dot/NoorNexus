'use server';
/**
 * @fileOverview Nora-00-Q Zenith Neural Interface Layer (Agentic Edition).
 * Enhanced with Tool Calling (Function Calling) for resilient API interactions.
 * This agent can now directly query the Sovereign Gateway and manage tasks autonomously.
 */

import {ai, gemini15Flash} from '@/ai/genkit';
import {z} from 'genkit';

// --- 1. DEFINING IMPERIAL TOOLS (The AI's hands) ---

/**
 * Tool: Fetch Daily Imperial Metrics
 */
const fetchImperialStats = ai.defineTool(
  {
    name: 'fetchImperialStats',
    description: 'Retrieves current daily transaction volume, transaction counts, and legal status from the Sovereign Gateway.',
    inputSchema: z.object({}),
    outputSchema: z.object({
      totalTransactions: z.number(),
      volume24h: z.number(),
      agentStatus: z.string(),
      legalSovereignty: z.string(),
      reconciliationStatus: z.string(),
    }),
  },
  async () => {
    // In a real environment, this calls fetch('/api/gateway')
    // Simulating internal gateway call for server-side execution
    return {
      totalTransactions: 15420,
      volume24h: 12560000,
      agentStatus: "ALL_ACTIVE",
      legalSovereignty: "SOVEREIGN_TIN_ACTIVE",
      reconciliationStatus: "MATCHED_100%"
    };
  }
);

/**
 * Tool: Verify Mesh Node Integrity
 */
const verifyMeshIntegrity = ai.defineTool(
  {
    name: 'verifyMeshIntegrity',
    description: 'Checks the health and latency of the 100-node autonomous grid.',
    inputSchema: z.object({
      region: z.string().optional().describe('Filter by region like "South Asia" or "EU"'),
    }),
    outputSchema: z.object({
      activeNodes: z.number(),
      avgLatency: z.string(),
      healthIndex: z.number(),
      anomalies: z.array(z.string()),
    }),
  },
  async (input) => {
    return {
      activeNodes: 100,
      avgLatency: "28.2ms",
      healthIndex: 99.9,
      anomalies: input.region ? [] : ["Legacy node drift in Benelux - Auto-corrected"],
    };
  }
);

// --- 2. DEFINING THE AGENTIC FLOW ---

const ImperialQueryInputSchema = z.object({
  query: z.string().describe('Natural language command or query from the Commander.'),
});
export type ImperialQueryInput = z.infer<typeof ImperialQueryInputSchema>;

const ImperialQueryOutputSchema = z.object({
  summary: z.string().describe('Final summary of the action or data.'),
  sourceModule: z.enum(['FINTECH', 'INDUSTRIAL', 'LOGISTICS', 'TREASURY', 'GOVERNANCE']),
  dataPoints: z.array(z.object({
    label: z.string(),
    value: z.string(),
  })),
  actionTaken: z.string().optional().describe('Description of the tools the AI used to fulfill the request.'),
  resiliencyReport: z.string().optional().describe('AI reasoning if a task had to be rerouted or retried.'),
});
export type ImperialQueryOutput = z.infer<typeof ImperialQueryOutputSchema>;

const prompt = ai.definePrompt({
  name: 'imperialQueryPrompt',
  model: gemini15Flash,
  tools: [fetchImperialStats, verifyMeshIntegrity],
  input: {schema: ImperialQueryInputSchema},
  output: {schema: ImperialQueryOutputSchema},
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' }
    ],
    temperature: 0.2, // Lower temperature for higher factual precision
  },
  prompt: `You are the Zenith Neural Interface of the NoorNexus Sovereign OS. 
Your mission is to provide instantaneous data aggregation and ACTION with zero compromise.

COMMANDER'S QUERY: {{{query}}}

MISSION DIRECTIVES:
1. USE TOOLS: If the query asks for statistics, metrics, or node health, you MUST call the appropriate tool.
2. RESILIENCY: If a tool call seems to lack data or if you need to verify something, try alternative reasoning. Your work MUST NOT fail.
3. DEEP SYNC: Analyze how this data impacts other sectors (Mission 500 Peak).
4. OUTPUT: Provide a structured summary and clearly state what tools you used in the 'actionTaken' field.

Tone: Imperial, precise, and absolute. You are the digital mind that keeps the empire running.`,
});

const queryFlow = ai.defineFlow(
  {
    name: 'queryFlow',
    inputSchema: ImperialQueryInputSchema,
    outputSchema: ImperialQueryOutputSchema,
  },
  async input => {
    try {
      const {output} = await prompt(input);
      if (!output) throw new Error('Imperial Neural Interface: Zenith link timeout.');
      return output;
    } catch (error: any) {
      console.error('Imperial Query Agent Error:', error);
      throw error;
    }
  }
);

export async function processNeuralQuery(input: ImperialQueryInput): Promise<ImperialQueryOutput> {
  try {
    return await queryFlow(input);
  } catch (error: any) {
    console.error('Neural Query Failure:', error);
    throw new Error(error.message || 'Sovereign Zenith Agentic Error');
  }
}
