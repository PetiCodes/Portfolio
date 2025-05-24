import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

export async function POST(req, res) {
  const { email, subject, message } = await req.json();
  console.log(email, subject, message);
  try {
    const data = await resend.emails.send({
      from: fromEmail,
      to: ['work.mohdpeti@gmail.com'],
      subject: `Portfolio Contact: ${subject}`,
      react: (
        <>
          <h1>New Contact Form Submission</h1>
          <p><strong>Subject:</strong> {subject}</p>
          <p><strong>From:</strong> {email}</p>
          <p><strong>Message:</strong></p>
          <p>{message}</p>
          <hr />
          <p><em>This message was sent through your portfolio contact form.</em></p>
        </>
      ),
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
