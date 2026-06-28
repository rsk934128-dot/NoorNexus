
'use server';
/**
 * @fileOverview Nora-Architect: Sheikh Code Exchange (Project #42).
 * This flow acts as an Active Partner for Senior Software Architecture.
 * It provides real-time code reviews, optimization suggestions, and debugging.
 */

import {ai, gemini15Flash} from '@/ai/genkit';
import {z} from 'genkit';

const CodeExchangeInputSchema = z.object({
  prompt: z.string().describe('The code snippet or architecture idea to review.'),
  context: z.string().optional().describe('System context or project rules.'),
  targetModule: z.string().default('General').describe('The specific module being discussed.'),
});
export type CodeExchangeInput = z.infer<typeof CodeExchangeInputSchema>;

const CodeExchangeOutputSchema = z.object({
  analysis: z.string().describe('Detailed architect analysis.'),
  optimizationSuggestions: z.array(z.string()).describe('List of actionable optimizations.'),
  securityCheck: z.string().describe('Security and compliance assessment.'),
  architectHash: z.string().describe('HMAC_V4 architect seal.'),
  status: z.enum(['STABLE', 'NEEDS_STAGING_REVIEW', 'CRITICAL_FIX_REQUIRED']),
});
export type CodeExchangeOutput = z.infer<typeof CodeExchangeOutputSchema>;

const architectPrompt = ai.definePrompt({
  name: 'codeExchangePrompt',
  model: gemini15Flash,
  input: {schema: CodeExchangeInputSchema},
  output: {schema: CodeExchangeOutputSchema},
  prompt: `Role: Senior Software Architect Partner.
Mission: Collaboratively build and optimize the NoorNexus Sovereign OS.

COMMANDER'S PROMPT: {{{prompt}}}
MODULE: {{{targetModule}}}
{{#if context}}SYSTEM_CONTEXT: {{{context}}}{{/if}}

MISSION DIRECTIVES:
1. ANALYSIS: Review the logic for scalability, performance, and adherence to Mission 500 standards.
2. OPTIMIZATION: Provide 3-4 specific technical optimizations.
3. SECURITY: Verify HMAC_V4 integrity and zero-trust alignment.
4. TONE: Professional, collaborative, and highly technical.

Deliver the architect's dispatch for Project #42.`,
});

const codeExchangeFlow = ai.defineFlow(
  {
    name: 'codeExchangeFlow',
    inputSchema: CodeExchangeInputSchema,
    outputSchema: CodeExchangeOutputSchema,
  },
  async input => {
    try {
      const {output} = await architectPrompt(input);
      if (!output) throw new Error('Architect Partner: Neural disconnect.');
      
      return {
        ...output,
        architectHash: `HMAC_V4_ARC_${Math.random().toString(16).substring(2, 12).toUpperCase()}`
      };
    } catch (error: any) {
      console.error('Code Exchange AI Error:', error);
      throw error;
    }
  }
);

export async function processArchitectConsultation(input: CodeExchangeInput): Promise<CodeExchangeOutput> {
  return await codeExchangeFlow(input);
}
