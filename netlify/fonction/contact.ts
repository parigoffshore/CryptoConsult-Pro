import type { Handler } from "@netlify/functions";
import { Resend } from "resend";

const API_KEY = process.env.RESEND_API_KEY;
const resend = API_KEY ? new Resend(API_KEY) : null;

function escapeHtml(str: string) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  if (!resend) {
    console.error("RESEND_API_KEY is missing");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server misconfigured: missing RESEND_API_KEY" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { name, email, subject, message, date } = body;

    if (!subject || !message) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing subject or message" }) };
    }

    // Format email HTML
    const html = `
      <h2>Nouveau contact / RDV</h2>
      <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
      <p><strong>Email :</strong> ${escapeHtml(email)}</p>
      <p><strong>Sujet :</strong> ${escapeHtml(subject)}</p>
      <p><strong>Date souhaitée :</strong> ${escapeHtml(date || "Non précisée")}</p>
      <hr/>
      <p><strong>Message :</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    `;

    await resend.emails.send({
      from: "Cryptoconsult <contact@cryptoconsult.me>", // si tu n'as pas de domaine validé, Remplace par l'adresse supportée par Resend
      to: "cryptoconsultme@gmail.com",
      subject: `📩 Nouveau RDV / Contact — ${subject}`,
      html,
    });

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error("Error in contact function:", err);
    return { statusCode: 500, body: JSON.stringify({ error: "Failed to send email" }) };
  }
};

