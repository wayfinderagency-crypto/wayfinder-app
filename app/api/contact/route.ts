import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

// --- Schema formularza ---
const FormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name too short")
    .max(100, "Full name too long")
    .trim(),
  email: z.string().email("Invalid email"),
  age: z
    .string()
    .regex(/^\d+$/)
    .transform(Number)
    .refine((val) => val >= 18 && val <= 100, "Age must be between 18 and 100"),
  timeAvailable: z.string().max(200).optional().default(""),
  origin: z.string().max(100).optional().default(""),
  contentType: z.string().max(100).optional().default(""),
  startDate: z.string().max(50).optional().default(""),
  hasOnlyFans: z
    .string()
    .transform((v) => v === "true")
    .optional()
    .default(false),
  blockedCountries: z.string().max(500).optional().default(""),
  phone: z.string().max(50).optional().default(""),
  socialMedia: z.string().max(200).optional().default(""),
  tiktok60: z
    .string()
    .transform((v) => v === "true")
    .optional()
    .default(false),
  phonesCount: z
    .string()
    .regex(/^\d+$/)
    .default("1")
    .transform((val) => Number(val)),
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    // --- reCAPTCHA ---
    const token = formData.get("recaptcha-token")?.toString();
    if (!token) {
      return NextResponse.json(
        { success: false, message: "No recaptcha" },
        { status: 400 }
      );
    }

    const verifyRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
      { method: "POST" }
    );
    const recaptchaData = await verifyRes.json();
    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return NextResponse.json(
        { success: false, message: "Recaptcha failed" },
        { status: 400 }
      );
    }

    // --- konwersja formData -> obiekt ---
    const rawValues: Record<string, string> = {};
    formData.forEach((value, key) => {
      if (typeof value === "string") {
        rawValues[key] = value;
      }
    });

    // --- walidacja danych ---
    const parsed = FormSchema.safeParse(rawValues);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    const data = parsed.data;

    // --- walidacja plików ---
    const pictures = formData.getAll("pictures") as File[];
    if (pictures.length > 5) {
      return NextResponse.json(
        { success: false, message: "Too many files" },
        { status: 400 }
      );
    }

    for (const file of pictures) {
      if (file.size > 2_000_000) {
        return NextResponse.json(
          { success: false, message: "File too large (max 2MB)" },
          { status: 400 }
        );
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        return NextResponse.json(
          { success: false, message: "Invalid file type" },
          { status: 400 }
        );
      }
    }

    const attachments = await Promise.all(
      pictures.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()).toString("base64"),
      }))
    );

    // --- HTML wiadomości ---
    const html = `
      <h2>New Model Application</h2>
      <p><strong>Full Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Age:</strong> ${data.age}</p>
      <p><strong>Time Available:</strong> ${data.timeAvailable}</p>
      <p><strong>Origin:</strong> ${data.origin}</p>
      <p><strong>Content Type:</strong> ${data.contentType}</p>
      <p><strong>Start Date:</strong> ${data.startDate}</p>
      <p><strong>Has OnlyFans:</strong> ${data.hasOnlyFans}</p>
      <p><strong>Blocked Countries:</strong> ${data.blockedCountries}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Social Media:</strong> ${data.socialMedia}</p>
      <p><strong>TikTok60:</strong> ${data.tiktok60}</p>
      <p><strong>Phones Count:</strong> ${data.phonesCount}</p>
    `;

    // --- wysyłka maila ---
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "wayfinderagency@gmail.com",
      subject: "New Model Application",
      html,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
