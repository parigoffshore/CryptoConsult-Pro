import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY || "");

    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Tous les champs sont obligatoires." },
        { status: 400 }
      );
    }

    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM || "contact@ton-domaine.com",
      to: process.env.EMAIL_TO || "cryptoconsultme@gmail.com",
      subject: `Nouveau message de ${name}`,
      reply_to: email,
      text: message
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Erreur envoi email:", error);
    return NextResponse.json(
      { error: "Impossible d’envoyer l’email." },
      { status: 500 }
    );
  }
}
