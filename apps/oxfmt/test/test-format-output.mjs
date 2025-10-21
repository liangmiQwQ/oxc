import { format } from '../dist/index.js';
import { formatEmbeddedCode } from '../dist/index.js';
import fs from 'fs';

// Write test file
fs.writeFileSync('/tmp/test-format.js', 'const styles = css`.button{color:red;}`;');

const args = ['/tmp/test-format.js'];
await format(args, formatEmbeddedCode);

console.log("=== Formatted output ===");
console.log(fs.readFileSync('/tmp/test-format.js', 'utf-8'));
