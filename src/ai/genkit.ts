import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

/**
 * NoorNexus Sovereign AI Core Configuration.
 * Configured to use the high-performance gemini-1.5-flash model.
 * This is the central intelligence hub for all Imperial Agents.
 */
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-1.5-flash',
});
