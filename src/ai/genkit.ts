import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

/**
 * NoorNexus Sovereign AI Core Configuration.
 * Configured to use the free gemini-1.5-flash model via Google AI plugin.
 */
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-1.5-flash',
});
