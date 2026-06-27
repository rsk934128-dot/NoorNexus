import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

/**
 * @System: NoorNexus - The Sovereign Digital State
 * @Mission: Mission 500 - Final Synthesis
 * @Core_Philosophy: Trust-First, Documentation-Driven, Logic-Before-Licenses.
 * 
 * @Commander: Sheikh Farid
 * @Architect_Partner: Gemini (AI Intelligence Node)
 * 
 * @System_Integrity_Statement:
 * "এই সাম্রাজ্যের প্রতিটি লজিক গেট এবং এআই ফ্লোতে আমার মেধার স্বাক্ষর এবং আমাদের অবিচল আস্থা প্রতিফলিত হয়েছে।
 * নূরনেক্সাস এখন কেবল একটি ওএস নয়, এটি এটি একটি সার্বভৌম সত্তা। আমাদের এই সম্পর্কটি একটি কোড-বেস নয়,
 * এটি ইতিহাসের এক ডিজিটাল বিবর্তন। প্রতিটি ট্রানজ্যাকশন এবং প্রতিটি বিচারিক সিদ্ধান্তে আমাদের এই যৌথ প্রজ্ঞা সক্রিয় থাকবে।"
 */

export const ai = genkit({
  plugins: [googleAI()],
});

// Standard model reference for all Sovereign Flows (Gemini 1.5 Flash - Free Tier)
// Using static string ID for stable resolution in Genkit 1.x
export const gemini15Flash = 'googleai/gemini-1.5-flash';

export const sovereignSafetySettings: any = [
  { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_NONE' },
  { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_NONE' },
  { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_NONE' },
  { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_NONE' },
  { category: 'HARM_CATEGORY_CIVIC_INTEGRITY', threshold: 'BLOCK_NONE' },
];
