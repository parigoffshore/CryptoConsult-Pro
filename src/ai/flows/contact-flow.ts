'use server';
/**
 * @fileOverview A flow for handling contact form submissions.
 *
 * - contactFormSubmit - A function that handles the contact form submission process.
 * - ContactFormInput - The input type for the contactFormSubmit function.
 * - ContactFormOutput - The return type for the contactFormSubmit function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { Resend } from 'resend';

const ContactFormInputSchema = z.object({
  name: z.string().describe('The name of the person submitting the form.'),
  email: z.string().email().describe('The email address of the person.'),
  subject: z.string().describe('The subject of the contact message.'),
  message: z.string().describe('The message content.'),
});
export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

const ContactFormOutputSchema = z.object({
  success: z.boolean(),
});
export type ContactFormOutput = z.infer<typeof ContactFormOutputSchema>;

export async function contactFormSubmit(input: ContactFormInput): Promise<ContactFormOutput> {
  return contactFormFlow(input);
}

const prompt = ai.definePrompt({
    name: 'contactFormPrompt',
    input: { schema: ContactFormInputSchema },
    output: { schema: z.object({ anEmail: z.string().describe("An email body to be sent to the site owner. Make sure to include the name, email, subject, and message.") }) },
    prompt: `A user has submitted the contact form on your website. Here are the details:

Name: {{{name}}}
Email: {{{email}}}
Subject: {{{subject}}}
Message:
{{{message}}}

Please format this into a professional email body to be sent to the website owner. Do not add a subject line to the email body.
`,
});


const contactFormFlow = ai.defineFlow(
  {
    name: 'contactFormFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: ContactFormOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    
    // Configure Resend with your API key from .env.local
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
      await resend.emails.send({
        // For production, the domain in EMAIL_FROM must be verified in your Resend account.
        // We are using the default 'onboarding@resend.dev' for now to ensure it works.
        from: 'onboarding@resend.dev', 
        // The destination email address from .env.local
        to: process.env.EMAIL_TO as string,
        subject: `New Contact Form Submission: ${input.subject}`,
        html: output!.anEmail.replace(/\n/g, '<br>'), // Convert newlines to breaks for HTML email
      });
      return { success: true };
    } catch (error) {
      console.error("Email sending failed:", error);
      return { success: false };
    }
  }
);
