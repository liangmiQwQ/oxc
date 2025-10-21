import { format } from '../dist/index.js';

async function formatEmbeddedCode(tagName, code) {
  console.error(`[DEBUG] formatEmbeddedCode called: tag="${tagName}", code="${code.slice(0, 50)}..."`);
  return code; // Return unchanged for now
}

const args = ['/tmp/test-simple.js'];
await format(args, formatEmbeddedCode);
