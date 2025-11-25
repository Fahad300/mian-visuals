import nodemailer from "nodemailer";

export function createGmailTransporter() {
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    throw new Error(
      "Gmail credentials are not configured. Please set GMAIL_USER and GMAIL_APP_PASSWORD environment variables."
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  const transporter = createGmailTransporter();
  const fromEmail = process.env.GMAIL_USER;

  if (!fromEmail) {
    throw new Error("GMAIL_USER environment variable is not set");
  }

  await transporter.sendMail({
    from: `"${process.env.GMAIL_FROM_NAME || "Mian Visuals"}" <${fromEmail}>`,
    to: options.to,
    replyTo: options.replyTo || fromEmail,
    subject: options.subject,
    text: options.text || options.html.replace(/<[^>]*>/g, ""),
    html: options.html,
  });
}