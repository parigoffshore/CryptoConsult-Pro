'use server';

import { generateMarketingContent, type GenerateMarketingContentInput } from '@/ai/flows/generate-marketing-content';
import { generateServiceDescriptions, type GenerateServiceDescriptionsInput } from '@/ai/flows/generate-service-descriptions';
import { z } from 'zod';

const marketingContentSchema = z.object({
  companyName: z.string(),
  serviceDescription: z.string(),
  targetAudience: z.string(),
  tone: z.string(),
});

const serviceDescriptionSchema = z.object({
  serviceName: z.string(),
  targetAudience: z.string(),
  keyBenefits: z.string(),
  style: z.string(),
});

export async function handleGenerateMarketingContent(data: GenerateMarketingContentInput) {
  const validatedData = marketingContentSchema.parse(data);
  try {
    const result = await generateMarketingContent(validatedData);
    return result;
  } catch (error) {
    console.error("Error generating marketing content:", error);
    throw new Error("Failed to generate marketing content.");
  }
}

export async function handleGenerateServiceDescriptions(data: GenerateServiceDescriptionsInput) {
  const validatedData = serviceDescriptionSchema.parse(data);
  try {
    const result = await generateServiceDescriptions(validatedData);
    return result;
  } catch (error) {
    console.error("Error generating service descriptions:", error);
    throw new Error("Failed to generate service descriptions.");
  }
}
