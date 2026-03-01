import { action } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const sendContactEmail = action({
  args: {
    submissionId: v.id("contactSubmissions"),
  },
  handler: async (ctx, args) => {
    const submission = await ctx.runQuery(internal.contact.getSubmissionById, {
      id: args.submissionId,
    });

    if (!submission) {
      throw new Error("Submission not found");
    }

    // In a real implementation, you would use a service like Resend or SendGrid
    // For now, we'll just log the email content
    console.log("Email would be sent to: zaun-terras@gmail.com");
    console.log("Subject: Neue Kontaktanfrage von", submission.name);
    console.log("Content:", {
      name: submission.name,
      email: submission.email,
      phone: submission.phone,
      subject: submission.subject,
      message: submission.message,
    });

    return { success: true };
  },
});
