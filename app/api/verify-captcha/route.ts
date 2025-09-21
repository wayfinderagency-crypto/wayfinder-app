export async function POST(req: Request) {
  const { token } = await req.json();

  if (!token) {
    return Response.json(
      { success: false, message: "Brak tokenu" },
      { status: 400 }
    );
  }

  const verifyRes = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    { method: "POST" }
  );

  const data = await verifyRes.json();
  console.log("reCAPTCHA v3 response:", data); // sprawdzenie w terminalu

  if (data.success) {
    return Response.json({ success: true, score: data.score });
  } else {
    return Response.json(
      { success: false, error: data["error-codes"] },
      { status: 400 }
    );
  }
}
