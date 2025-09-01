'use server';

/**
 * @fileOverview AI tool to help draft compelling marketing content tailored to attract potential clients.
 *
 * - generateMarketingContent - A function that generates marketing content.
 * - GenerateMarketingContentInput - The input type for the generateMarketingContent function.
 * - GenerateMarketingContentOutput - The return type for the generateMarketingContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMarketingContentInputSchema = z.object({
  companyName: z.string().describe('The name of the crypto consulting company.'),
  serviceDescription: z.string().describe('A detailed description of the consulting services offered.'),
  targetAudience: z.string().describe('The target audience for the marketing content.'),
  tone: z.string().describe('The desired tone of the marketing content (e.g., professional, engaging, informative).'),
});
export type GenerateMarketingContentInput = z.infer<typeof GenerateMarketingContentInputSchema>;

const GenerateMarketingContentOutputSchema = z.object({
  marketingContent: z.string().describe('The generated marketing content.'),
});
export type GenerateMarketingContentOutput = z.infer<typeof GenerateMarketingContentOutputSchema>;

export async function generateMarketingContent(input: GenerateMarketingContentInput): Promise<GenerateMarketingContentOutput> {
  return generateMarketingContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMarketingContentPrompt',
  input: {schema: GenerateMarketingContentInputSchema},
  output: {schema: GenerateMarketingContentOutputSchema},
  prompt: `You are an expert marketing content writer for crypto consulting companies.

  Based on the following information, draft compelling marketing content tailored to attract potential clients:

  Company Name: {{{companyName}}}
  Service Description: {{{serviceDescription}}}
  Target Audience: {{{targetAudience}}}
  Tone: {{{tone}}}

  Marketing Content:`,
});

const generateMarketingContentFlow = ai.defineFlow(
  {
    name: 'generateMarketingContentFlow',
    inputSchema: GenerateMarketingContentInputSchema,
    outputSchema: GenerateMarketingContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
