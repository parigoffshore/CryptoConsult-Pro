import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM as string, // ton domaine validé
      to: process.env.EMAIL_TO as string,     // ou body.to si tu veux dynamique
      subject: body.subject || "Message depuis ton site",
      html: `<p>${body.message || "Message vide"}</p>`,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur Resend:", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
