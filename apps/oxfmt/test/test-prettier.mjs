import { format, formatEmbeddedCode } from '../dist/index.js';

const args = ['/tmp/test-simple.js'];
const result = await format(args, formatEmbeddedCode);
console.log("Result:", result);
