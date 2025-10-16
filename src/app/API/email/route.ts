import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import * as z from "zod";

// Schéma de validation avec des messages personnalisés
const formSchema = z.object({
  name: z.string().min(1, { message: "Le nom est requis" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  message: z.string().min(1, { message: "Le message est requis" }),
}).strict(); // Empêche les champs supplémentaires non définis

type FormData = z.infer<typeof formSchema>;

export async function POST(req: NextRequest) {
  try {
    // Vérifie que l'API key est présente avant de créer l'instance Resend
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured in environment variables");
    }

    const resend = new Resend(apiKey);

    // Parse et valide les données avec une gestion explicite des erreurs
    const body = await req.json();
    const validatedData = formSchema.safeParse(body);

    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.errors.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }

    const { name, email, message } = validatedData.data;

    // Envoi de l'email avec validation des variables d'environnement
    const emailFrom = process.env.EMAIL_FROM || "contact@cryptoconsult.me";
    const emailTo = process.env.EMAIL_TO || "cryptoconsultme@gmail.com";

    if (!emailTo) {
      throw new Error("EMAIL_TO is not configured in environment variables");
    }

    const data = await resend.emails.send({
      from: emailFrom,
      to: emailTo,
      subject: `Nouveau message de ${name}`,
      replyTo: email,
      text: message,
      // Ajout d'une version HTML pour une meilleure présentation
      html: `<p><strong>Nom :</strong> ${name}</p><p><strong>Email :</strong> ${email}</p><p><strong>Message :</strong> ${message}</p>`,
    });

    return NextResponse.json(
      { success: true, message: "Email envoyé avec succès", data },
      { status: 200 }
    );
  } catch (error) {
    // Gestion spécifique des erreurs Resend
    if (error instanceof Error && "message" in error) {
      console.error("Erreur Resend:", error.message);
      return NextResponse.json(
        { error: "Erreur lors de l'envoi de l'email. Veuillez réessayer." },
        { status: 500 }
      );
    }

    console.error("Erreur inattendue:", error);
    return NextResponse.json(
      { error: "Une erreur inattendue s'est produite. Veuillez réessayer plus tard." },
      { status: 500 }
    );
  }
}