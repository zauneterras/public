"use node"; // ضروري لاستخدام مكتبات خارجية في Convex
import { action } from "./_generated/server";
import { v } from "convex/values";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmailAction = action({
  args: {
    name: v.string(),
    email: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (_, args) => {
    await resend.emails.send({
      from: "info@zauneterras.de",
      to: "zaune.terras@gmail.com",
      subject: `رسالة جديدة: ${args.subject}`,
      text: `من: ${args.name} (${args.email})\n\nالرسالة: ${args.message}`,
    });
  },
});