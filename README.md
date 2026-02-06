# About

This project demonstrates a backend system for natural language prospecting — converting a free-form user prompt into a structured stream of relevant companies using an LLM.

The system processes a dataset of companies (CSV), evaluates each company against a user’s intent, and outputs a filtered list of qualified leads.

## Problem Statement

Prospecting in marketing (especially outbound) involves identifying companies that match a specific target profile.

Business users usually describe this target in natural language, for example:

- “Digital marketing agencies who can offer Slixta to their clients”
- “B2B companies processing more than 100 leads a month”

The goal is to support this kind of natural language prospecting over structured company datasets.

## High-Level Approach

1. Ingest a structured dataset of companies (CSV)
2. Accept a natural language prospecting prompt from the user
3. For each company:
   - Combine company metadata + user intent
   - Use an LLM to evaluate relevance
   - Return a match decision with confidence
4. Filter companies based on confidence
5. Output a structured list of matching companies

This produces a stream of qualified leads based on intent.

## Tech Stack

- Bun – runtime
- TypeScript – type safety
- LangChain – LLM orchestration
- Groq – fast LLM inference
- CSV parsing – dataset ingestion

## API Usage

Endpoint

```bash
POST /api/generate
```

Request Body

```bash
{
    "prompt": "B2B companies which need to process more than 100 leads a month",
    "confidenceThreshold": 0.7
}
```

- `prompt`: Natural language prospecting intent
- `confidenceThreshold`: Minimum confidence required for a match (default: 0.6)

## Response Example

```bash
{
  "success": true,
  "input_companies": 1000,
  "matched_companies": 3,
  "results": [
    {
      "company_name": "Example Agency",
      "website": "https://example.com",
      "linkedin_url": "https://linkedin.com/company/example",
      "city": "New Delhi",
      "country": "India",
      "industry": "marketing & advertising",
      "num_employees": 45,
      "market_cap": null
    }
  ]
}
```

## Summary

This project demonstrates how natural language can be used as a powerful interface for prospecting over structured company data, producing realistic, high-quality lead lists with minimal manual filtering.

## Run locally

### Prerequisites

- Bun installed
  https://bun.sh/docs/installation

- A Groq API key
  https://console.groq.com

1. Clone the repository
2. Install dependencies

```bash
bun install
```

3. Set environment variables

   Create a .env file in the project root:

   ```bash
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.3.5. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
