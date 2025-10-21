import { formatEmbeddedCode } from '../dist/index.js';

// Test the callback directly
console.log('=== Direct test ===');
const result1 = await formatEmbeddedCode('css', '.button{color:red;}');
console.log('Result:', result1);

// Test through the NAPI binary
import { createBindings } from '../src-js/bindings.js';
const bindings = createBindings();
console.log('\n=== Bindings test ===');
console.log('Available exports:', Object.keys(bindings));
