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
        { success: false, message: "No recaptcha token provided." },
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
        {
          success: false,
          message: "Recaptcha validation failed.",
          recaptchaData,
        },
        { status: 400 }
      );
    }

    // Schemat danych
    const FormSchema = z.object({
      fullName: z
        .string()
        .min(1, { message: "Full name is required." })
        .max(100, { message: "Full name cannot exceed 100 characters." }),

      age: z
        .string()
        .regex(/^\d+$/, { message: "Age must be a valid number." })
        .refine((val) => parseInt(val) >= 18, {
          message: "You must be at least 18 years old.",
        }),

      origin: z
        .string()
        .max(100, { message: "Origin cannot exceed 100 characters." })
        .optional()
        .default(""),

      instagram: z
        .string()
        .max(150, { message: "Instagram handle is too long." })
        .optional()
        .default(""),

      phone_number: z
        .string()
        .min(3, { message: "Phone number is too short." })
        .refine(
          (val) => {
            const digitsOnly = val.replace(/\D/g, "");
            return digitsOnly.length >= 6;
          },
          { message: "Please enter a valid phone number." }
        )
        .max(50, { message: "Phone number is too long." })
        .optional()
        .default(""),

      email: z
        .string()
        .email({ message: "Please enter a valid email address." })
        .max(150, { message: "Email address is too long." }),

      long_text: z
        .string()
        .max(1000, { message: "Message cannot exceed 1000 characters." })
        .optional()
        .default(""),
    });

    // Wczytanie danych
    const rawValues: Record<string, string> = {};
    formData.forEach((val, key) => {
      if (key !== "pictures" && key !== "recaptcha-token") {
        rawValues[key] = val.toString();
      }
    });

    // Walidacja
    const parsed = FormSchema.safeParse(rawValues);
    if (!parsed.success) {
      const errors: { field: string; message: string }[] = [];
      const flattened = parsed.error.flatten();
      for (const [field, messages] of Object.entries(flattened.fieldErrors)) {
        if (messages) {
          messages.forEach((msg: string) =>
            errors.push({ field, message: msg })
          );
        }
      }

      return NextResponse.json({ success: false, errors }, { status: 400 });
    }

    const validData = parsed.data;

    // Obsługa załączników (zdjęć)
    const pictures = formData.getAll("pictures") as File[];
    const attachments = await Promise.all(
      pictures.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()).toString("base64"),
      }))
    );

    // Treść wiadomości e-mail
    const html = `
      <h2>New Model Application</h2>
      <p><strong>Full name:</strong> ${validData.fullName}</p>
      <p><strong>Age:</strong> ${validData.age}</p>
      <p><strong>Origin:</strong> ${validData.origin}</p>
      <p><strong>Instagram:</strong> ${validData.instagram}</p>
      <p><strong>Phone number:</strong> ${validData.phone_number}</p>
      <p><strong>Email:</strong> ${validData.email}</p>
      <p><strong>Message:</strong> ${validData.long_text}</p>
    `;

    // Wysyłka przez Resend
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
      {
        success: false,
        message:
          "Something went wrong while sending your application. Please try again later.",
      },
      { status: 500 }
    );
  }
}
