import { formatEmbeddedCode } from '../dist/index.js';

const result = await formatEmbeddedCode('css', '.button{color:red;}');
console.log("Input:  '.button{color:red;}'");
console.log("Output:", JSON.stringify(result));
