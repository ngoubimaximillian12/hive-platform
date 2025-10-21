import nodemailer from 'nodemailer';

// Create email transporter (configure with your SMTP)
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.SMTP_PASS || 'your-app-password'
  }
});

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    await transporter.sendMail({
      from: '"Hive Platform" <noreply@hive.app>',
      to: email,
      subject: 'Welcome to Hive! 🐝',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #3b82f6;">Welcome to Hive, ${name}! 🐝</h1>
          <p>We're excited to have you join our community platform!</p>
          <p>Here's what you can do:</p>
          <ul>
            <li>🎓 Trade skills with neighbors</li>
            <li>💰 Join group buying deals</li>
            <li>🎉 Attend community events</li>
            <li>💬 Connect with locals</li>
          </ul>
          <a href="http://localhost:4000/home" style="display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 8px; margin-top: 20px;">
            Get Started
          </a>
        </div>
      `
    });
    console.log('✅ Welcome email sent to:', email);
  } catch (error) {
    console.error('❌ Failed to send welcome email:', error);
  }
}

export async function sendNotificationEmail(email: string, subject: string, message: string) {
  try {
    await transporter.sendMail({
      from: '"Hive Platform" <noreply@hive.app>',
      to: email,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">🔔 ${subject}</h2>
          <p>${message}</p>
          <a href="http://localhost:4000/home" style="display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 8px; margin-top: 20px;">
            View on Hive
          </a>
        </div>
      `
    });
    console.log('✅ Notification email sent to:', email);
  } catch (error) {
    console.error('❌ Failed to send notification email:', error);
  }
}

export async function sendNewMessageEmail(email: string, senderName: string, messagePreview: string) {
  try {
    await transporter.sendMail({
      from: '"Hive Platform" <noreply@hive.app>',
      to: email,
      subject: `💬 New message from ${senderName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">💬 New Message</h2>
          <p><strong>${senderName}</strong> sent you a message:</p>
          <blockquote style="background: #f3f4f6; padding: 16px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            ${messagePreview}
          </blockquote>
          <a href="http://localhost:4000/messages" style="display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 8px; margin-top: 20px;">
            Reply Now
          </a>
        </div>
      `
    });
    console.log('✅ Message notification sent to:', email);
  } catch (error) {
    console.error('❌ Failed to send message notification:', error);
  }
}
