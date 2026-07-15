export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message, lang, type } = body;

    if (!name || !email || !message) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Log the contact request (in production this would send an email)
    console.log("[Contact]", {
      name,
      email,
      message: message.slice(0, 120),
      lang,
      type,
    });

    // Always return success — in production, integrate with Resend/SendGrid
    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}
