import { mutation, query, internalQuery } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api"; // تأكد أن هذا السطر مكتوب بشكل صحيح

export const submitContactForm = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    subject: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const submissionId = await ctx.db.insert("contactSubmissions", {
      name: args.name,
      email: args.email,
      phone: args.phone,
      subject: args.subject,
      message: args.message,
      submittedAt: Date.now(),
    });

    // تأكد أن هذا الجزء يتبع الـ insert مباشرة وبداخل الـ handler
    await ctx.scheduler.runAfter(0, api.actions.sendEmailAction, {
      name: args.name,
      email: args.email,
      subject: args.subject,
      message: args.message,
    });

    return submissionId;
  },
}); 
export const getContactSubmissions = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("contactSubmissions")
      .withIndex("by_submission_time")
      .order("desc")
      .take(50);
  },
});

export const getSubmissionById = internalQuery({
  args: {
    id: v.id("contactSubmissions"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});  