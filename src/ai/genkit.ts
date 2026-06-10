
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

/**
 * NoorNexus Sovereign AI Core Configuration.
 * Standardized for Genkit 1.x with Google AI plugin.
 */
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-1.5-flash', // Global default model identifier
});
