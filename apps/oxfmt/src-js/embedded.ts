import prettier from 'prettier';

// Map template tag names to Prettier parsers
const TAG_TO_PARSER: Record<string, string> = {
  // CSS
  css: 'css',
  styled: 'css',

  // GraphQL
  gql: 'graphql',
  graphql: 'graphql',

  // HTML
  html: 'html',

  // Markdown
  md: 'markdown',
  markdown: 'markdown',
};

/**
 * Format embedded code using Prettier (asynchronous).
 * Note: Called from Rust via NAPI ThreadsafeFunction with FnArgs
 * @param tagName - The template tag name (e.g., "css", "gql", "html")
 * @param code - The code to format
 * @returns Formatted code
 */
export async function formatEmbeddedCode(tagName: string, code: string): Promise<string> {
  const parser = TAG_TO_PARSER[tagName];

  if (!parser) {
    // Unknown tag, return original code
    return code;
  }

  try {
    const formatted = await prettier.format(code, {
      parser,
      printWidth: 80,
      tabWidth: 2,
      semi: true,
      singleQuote: false,
    });

    // Remove trailing newline that Prettier adds
    return formatted.trimEnd();
  } catch (error) {
    // If Prettier fails to format, return original code
    return code;
  }
}
