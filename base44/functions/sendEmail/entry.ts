import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import nodemailer from 'npm:nodemailer@6.9.9';

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

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: GMAIL_USER,
                pass: Deno.env.get("GMAIL_APP_PASSWORD"),
            },
        });

        await transporter.sendMail({
            from: `"Aureon Digital" <${GMAIL_USER}>`,
            to,
            subject,
            text: body,
        });

        return Response.json({ success: true });
    } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
    }
});