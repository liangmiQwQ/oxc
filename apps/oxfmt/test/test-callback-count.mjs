import { format } from '../dist/index.js';

let callCount = 0;

async function formatEmbeddedCode(tagName, code) {
  callCount++;
  console.error(`[CALL ${callCount}] tag="${tagName}"`);
  return code; // Return unchanged
}

await format(['/tmp/test-css.js'], formatEmbeddedCode);
console.error(`Total calls: ${callCount}`);
