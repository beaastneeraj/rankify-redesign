import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { name, email, subject, message } = await req.json()

  // Use nodemailer to send email
  const nodemailer = require("nodemailer")
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.CONTACT_EMAIL_USER, // set in .env.local
      pass: process.env.CONTACT_EMAIL_PASS, // set in .env.local
    },
  })

  const mailOptions = {
    from: process.env.CONTACT_EMAIL_USER,
    to: "2022csb1095@iitrpr.ac.in",
    subject: subject ? `[Rankify Contact] ${subject}` : "[Rankify Contact] New Message",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  }

  try {
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ success: true })
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ success: false, error: errMsg }, { status: 500 })
  }
}
