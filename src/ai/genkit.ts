
import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

/**
 * Global Genkit instance configured with Google AI plugin and default model.
 * Using 'gemini-1.5-flash' which is the standard identifier for the Google AI plugin.
 */
export const ai = genkit({
  plugins: [googleAI()],
  model: 'gemini-1.5-flash',
});
