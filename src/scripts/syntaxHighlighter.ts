/* RaaSki — robust, deterministic Python syntax highlighter.
   Uses a left-to-right regex lexer to tokenize code BEFORE generating HTML,
   making it 100% impossible for keywords like 'class' to match inside HTML tags. */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const PYTHON_KEYWORDS = new Set([
  'import', 'from', 'class', 'def', 'async', 'await', 'return',
  'if', 'else', 'elif', 'try', 'except', 'finally', 'with', 'as',
  'for', 'in', 'while', 'yield', 'lambda', 'None', 'True', 'False',
  'raise', 'pass', 'break', 'continue', 'self'
]);

const PYTHON_TYPES = new Set([
  'int', 'str', 'dict', 'list', 'set', 'tuple', 'bool', 'float',
  'bytes', 'object', 'AsyncGenerator', 'Queue', 'super', 'Any', 'Optional'
]);

interface Token {
  type: 'keyword' | 'type' | 'class' | 'method' | 'string' | 'comment' | 'decorator' | 'num' | 'plain';
  text: string;
}

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let i = 0;
  const len = line.length;

  while (i < len) {
    // 1. Comment to end of line
    if (line[i] === '#') {
      tokens.push({ type: 'comment', text: line.slice(i) });
      break;
    }

    // 2. Triple quoted string (""" or ''')
    if (line.startsWith('"""', i) || line.startsWith("'''", i) || line.startsWith('f"""', i) || line.startsWith("f'''", i)) {
      const isF = line[i] === 'f';
      const quote = line.slice(isF ? i + 1 : i, (isF ? i + 1 : i) + 3);
      const start = i;
      i += isF ? 4 : 3;
      const endIdx = line.indexOf(quote, i);
      if (endIdx !== -1) {
        i = endIdx + 3;
      } else {
        i = len;
      }
      tokens.push({ type: 'string', text: line.slice(start, i) });
      continue;
    }

    // 3. Single / Double quoted string
    if (line[i] === '"' || line[i] === "'" || (line[i] === 'f' && (line[i + 1] === '"' || line[i + 1] === "'"))) {
      const isF = line[i] === 'f';
      const quoteChar = isF ? line[i + 1] : line[i];
      const start = i;
      i += isF ? 2 : 1;
      while (i < len) {
        if (line[i] === '\\') {
          i += 2; // skip escaped char
        } else if (line[i] === quoteChar) {
          i++;
          break;
        } else {
          i++;
        }
      }
      tokens.push({ type: 'string', text: line.slice(start, i) });
      continue;
    }

    // 4. Decorator (@decorator)
    if (line[i] === '@' && /[a-zA-Z_]/.test(line[i + 1] || '')) {
      const start = i;
      i++;
      while (i < len && /[a-zA-Z0-9_]/.test(line[i])) i++;
      tokens.push({ type: 'decorator', text: line.slice(start, i) });
      continue;
    }

    // 5. Numbers
    if (/\d/.test(line[i])) {
      const start = i;
      while (i < len && /[\d.a-fA-FxX]/.test(line[i])) i++;
      tokens.push({ type: 'num', text: line.slice(start, i) });
      continue;
    }

    // 6. Word (ident / keyword / class / method)
    if (/[a-zA-Z_]/.test(line[i])) {
      const start = i;
      while (i < len && /[a-zA-Z0-9_]/.test(line[i])) i++;
      const word = line.slice(start, i);

      // Check what kind of word
      if (PYTHON_KEYWORDS.has(word)) {
        tokens.push({ type: 'keyword', text: word });
      } else if (PYTHON_TYPES.has(word)) {
        tokens.push({ type: 'type', text: word });
      } else {
        // Peek ahead past spaces to see if this is a function call: word(...)
        let peek = i;
        while (peek < len && line[peek] === ' ') peek++;
        if (line[peek] === '(') {
          tokens.push({ type: 'method', text: word });
        } else if (/^[A-Z][a-zA-Z0-9_]*$/.test(word)) {
          tokens.push({ type: 'class', text: word });
        } else {
          tokens.push({ type: 'plain', text: word });
        }
      }
      continue;
    }

    // 7. Any other character (spaces, symbols, punctuation)
    tokens.push({ type: 'plain', text: line[i] });
    i++;
  }

  return tokens;
}

function normalizeRawPython(raw: string): string {
  let cleaned = raw.replace(/\r\n/g, '\n');
  cleaned = cleaned.replace(/import asyncio\s+from typing/g, 'import asyncio\nfrom typing');
  cleaned = cleaned.replace(/import asyncio\s+from playwright/g, 'import asyncio\nfrom playwright');
  return cleaned;
}

export interface HighlightOptions {
  showLineNumbers?: boolean;
  activeLine?: number;
}

export function highlightPython(rawCode: string, options: HighlightOptions = {}): string {
  if (!rawCode) return '';

  const normalized = normalizeRawPython(rawCode);
  const lines = normalized.split('\n');

  return lines
    .map((line, idx) => {
      const lineNum = idx + 1;
      const isExecuting = options.activeLine === lineNum;

      const tokens = line.length ? tokenizeLine(line) : [];
      const renderedTokens = tokens.length
        ? tokens
            .map((tok) => {
              const escaped = escapeHtml(tok.text);
              if (tok.type === 'plain') return escaped;
              return `<span class="code-${tok.type}">${escaped}</span>`;
            })
            .join('')
        : '&nbsp;';

      const rowClass = `code-row${isExecuting ? ' is-executing' : ''}`;
      if (options.showLineNumbers) {
        const numPadded = String(lineNum).padStart(2, '0');
        return `<div class="${rowClass}" data-line="${lineNum}"><span class="code-ln">${numPadded}</span><span class="code-line">${renderedTokens}</span></div>`;
      }
      return `<div class="${rowClass}"><span class="code-line">${renderedTokens}</span></div>`;
    })
    .join('\n');
}
