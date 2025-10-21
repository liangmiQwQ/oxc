import { format } from '../dist/index.js';

async function formatEmbeddedCode(tagName, code) {
  console.error(`[JS] Called with tag="${tagName}", code="${code.slice(0,30)}..."`);
  try {
    const prettier = await import('prettier');
    const result = await prettier.format(code, { parser: tagName === 'css' ? 'css' : 'babel' });
    console.error(`[JS] Returning: "${result.slice(0,30)}..."`);
    return result.trimEnd();
  } catch (e) {
    console.error(`[JS] ERROR:`, e.message);
    throw e;
  }
}

await format(['/tmp/test-css.js'], formatEmbeddedCode);
