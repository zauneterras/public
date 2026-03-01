import { mutation, query, internalQuery } from "./_generated/server";
import { v } from "convex/values";

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

    // Log the submission for now (in production, you would send an email)
    console.log("New contact form submission:", {
      id: submissionId,
      name: args.name,
      email: args.email,
      subject: args.subject,
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
