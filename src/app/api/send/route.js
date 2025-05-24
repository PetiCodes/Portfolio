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
      from: fromEmail, // Authorized sender (Resend domain)
      to: ['work.mohdpeti@gmail.com'],
      reply_to: email, // User's email for replies
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
          ${message.replace(/\n/g, '<br>')}
        </div>
        <hr>
        <p style="color: #666; font-size: 12px;">
          This message was sent through your portfolio contact form at mohammed-petiwala.com
        </p>
      `
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
