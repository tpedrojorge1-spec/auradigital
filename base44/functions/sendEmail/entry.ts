import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const GMAIL_USER = "aureondigitalofc@gmail.com";

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        const user = await base44.auth.me();
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { to, subject, body } = await req.json();

        if (!to || !subject || !body) {
            return Response.json({ error: 'Missing required fields: to, subject, body' }, { status: 400 });
        }

        const GMAIL_APP_PASSWORD = Deno.env.get("GMAIL_APP_PASSWORD");

        // Encode credentials for SMTP AUTH LOGIN
        const credentials = btoa(`${GMAIL_USER}\0${GMAIL_USER}\0${GMAIL_APP_PASSWORD}`);

        // Build raw email
        const boundary = "----=_Part_aureon";
        const rawEmail = [
            `From: Aureon Digital <${GMAIL_USER}>`,
            `To: ${to}`,
            `Subject: ${subject}`,
            `MIME-Version: 1.0`,
            `Content-Type: text/plain; charset=UTF-8`,
            ``,
            body
        ].join("\r\n");

        // Use Gmail API via fetch with OAuth? No — use nodemailer-like approach via fetch to smtp2go or use smtp directly
        // Since Deno doesn't have raw TCP SMTP easily, we'll use smtp2go free API or Gmail REST API
        // Best approach: use Gmail SMTP via nodemailer npm package
        const nodemailer = await import('npm:nodemailer@6.9.9');

        const transporter = nodemailer.default.createTransport({
            service: 'gmail',
            auth: {
                user: GMAIL_USER,
                pass: GMAIL_APP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"Aureon Digital" <${GMAIL_USER}>`,
            to,
            subject,
            text: body,
        });

        return Response.json({ success: true, message: `E-mail enviado para ${to}` });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});