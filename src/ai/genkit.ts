
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

/**
 * NoorNexus Sovereign AI Core Configuration
 * Using standard Google AI plugin with Gemini 1.5 Flash.
 */
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-1.5-flash',
});
