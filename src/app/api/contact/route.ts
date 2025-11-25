import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/gmail";
import { validateEmail } from "@/lib/utils";

/**
 * Escape HTML to prevent XSS attacks
 * Converts special characters to HTML entities
 *
 * @param text - Text string to escape
 * @returns Escaped HTML string
 */
function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * POST handler for contact form submissions
 * Validates form data, sends email to admin, and sends auto-reply to customer
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, eventType, eventDate, message } = body;

    // Validate required fields
    if (!name || !email || !phone || !eventType || !eventDate || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Validate email format using utility
    if (!validateEmail(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Check if recipient email is configured
    const recipientEmail = process.env.CONTACT_EMAIL_TO || process.env.GMAIL_USER;
    if (!recipientEmail) {
      return NextResponse.json(
        { error: "Contact email is not configured" },
        { status: 500 }
      );
    }

    // Format event date
    const formattedDate = new Date(eventDate).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Escape user input to prevent XSS
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone);
    const safeEventType = escapeHtml(eventType);
    const safeMessage = escapeHtml(message);

    // Email to admin
    await sendEmail({
      to: recipientEmail,
      subject: `New Contact Form - ${safeEventType} on ${formattedDate}`,
      replyTo: email,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6; 
              color: #333; 
              margin: 0;
              padding: 0;
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
              background: #ffffff;
            }
            .header { 
              background: #000000; 
              color: #ffffff; 
              padding: 30px 20px; 
              text-align: center; 
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
              font-weight: 300;
              letter-spacing: 2px;
            }
            .content { 
              padding: 40px 30px; 
            }
            .field { 
              margin-bottom: 25px;
              border-bottom: 1px solid #f0f0f0;
              padding-bottom: 15px;
            }
            .label { 
              font-weight: 600; 
              color: #666; 
              display: block; 
              margin-bottom: 8px;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .value { 
              color: #000; 
              font-size: 16px;
            }
            .message-box {
              background: #f9f9f9;
              padding: 20px;
              border-left: 3px solid #000;
              margin-top: 10px;
              white-space: pre-wrap;
            }
            .footer { 
              text-align: center; 
              padding: 30px 20px; 
              background: #f9f9f9;
              color: #888; 
              font-size: 12px; 
            }
            .cta-button {
              display: inline-block;
              margin-top: 20px;
              padding: 12px 30px;
              background: #000;
              color: #fff;
              text-decoration: none;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>NEW INQUIRY</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.8;">Mian Visuals Contact Form</p>
            </div>
            <div class="content">
              <div class="field">
                <span class="label">Client Name</span>
                <div class="value">${safeName}</div>
              </div>
              <div class="field">
                <span class="label">Email</span>
                <div class="value"><a href="mailto:${safeEmail}">${safeEmail}</a></div>
              </div>
              <div class="field">
                <span class="label">Phone</span>
                <div class="value"><a href="tel:${safePhone}">${safePhone}</a></div>
              </div>
              <div class="field">
                <span class="label">Event Type</span>
                <div class="value" style="text-transform: capitalize;">${safeEventType}</div>
              </div>
              <div class="field">
                <span class="label">Event Date</span>
                <div class="value">${formattedDate}</div>
              </div>
              <div class="field">
                <span class="label">Message</span>
                <div class="message-box">${safeMessage}</div>
              </div>
              <div style="text-align: center;">
                <a href="mailto:${safeEmail}" class="cta-button">REPLY TO CLIENT</a>
              </div>
            </div>
            <div class="footer">
              <p>Mian Visuals Photography Studio</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Auto-reply to customer
    await sendEmail({
      to: email,
      subject: "Thank You for Contacting Mian Visuals",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6; 
              color: #333; 
            }
            .container { 
              max-width: 600px; 
              margin: 0 auto; 
            }
            .header { 
              background: #000000; 
              color: #ffffff; 
              padding: 40px 20px; 
              text-align: center; 
            }
            .content { 
              padding: 40px 30px; 
            }
            .highlight-box {
              background: #f9f9f9;
              padding: 20px;
              margin: 30px 0;
              border-left: 3px solid #000;
            }
            .footer { 
              text-align: center; 
              padding: 30px 20px; 
              background: #f9f9f9;
              font-size: 12px; 
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Thank You, ${safeName}!</h1>
            </div>
            <div class="content">
              <p>Thank you for reaching out to Mian Visuals. We're excited about your upcoming <strong>${safeEventType}</strong> on <strong>${formattedDate}</strong>.</p>
              
              <div class="highlight-box">
                <p><strong>What happens next?</strong></p>
                <p>Our team will review your inquiry and get back to you within 24 hours.</p>
              </div>
              
              <p>Best regards,<br><strong>Mian Visuals Team</strong></p>
            </div>
            <div class="footer">
              <p>Mian Visuals | Professional Photography Services</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to send email" },
      { status: 500 }
    );
  }
}
