export function normalizeAgency(row: any) {
  return {
    company_name: row["Company"] || row["Company Name"],
    website: row["Website"],
    linkedin_url: row["Company Linkedin Url"],
    city: row["Company City"],
    country: row["Company Country"],
    industry: row["Industry"],
    employees: row["# Employees"] ? Number(row["# Employees"]) : undefined,
    short_description: row["Short Description"],
    keywords: row["Keywords"]
      ? row["Keywords"].split(",").map((k: string) => k.trim())
      : [],
    technologies: row["Technologies"]
      ? row["Technologies"].split(",").map((t: string) => t.trim())
      : [],
  };
}
