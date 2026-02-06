import { ChatGroq } from "@langchain/groq";
import { HumanMessage, SystemMessage } from "langchain";
import { PromptSchema } from "../types/types";
import { SYSTEM_PROMPT } from "../lib/system-prompt";
import { normalizeAgency } from "../lib/normalize";
import { CSV_PATH, parseCsv } from "../lib/parse-csv";
import { buildCompanyContext } from "../lib/build-context";

function extractJson(text: string) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export const generateData = async (req: Request) => {
  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.1-8b-instant",
  });

  try {
    const body = await req.json();
    const validData = PromptSchema.safeParse(body);

    if (!validData.success) {
      return new Response(
        JSON.stringify({
          success: false,
          data: {
            error: validData.error,
          },
        }),
      );
    }

    const { prompt, confidenceThreshold } = validData.data;
    const rows =  await parseCsv(CSV_PATH);
    const agencies = rows.map(normalizeAgency);

    const matches: any[] = [];
    const BATCH_SIZE = 15;
    const batches = chunkArray(agencies, BATCH_SIZE);

    for (const batch of batches) {
      const batchResults = await Promise.all(
        batch.map(async (agency) => {
          const context = buildCompanyContext(agency);

          const res = await model.invoke([
            new SystemMessage(SYSTEM_PROMPT),
            new HumanMessage(`User Intent: ${prompt} Company Data: ${context}`),
          ]);

          let parsed;
          try {
            parsed = JSON.parse(extractJson(res.content as string));
          } catch {
            return null;
          }

          if (
            parsed.is_digital_marketing_agency === true &&
            parsed.confidence >= confidenceThreshold
          ) {
            return {
              company_name: agency.company_name,
              website: agency.website,
              linkedin_url: agency.linkedin_url,
              city: agency.city,
              country: agency.country,
              industry: agency.industry,
              num_employees: agency.employees,
              market_cap: null,
            };
          }

          return null;
        }),
      );

      for (const result of batchResults) {
        if (result) matches.push(result);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          input_companies: agencies.length,
          matched_companies: matches.length,
          results: matches,
        },
      }),
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        data: {
          error: error.message,
        },
      }),
    );
  }
};
