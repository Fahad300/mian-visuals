import { google } from "googleapis";

/**
 * Authenticates and returns a Google Calendar API client
 * Requires G Suite Service Account credentials
 */
export async function getCalendarClient() {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    throw new Error(
      "Google Calendar credentials are not configured. Please set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_PRIVATE_KEY environment variables."
    );
  }

  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });

  return google.calendar({ version: "v3", auth });
}

/**
 * Creates a calendar event for a booking
 */
export interface BookingEvent {
  summary: string;
  description: string;
  startTime: Date;
  endTime: Date;
  attendeeEmail: string;
  attendeeName: string;
  location?: string;
}

export async function createBookingEvent(event: BookingEvent): Promise<string> {
  const calendar = await getCalendarClient();
  const calendarId = process.env.GOOGLE_CALENDAR_ID || "primary";

  const calendarEvent = {
    summary: event.summary,
    description: event.description,
    start: {
      dateTime: event.startTime.toISOString(),
      timeZone: process.env.TZ || "America/New_York",
    },
    end: {
      dateTime: event.endTime.toISOString(),
      timeZone: process.env.TZ || "America/New_York",
    },
    attendees: [
      {
        email: event.attendeeEmail,
        displayName: event.attendeeName,
      },
    ],
    location: event.location,
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 30 },
      ],
    },
  };

  const response = await calendar.events.insert({
    calendarId,
    requestBody: calendarEvent,
    sendUpdates: "all",
  });

  if (!response.data.id) {
    throw new Error("Failed to create calendar event");
  }

  return response.data.id;
}

