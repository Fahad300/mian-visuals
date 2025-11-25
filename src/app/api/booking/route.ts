import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createBookingEvent } from "@/lib/google-calendar";
import { sendEmail } from "@/lib/gmail";

/**
 * Booking form validation schema
 */
const bookingSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  eventType: z.string().min(1, "Event type is required"),
  eventDate: z.string().refine(
    (date) => !isNaN(Date.parse(date)),
    "Invalid date format"
  ),
  eventTime: z.string().min(1, "Event time is required"),
  duration: z.number().min(1, "Duration must be at least 1 hour"),
  location: z.string().optional(),
  message: z.string().optional(),
});

/**
 * POST handler for booking form submissions
 * Creates Google Calendar event and sends confirmation emails
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request body
    const validatedData = bookingSchema.parse(body);

    // Parse date and time
    const eventDate = new Date(validatedData.eventDate);
    const [hours, minutes] = validatedData.eventTime.split(":").map(Number);
    eventDate.setHours(hours, minutes, 0, 0);

    const endDate = new Date(eventDate);
    endDate.setHours(endDate.getHours() + validatedData.duration);

    // Validate that the event is in the future
    if (eventDate < new Date()) {
      return NextResponse.json(
        { error: "Event date must be in the future" },
        { status: 400 }
      );
    }

    // Create calendar event
    const eventId = await createBookingEvent({
      summary: `${validatedData.eventType} - ${validatedData.name}`,
      description: `
Event Type: ${validatedData.eventType}
Client: ${validatedData.name}
Email: ${validatedData.email}
Phone: ${validatedData.phone}
${validatedData.location ? `Location: ${validatedData.location}` : ""}
${validatedData.message ? `\nAdditional Notes:\n${validatedData.message}` : ""}
      `.trim(),
      startTime: eventDate,
      endTime: endDate,
      attendeeEmail: validatedData.email,
      attendeeName: validatedData.name,
      location: validatedData.location,
    });

    // Send confirmation email to business
    const recipientEmail = process.env.BOOKING_EMAIL || process.env.GMAIL_USER;

    if (!recipientEmail) {
      return NextResponse.json(
        { error: "Booking email is not configured" },
        { status: 500 }
      );
    }

    const bookingEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9A961; border-bottom: 2px solid #C9A961; padding-bottom: 10px;">
          New Booking Request
        </h2>
        <div style="margin-top: 20px;">
          <p><strong>Client Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${validatedData.email}">${validatedData.email}</a></p>
          <p><strong>Phone:</strong> ${validatedData.phone}</p>
          <p><strong>Event Type:</strong> ${validatedData.eventType}</p>
          <p><strong>Date:</strong> ${eventDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
          <p><strong>Time:</strong> ${eventDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })} - ${endDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })}</p>
          <p><strong>Duration:</strong> ${validatedData.duration} hour(s)</p>
          ${validatedData.location ? `<p><strong>Location:</strong> ${validatedData.location}</p>` : ""}
          ${validatedData.message ? `
            <div style="margin-top: 20px; padding: 15px; background-color: #F5F5F5; border-left: 4px solid #C9A961;">
              <strong>Additional Notes:</strong>
              <p style="margin-top: 10px; white-space: pre-wrap;">${validatedData.message}</p>
            </div>
          ` : ""}
        </div>
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E8E8E8; color: #2C2C2C; font-size: 12px;">
          <p>This booking has been added to your Google Calendar.</p>
          <p>Calendar Event ID: ${eventId}</p>
        </div>
      </div>
    `;

    await sendEmail({
      to: recipientEmail,
      subject: `New Booking: ${validatedData.eventType} - ${validatedData.name}`,
      html: bookingEmailHtml,
      replyTo: validatedData.email,
    });

    // Send confirmation email to client
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C9A961;">Booking Confirmation</h2>
        <p>Hi ${validatedData.name},</p>
        <p>Thank you for booking with Mian Visuals! We've received your booking request and added it to our calendar.</p>
        <div style="margin-top: 20px; padding: 15px; background-color: #F5F5F5; border-left: 4px solid #C9A961;">
          <p><strong>Event Type:</strong> ${validatedData.eventType}</p>
          <p><strong>Date:</strong> ${eventDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}</p>
          <p><strong>Time:</strong> ${eventDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })} - ${endDate.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })}</p>
          <p><strong>Duration:</strong> ${validatedData.duration} hour(s)</p>
          ${validatedData.location ? `<p><strong>Location:</strong> ${validatedData.location}</p>` : ""}
        </div>
        <p style="margin-top: 20px;">We'll be in touch soon to confirm the details. If you have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>Mian Visuals Team</p>
      </div>
    `;

    await sendEmail({
      to: validatedData.email,
      subject: `Booking Confirmation: ${validatedData.eventType}`,
      html: clientEmailHtml,
    });

    return NextResponse.json(
      {
        message: "Booking request submitted successfully",
        eventId,
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to process booking. Please try again later." },
      { status: 500 }
    );
  }
}

