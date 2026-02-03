import z from "zod";

export interface RawCompany {
  Company: string;
  Website?: string;
  "Company Linkedin"?: string;
  "Company City"?: string;
  "Company Country"?: string;
  Industry?: string;
  Employees?: string;
  "Short Description"?: string;
  "Company Ad Keywords"?: string;
  Technologies?: string;
}

export interface ClassificationResult {
  is_digital_agency: boolean;
  confidence: number;
  reason: string;
}

export const PromptSchema = z.object({
  prompt: z.string(),
});

export interface OutputCompany {
  company_name: string;
  website?: string;
  linkedin_url?: string;
  city?: string;
  country?: string;
  industry?: string;
  num_employees?: string;
  market_cap?: string | null;
}
