import z, { string } from "zod";

export const AgencySchema = z.object({
  company_name: z.string(),
  employees: z.number().optional(),
  industry: z.string().optional(),
  website: z.string().optional(),
  linkedin_url: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  short_description: z.string().optional(),
  keywords: z.array(z.string()).optional(),
  technologies: z.array(z.string()).optional(),
});

export const PromptSchema = z.object({
  prompt: z.string(),
  confidenceThreshold: z.float64(),
  // agencies: z.array(AgencySchema),
});
