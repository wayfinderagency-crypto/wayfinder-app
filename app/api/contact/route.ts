import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

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

    const getVal = (name: string) => formData.get(name)?.toString() ?? "";
    const fullName = getVal("fullName");
    const email = getVal("email");
    const age = getVal("age");
    const timeAvailable = getVal("timeAvailable");
    const origin = getVal("origin");
    const contentType = getVal("contentType");
    const startDate = getVal("startDate");
    const hasOnlyFans = getVal("hasOnlyFans");
    const blockedCountries = getVal("blockedCountries");
    const phone = getVal("phone");
    const socialMedia = getVal("socialMedia");
    const tiktok60 = getVal("tiktok60");
    const phonesCount = getVal("phonesCount");

    const pictures = formData.getAll("pictures") as File[];
    const attachments = await Promise.all(
      pictures.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()).toString("base64"),
      }))
    );

    const html = `
      <h2>New Model Application</h2>
      <p><strong>Full Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Age:</strong> ${age}</p>
      <p><strong>Time Available:</strong> ${timeAvailable}</p>
      <p><strong>Origin:</strong> ${origin}</p>
      <p><strong>Content Type:</strong> ${contentType}</p>
      <p><strong>Start Date:</strong> ${startDate}</p>
      <p><strong>Has OnlyFans:</strong> ${hasOnlyFans}</p>
      <p><strong>Blocked Countries:</strong> ${blockedCountries}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Social Media:</strong> ${socialMedia}</p>
      <p><strong>TikTok60:</strong> ${tiktok60}</p>
      <p><strong>Phones Count:</strong> ${phonesCount}</p>
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
    console.error(err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
