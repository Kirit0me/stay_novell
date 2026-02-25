import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: Request) {

  const data = await req.formData()

  const name = data.get("name")
  const email = data.get("email")
  const phone = data.get("phone")
  const message = data.get("message")

  const files = data.getAll("files") as File[]

  const attachments = await Promise.all(
    files.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer())
    }))
  )

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: 'marysaotomegambles@gmail.com',
    subject: "New Art Commission Request",
    html: `
      <h2>New Commission Request</h2>

      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>

      <p><b>Message:</b></p>
      <p>${message}</p>
    `,
    attachments
  })

  // create whatsapp message (NO ATTACHMENTS)
  const text = encodeURIComponent(
`New Commission Request

Name: ${name}
Email: ${email}
Phone: ${phone}

${message}`
  )

  const whatsappURL = `https://wa.me/918848531143?text=${text}`

  return NextResponse.json({
    success: true,
    whatsappURL
  })
}