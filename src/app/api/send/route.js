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
      from: `Mohammed Petiwala Portfolio <${fromEmail}>`, // More personal sender name
      to: ['work.mohdpeti@gmail.com'],
      reply_to: email,
      subject: subject, // Use the original subject to look more natural
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Message from Your Portfolio</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background: white; padding: 20px; border: 1px solid #e9ecef; border-radius: 8px;">
            <h3 style="color: #495057; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #212529;">${message.replace(/\n/g, '<br>')}</p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef;">
            <p style="color: #6c757d; font-size: 14px; margin: 0;">
              This message was sent through the contact form on your portfolio website.
            </p>
          </div>
        </div>
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
