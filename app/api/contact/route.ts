import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    console.log("POST /api/contact hit");
    for (const [key, val] of formData.entries()) {
      console.log(key, val);
    }

    // reCAPTCHA
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
        { success: false, message: "Recaptcha failed", recaptchaData },
        { status: 400 }
      );
    }

    // Walidacja Zod
    const FormSchema = z.object({
      fullName: z.string().min(1),
      email: z.string().email(),
      age: z.string().regex(/^\d+$/),
      timeAvailable: z.string().max(200).optional().default(""),
      origin: z.string().optional().default(""),
      contentType: z.string().optional().default(""),
      startDate: z.string().optional().default(""),
      hasOnlyFans: z
        .union([z.string(), z.boolean()])
        .transform((v) => v === "true" || v === true)
        .default(false),
      blockedCountries: z.string().optional().default(""),
      phone: z.string().optional().default(""),
      socialMedia: z.string().optional().default(""),
      tiktok60: z
        .union([z.string(), z.boolean()])
        .transform((v) => v === "true" || v === true)
        .default(false),
      phonesCount: z.string().regex(/^\d+$/),
    });

    const rawValues: Record<string, string> = {};
    formData.forEach((val, key) => {
      if (key !== "pictures" && key !== "recaptcha-token")
        rawValues[key] = val.toString();
    });

    const parsed = FormSchema.safeParse(rawValues);
    if (!parsed.success) {
      console.error("Validation failed:", parsed.error.flatten());
      return NextResponse.json(
        { success: false, errors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const validData = parsed.data;

    // Pliki
    const pictures = formData.getAll("pictures") as File[];
    const attachments = await Promise.all(
      pictures.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()).toString("base64"),
      }))
    );

    const html = `
      <h2>New Model Application</h2>
      ${Object.entries(validData)
        .map(([k, v]) => `<p><strong>${k}:</strong> ${v}</p>`)
        .join("")}
    `;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "wayfinderagency@gmail.com",
      subject: "New Model Application",
      html,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
