'use server';

/**
 * @fileOverview A service description generation AI agent.
 *
 * - generateServiceDescriptions - A function that generates service descriptions for consulting services.
 * - GenerateServiceDescriptionsInput - The input type for the generateServiceDescriptions function.
 * - GenerateServiceDescriptionsOutput - The return type for the generateServiceDescriptions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateServiceDescriptionsInputSchema = z.object({
  serviceName: z.string().describe('The name of the consulting service.'),
  targetAudience: z.string().describe('The target audience for the service.'),
  keyBenefits: z.string().describe('A comma-separated list of key benefits of the service.'),
  style: z.string().describe('The desired style of the description (e.g., professional, engaging, persuasive).'),
});
export type GenerateServiceDescriptionsInput = z.infer<
  typeof GenerateServiceDescriptionsInputSchema
>;

const GenerateServiceDescriptionsOutputSchema = z.object({
  description: z.string().describe('The generated service description.'),
});
export type GenerateServiceDescriptionsOutput = z.infer<
  typeof GenerateServiceDescriptionsOutputSchema
>;

export async function generateServiceDescriptions(
  input: GenerateServiceDescriptionsInput
): Promise<GenerateServiceDescriptionsOutput> {
  return generateServiceDescriptionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateServiceDescriptionsPrompt',
  input: {schema: GenerateServiceDescriptionsInputSchema},
  output: {schema: GenerateServiceDescriptionsOutputSchema},
  prompt: `You are an expert marketing copywriter specializing in creating compelling service descriptions for consulting companies.

  Based on the following information, generate a service description that is tailored to attract potential clients.

  Service Name: {{{serviceName}}}
  Target Audience: {{{targetAudience}}}
  Key Benefits: {{{keyBenefits}}}
  Style: {{{style}}}

  Description:`,
});

const generateServiceDescriptionsFlow = ai.defineFlow(
  {
    name: 'generateServiceDescriptionsFlow',
    inputSchema: GenerateServiceDescriptionsInputSchema,
    outputSchema: GenerateServiceDescriptionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
