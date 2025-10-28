export type ContactFormInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function contactFormSubmit(data: ContactFormInput) {
  // Remplacez par votre logique réelle (ex. : appel API)
  console.log("Form submitted:", data);
  return { success: true };
}
