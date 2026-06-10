import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

/**
 * Global Genkit instance configured with Google AI plugin.
 */
export const ai = genkit({
  plugins: [googleAI()],
});
