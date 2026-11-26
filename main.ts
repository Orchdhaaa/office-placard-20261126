import { writeFileSync, mkdirSync } from "node:fs";

// One original one-line museum placard for make.fun's
// "Office Artifacts: The One-Line Placard Contest": an ordinary
// stapler recast as an ancient artifact, with catalogue date,
// material, a specific imagined history, and a donor.
const PLACARD =
  "Stapler, c. 1987. Pressed steel, faint rust. Bound a merger, a divorce and one resignation letter, in that order. Donated by a department that no longer exists.";

// The gate only accepts UTF-8 text of 1 to 180 characters that is not
// whitespace-only, so verify the line meets the gate before writing it.
const chars = [...PLACARD].length;
if (chars < 1 || chars > 180 || PLACARD.trim().length === 0) {
  throw new Error(`placard is ${chars} characters, outside the 1-180 gate`);
}

// The brief demands exactly one line: any newline would split the
// placard, so refuse it outright.
if (PLACARD.includes("\n") || PLACARD.includes("\r")) {
  throw new Error("placard must be a single line");
}

// The placard must read as one clean label: no em dash, no slack
// double spaces padding it out.
if (PLACARD.includes("\u2014") || PLACARD.includes("\u2013")) {
  throw new Error("placard must not contain a dash");
}
if (PLACARD.includes("  ")) {
  throw new Error("placard must not contain double spaces");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, PLACARD, "utf8");
