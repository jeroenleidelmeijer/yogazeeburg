import { createServerFn } from "@tanstack/react-start";

const SUBJECTS = [
  "Intro Pass",
  "Memberships and pricing",
  "Classes and schedule",
  "Current member question",
  "Something else",
] as const;

type Subject = (typeof SUBJECTS)[number];

export type ContactInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
};

export type ContactResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Partial<Record<"name" | "email" | "subject" | "message", string>> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validate(input: ContactInput) {
  const name = (input.name ?? "").trim();
  const email = (input.email ?? "").trim();
  const subject = (input.subject ?? "").trim();
  const message = (input.message ?? "").trim();
  const fieldErrors: NonNullable<Extract<ContactResult, { ok: false }>["fieldErrors"]> = {};

  if (name.length < 2 || name.length > 100) fieldErrors.name = "Please enter your name (2–100 characters).";
  if (email.length === 0 || email.length > 254 || !EMAIL_RE.test(email))
    fieldErrors.email = "Please enter a valid email address.";
  if (!SUBJECTS.includes(subject as Subject)) fieldErrors.subject = "Please choose a subject.";
  if (message.length < 10 || message.length > 3000)
    fieldErrors.message = "Please write a message between 10 and 3000 characters.";

  return { fieldErrors, cleaned: { name, email, subject: subject as Subject, message } };
}

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: ContactInput) => data)
  .handler(async ({ data }): Promise<ContactResult> => {
    // Honeypot: silently succeed
    if (data.company && data.company.trim().length > 0) {
      return { ok: true };
    }

    const { fieldErrors, cleaned } = validate(data);
    if (Object.keys(fieldErrors).length > 0) {
      return { ok: false, error: "Please correct the highlighted fields.", fieldErrors };
    }

    const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (!LOVABLE_API_KEY || !RESEND_API_KEY) {
      console.error("[contact] Missing Resend gateway credentials");
      return { ok: false, error: "Email service is not configured." };
    }

    const subjectLine = `[Yoga Zeeburg website] ${cleaned.subject} — ${cleaned.name}`;

    const html = `<!doctype html><html><body style="font-family:Inter,Arial,sans-serif;color:#1a1a1a;line-height:1.55">
<h2 style="font-family:'Fraunces',Georgia,serif;font-weight:500;margin:0 0 16px">New contact message</h2>
<p style="margin:0 0 6px"><strong>Name:</strong> ${escapeHtml(cleaned.name)}</p>
<p style="margin:0 0 6px"><strong>Email:</strong> ${escapeHtml(cleaned.email)}</p>
<p style="margin:0 0 6px"><strong>Subject:</strong> ${escapeHtml(cleaned.subject)}</p>
<p style="margin:16px 0 6px"><strong>Message:</strong></p>
<p style="margin:0 0 16px;white-space:pre-wrap">${escapeHtml(cleaned.message)}</p>
<hr style="border:none;border-top:1px solid #e5e5e5;margin:20px 0"/>
<p style="margin:0;color:#666;font-size:13px">Submission source: yogazeeburg.com/contact</p>
</body></html>`;

    const text = [
      `New contact message`,
      ``,
      `Name: ${cleaned.name}`,
      `Email: ${cleaned.email}`,
      `Subject: ${cleaned.subject}`,
      ``,
      `Message:`,
      cleaned.message,
      ``,
      `Submission source: yogazeeburg.com/contact`,
    ].join("\n");

    try {
      const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": RESEND_API_KEY,
        },
        body: JSON.stringify({
          from: "Yoga Zeeburg <hello@yogazeeburg.com>",
          to: ["hello@yogazeeburg.com"],
          reply_to: cleaned.email,
          subject: subjectLine,
          html,
          text,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        console.error(`[contact] Resend gateway error ${res.status}: ${body}`);
        return { ok: false, error: "We couldn't send your message. Please try again shortly." };
      }

      return { ok: true };
    } catch (err) {
      console.error("[contact] Fetch failed:", err);
      return { ok: false, error: "We couldn't send your message. Please try again shortly." };
    }
  });
