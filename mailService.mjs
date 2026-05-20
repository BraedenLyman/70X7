import nodemailer from 'nodemailer'

let transporter = null

export async function initializeMailService() {
  const emailProvider = process.env.EMAIL_PROVIDER || 'gmail'
  const emailUser = process.env.EMAIL_USER
  const emailPassword = process.env.EMAIL_PASSWORD

  if (!emailUser || !emailPassword) {
    console.warn('⚠️  Email service not configured. Order confirmation emails will not be sent.')
    console.warn('Set EMAIL_USER and EMAIL_PASSWORD in your .env file')
    return false
  }

  try {
    if (emailProvider === 'gmail') {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
      })
    } else {
      // Generic SMTP
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: emailUser,
          pass: emailPassword,
        },
      })
    }

    // Verify connection
    await transporter.verify()
    console.log('✅ Email service initialized successfully')
    return true
  } catch (error) {
    console.error('❌ Failed to initialize email service:', error.message)
    return false
  }
}

export async function sendOrderConfirmationEmail(orderData) {
  if (!transporter) {
    console.warn('Email service not available. Skipping email send.')
    return false
  }

  try {
    const { generateOrderConfirmationEmail } = await import('./src/services/emailTemplate.js')
    const htmlContent = generateOrderConfirmationEmail(orderData)

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: orderData.customerEmail,
      subject: `Order Confirmation - 70X7 #${orderData.orderId}`,
      html: htmlContent,
      replyTo: process.env.EMAIL_REPLY_TO || process.env.EMAIL_USER,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(`✅ Order confirmation email sent to ${orderData.customerEmail}`)
    return true
  } catch (error) {
    console.error('❌ Failed to send order confirmation email:', error.message)
    return false
  }
}
