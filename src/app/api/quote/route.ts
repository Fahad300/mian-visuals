import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/lib/gmail";

/**
 * Package labels mapping
 */
const PACKAGE_LABELS: Record<string, string> = {
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
  "destination-wedding": "Destination Wedding",
};

/**
 * Quote form validation schema
 */
const quoteSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  duration: z.string().min(1, "Duration is required"),
  datesRequired: z.string().min(1, "Dates required is required"),
  venue: z.string().min(2, "Venue must be at least 2 characters"),
  message: z.string().optional(),
  preferredPackage: z.enum(["bronze", "silver", "gold", "destination-wedding"]),
});

/**
 * POST handler for quote form submissions
 * Sends email via G Suite Gmail SMTP
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = quoteSchema.parse(body);

    // Prepare email content
    const recipientEmail = process.env.CONTACT_EMAIL || process.env.GMAIL_USER;

    if (!recipientEmail) {
      return NextResponse.json(
        { error: "Contact email is not configured" },
        { status: 500 }
      );
    }

    const packageLabel = PACKAGE_LABELS[validatedData.preferredPackage] || validatedData.preferredPackage;

    const emailSubject = `Quote Request: ${packageLabel} Package - ${validatedData.name}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9A961; border-bottom: 2px solid #C9A961; padding-bottom: 10px;">
          New Quote Request
        </h2>
        <div style="margin-top: 20px;">
          <h3 style="color: #2C2C2C; margin-bottom: 15px;">Contact Information</h3>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
          <p><strong>Phone:</strong> <a href="tel:${validatedData.phone}">${validatedData.phone}</a></p>
        </div>
        <div style="margin-top: 25px;">
          <h3 style="color: #2C2C2C; margin-bottom: 15px;">Event Details</h3>
          <p><strong>Preferred Package:</strong> <span style="color: #C9A961; font-weight: bold;">${packageLabel}</span></p>
          <p><strong>Duration:</strong> ${validatedData.duration}</p>
          <p><strong>Dates Required:</strong> ${validatedData.datesRequired}</p>
          <p><strong>Venue:</strong> ${validatedData.venue}</p>
        </div>
        ${validatedData.message ? `
        <div style="margin-top: 25px; padding: 15px; background-color: #F5F5F5; border-left: 4px solid #C9A961;">
          <strong>Additional Message:</strong>
          <p style="margin-top: 10px; white-space: pre-wrap;">${validatedData.message}</p>
        </div>
        ` : ""}
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E8E8E8; color: #2C2C2C; font-size: 12px;">
          <p>This email was sent from the Mian Visuals quote request form.</p>
        </div>
      </div>
    `;

    const emailText = `
New Quote Request

Contact Information:
Name: ${validatedData.name}
Email: ${validatedData.email}
Phone: ${validatedData.phone}

Event Details:
Preferred Package: ${packageLabel}
Duration: ${validatedData.duration}
Dates Required: ${validatedData.datesRequired}
Venue: ${validatedData.venue}
${validatedData.message ? `\nAdditional Message:\n${validatedData.message}` : ""}

---
This email was sent from the Mian Visuals quote request form.
    `;

    // Send email via G Suite Gmail
    await sendEmail({
      to: recipientEmail,
      subject: emailSubject,
      html: emailHtml,
      text: emailText,
      replyTo: validatedData.email,
    });

    // Send confirmation email to the user
    if (process.env.SEND_CONFIRMATION_EMAIL === "true") {
      await sendEmail({
        to: validatedData.email,
        subject: "Thank you for your quote request - Mian Visuals",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #C9A961;">Thank you for your quote request!</h2>
            <p>Hi ${validatedData.name},</p>
            <p>We've received your quote request for the <strong>${packageLabel}</strong> package and will review it carefully.</p>
            <p>Our team will get back to you within 24-48 hours with a detailed quote and availability for your requested dates.</p>
            <div style="margin-top: 30px; padding: 20px; background-color: #F5F5F5; border-left: 4px solid #C9A961;">
              <p style="margin: 0;"><strong>Your Request Summary:</strong></p>
              <ul style="margin-top: 10px; padding-left: 20px;">
                <li>Package: ${packageLabel}</li>
                <li>Duration: ${validatedData.duration}</li>
                <li>Dates: ${validatedData.datesRequired}</li>
                <li>Venue: ${validatedData.venue}</li>
              </ul>
            </div>
            <p style="margin-top: 30px;">If you have any questions in the meantime, feel free to reach out to us.</p>
            <p>Best regards,<br>Mian Visuals Team</p>
          </div>
        `,
        text: `Thank you for your quote request!\n\nHi ${validatedData.name},\n\nWe've received your quote request for the ${packageLabel} package and will review it carefully.\n\nOur team will get back to you within 24-48 hours with a detailed quote and availability for your requested dates.\n\nYour Request Summary:\n- Package: ${packageLabel}\n- Duration: ${validatedData.duration}\n- Dates: ${validatedData.datesRequired}\n- Venue: ${validatedData.venue}\n\nIf you have any questions in the meantime, feel free to reach out to us.\n\nBest regards,\nMian Visuals Team`,
      });
    }

    return NextResponse.json(
      { message: "Quote request submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Quote form error:", error);
    return NextResponse.json(
      { error: "Failed to submit quote request. Please try again later." },
      { status: 500 }
    );
  }
}

