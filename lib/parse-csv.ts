import fs from "fs";
import { parse } from "csv-parse/sync";
import path from "path";

export function parseCsv(path: string) {
  const file = fs.readFileSync(path, "utf-8");

  return parse(file, {
    columns: true,
    skip_empty_lines: true,
  });
}


export const CSV_PATH = path.join(
  process.cwd(),
  "temp",
  "sample.csv"
);