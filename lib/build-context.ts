export function buildCompanyContext(agency: any) {
  return `
        Company Name: ${agency.company_name}
        Industry: ${agency.industry}
        Description: ${agency.short_description}
        Keywords: ${agency.keywords.slice(0, 10).join(", ")}
        Technologies: ${agency.technologies.slice(0, 5).join(", ")}
        Employees: ${agency.employees}
        Location: ${agency.city}, ${agency.country}
        `;
}
