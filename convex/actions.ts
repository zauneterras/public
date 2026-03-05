import { action } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

// لا تحتاج "use node" - هذا ليس صحيحاً في Convex

export const sendEmailAction = action({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    // تأكد من وجود المفتاح
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not configured");
    }
    
    const resend = new Resend(apiKey);
    
    await resend.emails.send({
      from: "info@zauneterras.de",
      to: "kaddourtrade@gmail.com", // هنا الإيميل الذي يستقبل الرسائل
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
      // يمكنك أيضاً إضافة نص عادي كاحتياطي
      text: `من: ${args.name} (${args.email})\nالموضوع: ${args.subject}\n\nالرسالة: ${args.message}`,
    });
  },
});