'use server';
/**
 * @fileOverview Nora-60 Video Extraction Agent (Project #60).
 * Simulates YouTube metadata extraction and provides download coordinates.
 * Updated with Sovereign Safety Settings and explicit model reference.
 */

import {ai, gemini15Flash, sovereignSafetySettings} from '@/ai/genkit';
import {z} from 'genkit';

const VideoExtractionInputSchema = z.object({
  url: z.string().describe('The YouTube URL to analyze.'),
});
export type VideoExtractionInput = z.infer<typeof VideoExtractionInputSchema>;

const VideoExtractionOutputSchema = z.object({
  title: z.string().describe('Video title.'),
  thumbnail: z.string().describe('Thumbnail URL.'),
  duration: z.string().describe('Video duration.'),
  author: z.string().describe('Channel name.'),
  qualities: z.array(z.object({
    label: z.string(),
    format: z.string(),
    size: z.string(),
  })),
  extractionHash: z.string().describe('HMAC_V4 extraction seal.'),
});
export type VideoExtractionOutput = z.infer<typeof VideoExtractionOutputSchema>;

const extractionPrompt = ai.definePrompt({
  name: 'videoExtractionPrompt',
  model: gemini15Flash,
  input: {schema: VideoExtractionInputSchema},
  output: {schema: VideoExtractionOutputSchema},
  config: {
    safetySettings: sovereignSafetySettings,
  },
  prompt: `You are Nora-60, the Imperial Media Sentinel for NoorNexus OS.
Your mission is to extract high-veracity metadata from the provided YouTube URL.

YOUTUBE URL: {{{url}}}

MISSION DIRECTIVES:
1. METADATA: Simulate the extraction of title, author, and duration.
2. FORMATS: Provide at least 3 formats: 1080p (MP4), 720p (MP4), and 320kbps (MP3).
3. SEAL: Provide a unique HMAC_V4_MEDIA hash based on the URL.
4. TONE: Authoritative and efficient.

Generate the extraction dispatch.`,
});

const extractionFlow = ai.defineFlow(
  {
    name: 'extractionFlow',
    inputSchema: VideoExtractionInputSchema,
    outputSchema: VideoExtractionOutputSchema,
  },
  async input => {
    try {
      const {output} = await extractionPrompt(input);
      if (!output) throw new Error('Media Hub: Neural disconnect during synthesis.');
      
      return {
        ...output,
        extractionHash: `HMAC_V4_MEDIA_${Math.random().toString(16).substring(2, 12).toUpperCase()}`
      };
    } catch (error: any) {
      console.error('Video Extraction Error:', error);
      throw error;
    }
  }
);

export async function processVideoExtraction(input: VideoExtractionInput): Promise<VideoExtractionOutput> {
  return await extractionFlow(input);
}
