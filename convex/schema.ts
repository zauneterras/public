import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  contactSubmissions: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    subject: v.string(),
    message: v.string(),
    submittedAt: v.number(),
  }).index("by_submission_time", ["submittedAt"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
