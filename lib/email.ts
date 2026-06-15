import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface InquiryEmailData {
  bookingRef: string;
  fullName: string;
  mobile: string;
  email: string;
  eventDate: Date;
  eventStartTime: string;
  eventLocation: string;
  guestCount: number;
  notes?: string | null;
}

export async function sendInquiryConfirmation(data: InquiryEmailData) {
  const formattedDate = data.eventDate.toLocaleDateString("en-PH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Manila",
  });

  await resend.emails.send({
    from: process.env.EMAIL_FROM ?? "Yao's Kitchen <noreply@yaoskitchen.com>",
    to: data.email,
    subject: `Your Inquiry Has Been Received — Ref: ${data.bookingRef}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="margin:0;padding:0;background-color:#F5F0EB;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#F5F0EB;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <tr><td align="center" style="padding-bottom:32px;">
          <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#2D5016;">YAO'S KITCHEN</p>
          <p style="margin:4px 0 0;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:#2D5016;opacity:0.6;">Premium Wake Catering</p>
        </td></tr>

        <tr><td style="background-color:#ffffff;border-radius:16px;padding:40px 36px;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
          <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#2C2C2C;">Inquiry Received</p>
          <p style="margin:0 0 24px;font-size:14px;color:#2C2C2C;opacity:0.7;line-height:1.7;">
            Dear <strong>${data.fullName}</strong>, we have received your event inquiry.
            Our team will review your event details and contact you within
            <strong>1 hour during business hours</strong>.
          </p>

          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#EDE8E0;border-radius:10px;margin-bottom:28px;">
            <tr><td align="center" style="padding:20px;">
              <p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;color:#2C2C2C;opacity:0.5;">Booking Reference</p>
              <p style="margin:0;font-size:24px;font-weight:700;letter-spacing:0.2em;color:#2D5016;font-family:'Courier New',monospace;">${data.bookingRef}</p>
            </td></tr>
          </table>

          <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#2C2C2C;opacity:0.4;">Your Event Details</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
            ${row("Name", data.fullName)}
            ${row("Mobile", data.mobile)}
            ${row("Date", formattedDate)}
            ${row("Start Time", data.eventStartTime)}
            ${row("Venue / Wake Chapel", data.eventLocation)}
            ${row("Estimated Guests", `${data.guestCount} pax`)}
            ${data.notes ? row("Additional Notes", data.notes) : ""}
          </table>

          <p style="margin:0;font-size:13px;color:#2C2C2C;opacity:0.6;line-height:1.6;border-top:1px solid #EDE8E0;padding-top:20px;">
            Please save your booking reference number. You may also reach us directly via Viber at
            <strong style="color:#2C2C2C;">${process.env.NEXT_PUBLIC_VIBER_NUMBER ?? ""}</strong>.
          </p>
        </td></tr>

        <tr><td align="center" style="padding-top:24px;">
          <p style="margin:0;font-size:11px;color:#2C2C2C;opacity:0.4;">© ${new Date().getFullYear()} Yao's Kitchen. All rights reserved.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
  });
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:6px 0;font-size:12px;font-weight:600;color:#2C2C2C;opacity:0.5;width:40%;vertical-align:top;">${label}</td>
    <td style="padding:6px 0;font-size:13px;color:#2C2C2C;vertical-align:top;">${value}</td>
  </tr>`;
}
