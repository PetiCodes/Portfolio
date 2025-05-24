import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const fromEmail = process.env.FROM_EMAIL || "onboarding@resend.dev";

export async function POST(req, res) {
  try {
    const { email, subject, message } = await req.json();
    console.log("Received email request:", { email, subject, message });
    console.log("Using API Key:", process.env.RESEND_API_KEY ? "Set" : "Not Set");
    console.log("Using FROM_EMAIL:", fromEmail);
    
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not set");
      return NextResponse.json({ error: "API key not configured" }, { status: 500 });
    }

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
    
    console.log("Email sent successfully:", data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json({ 
      error: "Failed to send email", 
      details: error.message 
    }, { status: 500 });
  }
}
