import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

type ContactData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
};

// 模拟数据存储
let contactMessages: ContactData[] = [];

// 创建邮件发送器
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.example.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || 'user@example.com',
    pass: process.env.SMTP_PASSWORD || 'password',
  },
});

// 发送邮件函数
async function sendEmail(contactData: ContactData) {
  try {
    // 构建邮件内容
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@thanstudio.com',
      to: process.env.ADMIN_EMAIL || 'admin@thanstudio.com',
      subject: `新留言: ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2 style="color: #333; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">您收到了一条新留言</h2>
          <div style="margin: 20px 0;">
            <p><strong>姓名:</strong> ${contactData.name}</p>
            <p><strong>邮箱:</strong> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
            <p><strong>主题:</strong> ${contactData.subject}</p>
            <p><strong>留言内容:</strong></p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin: 10px 0;">
              ${contactData.message.replace(/\n/g, '<br>')}
            </div>
            <p><strong>提交时间:</strong> ${contactData.createdAt.toLocaleString('zh-CN')}</p>
          </div>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eaeaea; font-size: 12px; color: #666;">
            <p>此邮件由Than Studio网站自动发送，请勿直接回复。</p>
          </div>
        </div>
      `,
      // 添加纯文本版本作为备用
      text: `新留言通知\n\n姓名: ${contactData.name}\n邮箱: ${contactData.email}\n主题: ${contactData.subject}\n\n留言内容:\n${contactData.message}\n\n提交时间: ${contactData.createdAt.toLocaleString()}\n\n此邮件由Than Studio网站自动发送，请勿直接回复。`,
    };

    // 添加回复邮件给用户的确认邮件
    const userConfirmation = {
      from: process.env.SMTP_FROM || 'noreply@thanstudio.com',
      to: contactData.email,
      subject: `感谢您的留言 - Than Studio`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 5px;">
          <h2 style="color: #333; border-bottom: 1px solid #eaeaea; padding-bottom: 10px;">感谢您的留言</h2>
          <div style="margin: 20px 0;">
            <p>尊敬的 ${contactData.name}：</p>
            <p>感谢您联系Than Studio。我们已收到您关于"${contactData.subject}"的留言，我们的团队将尽快处理并回复您。</p>
            <p>以下是您提交的留言内容：</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; margin: 10px 0;">
              ${contactData.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eaeaea; font-size: 12px; color: #666;">
            <p>此邮件由系统自动发送，请勿直接回复。如有任何问题，请通过support@thanstudio.com与我们联系。</p>
          </div>
        </div>
      `,
      text: `感谢您的留言\n\n尊敬的 ${contactData.name}：\n\n感谢您联系Than Studio。我们已收到您关于"${contactData.subject}"的留言，我们的团队将尽快处理并回复您。\n\n以下是您提交的留言内容：\n${contactData.message}\n\n此邮件由系统自动发送，请勿直接回复。如有任何问题，请通过support@thanstudio.com与我们联系。`,
    };

    // 在开发环境中，我们只记录邮件内容而不实际发送
    if (process.env.NODE_ENV === 'development') {
      console.log('开发环境 - 管理员邮件内容:', mailOptions);
      console.log('开发环境 - 用户确认邮件内容:', userConfirmation);
      return { adminEmailSent: true, userEmailSent: true };
    }

    // 生产环境中发送邮件
    const adminInfo = await transporter.sendMail(mailOptions);
    console.log('管理员邮件发送成功:', adminInfo.messageId);
    
    // 发送用户确认邮件
    const userInfo = await transporter.sendMail(userConfirmation);
    console.log('用户确认邮件发送成功:', userInfo.messageId);
    
    return { adminEmailSent: true, userEmailSent: true };
  } catch (error: any) {
    console.error('邮件发送失败:', error);
    return { adminEmailSent: false, userEmailSent: false, error: error.message };
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { name, email, subject, message } = req.body;
      
      // 验证必填字段
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: '所有字段都是必填的' });
      }
      
      // 创建新的联系消息
      const newContact: ContactData = {
        name,
        email,
        subject,
        message,
        createdAt: new Date()
      };
      
      // 存储消息 - 仅用于记录，不再需要管理页面查看
      contactMessages.push(newContact);
      
      // 发送邮件通知
      const emailResult = await sendEmail(newContact);
      
      return res.status(200).json({ 
        success: true, 
        adminEmailSent: emailResult.adminEmailSent,
        userEmailSent: emailResult.userEmailSent,
        message: '您的留言已成功提交，我们会尽快回复您。' 
      });
    } catch (error) {
      console.error('提交表单时出错:', error);
      return res.status(500).json({ 
        success: false, 
        message: '服务器错误，请稍后再试。' 
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}