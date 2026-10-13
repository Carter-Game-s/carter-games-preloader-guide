import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const filename = process.argv[2];
if (!filename) {
  console.error("Usage: node examples/hash-file.mjs <file>");
  process.exit(1);
}
const bytes = await readFile(filename);
const hash = createHash("sha1")
  .update(Buffer.from(`blob ${bytes.length}\0`))
  .update(bytes)
  .digest("hex");
console.log(hash);
