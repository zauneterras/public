import { action } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

export const sendEmailAction = action({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    // هذا يقرأ المفتاح من Convex Dashboard ✅
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    
    // هذا يستخدم المفتاح الذي قرأته ✅
    const resend = new Resend(apiKey);
    
    await resend.emails.send({
      from: "info@zauneterras.de",
      to: "kaddourtrade@gmail.com",
      subject: `رسالة جديدة: ${args.subject}`,
      html: `
        <div dir="rtl">
          <h2>رسالة جديدة من موقع zauneterras.de</h2>
          <p><strong>الاسم:</strong> ${args.name}</p>
          <p><strong>البريد الإلكتروني:</strong> ${args.email}</p>
          <p><strong>الموضوع:</strong> ${args.subject}</p>
          <p><strong>الرسالة:</strong></p>
          <p>${args.message}</p>
        </div>
      `,
      text: `من: ${args.name} (${args.email})\nالموضوع: ${args.subject}\n\nالرسالة: ${args.message}`,
    });
  },
});