// netlify/functions/contact.js
exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const API_KEY = process.env.RESEND_API_KEY;
  if (!API_KEY) {
    console.error("Missing RESEND_API_KEY");
    return { statusCode: 500, body: JSON.stringify({ error: "Server misconfigured" }) };
  }

  try {
    const data = JSON.parse(event.body || "{}");
    const { name, email, subject, message } = data;

    if (!email || !message) {
      return { statusCode: 400, body: JSON.stringify({ error: "Email and message are required" }) };
    }

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        from: "Cryptoconsult <contact@cryptoconsult.me>",
        to: "cryptoconsultme@gmail.com",
        subject: subject || "Nouveau message contact",
        html: `
          <p><strong>Nom:</strong> ${name || "Anonyme"}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `
      })
    });

    if (!resp.ok) {
      const err = await resp.text();
      return { statusCode: 502, body: JSON.stringify({ error: err }) };
    }

    return { statusCode: 200, body: JSON.stringify({ success: true }) };
  } catch (e) {
    console.error("Contact error:", e);
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
