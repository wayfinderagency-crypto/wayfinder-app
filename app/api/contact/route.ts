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

    const isValidDate = (dateStr: string) => {
      const [dd, mm, yyyy] = dateStr.split(".").map(Number);
      const d = new Date(yyyy, mm - 1, dd);
      return (
        d.getFullYear() === yyyy &&
        d.getMonth() === mm - 1 &&
        d.getDate() === dd
      );
    };

    const FormSchema = z.object({
      fullName: z
        .string()
        .min(1, { message: "Full name is required." })
        .max(100, { message: "Full name cannot exceed 100 characters." }),

      email: z
        .string()
        .email({ message: "Please enter a valid email address." })
        .max(150, { message: "Email address is too long." }),

      phone_number: z
        .string()
        .regex(/^\+?\d{7,15}$/, {
          message: "Please enter a valid phone number.(without spaces)",
        })
        .optional()
        .default(""),

      age: z
        .string()
        .regex(/^\d+$/, { message: "Age must be a valid number." })
        .refine((val) => parseInt(val) >= 18, {
          message: "You must be at least 18 years old.",
        }),

      timeAvailable: z
        .string()
        .max(200, { message: "Time available cannot exceed 200 characters." }) // opcjonalnie ograniczenie długości
        .optional()
        .default(""),

      origin: z
        .string()
        .max(100, { message: "Origin field is too long." })
        .optional()
        .default(""),

      contentType: z
        .string()
        .max(100, {
          message: "Content type must be shorter than 100 characters.",
        })
        .optional()
        .default(""),

      startDate: z
        .string()
        .regex(/^\d{2}\.\d{2}\.\d{4}$/, {
          message: "Please enter a valid date in format dd.mm.yyyy.",
        })
        .refine((val) => !val || isValidDate(val), {
          message: "This date does not exist.",
        })
        .optional()
        .default(""),

      hasOnlyFans: z
        .union([z.string(), z.boolean()])
        .transform((v) => v === "true" || v === true)
        .default(false),

      blockedCountries: z
        .string()
        .max(300, { message: "Blocked countries field is too long." })
        .optional()
        .default(""),

      phone: z
        .string()
        .regex(/^\+?\d{7,15}$/, {
          message: "Please enter a valid phone number.",
        })
        .optional()
        .default(""),

      socialMedia: z
        .string()
        .max(200, {
          message: "Social media links must be shorter than 200 characters.",
        })
        .optional()
        .default(""),

      tiktok: z
        .union([z.string(), z.boolean()])
        .transform((v) => v === "true" || v === true)
        .default(false),

      phonesCount: z
        .string()
        .regex(/^\d+$/, { message: "Please enter a valid number of phones." })
        .refine((val) => parseInt(val) >= 1, {
          message: "You must have at least one phone.",
        }),
    });

    const rawValues: Record<string, string> = {};
    formData.forEach((val, key) => {
      if (key !== "pictures" && key !== "recaptcha-token")
        rawValues[key] = val.toString();
    });

    const parsed = FormSchema.safeParse(rawValues);
    if (!parsed.success) {
      const errors: { field: string; message: string }[] = [];

      const flattened = parsed.error.flatten(); // Zwraca { fieldErrors: Record<string,string[]>, formErrors: string[] }

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
      {
        success: false,
        message:
          "Something went wrong while sending your application. Please try again later.",
      },
      { status: 500 }
    );
  }
}
