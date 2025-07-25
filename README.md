# Source Code Tracer

A CLI tool that uses Tree-sitter to add console.log statements after meaningful code lines for debugging and tracing purposes.

## Features

- 🌳 **Tree-sitter powered**: Uses Tree-sitter CST parsing to identify meaningful code lines
- 🎯 **Smart filtering**: Skips whitespace, comments, and other non-code elements  
- 🔗 **VSCode integration**: Generates clickable file paths (`file:line` format)
- 📝 **Multi-language**: Supports JavaScript (.js, .jsx) and TypeScript (.ts, .tsx) files
- 📁 **Batch processing**: Can process individual files or entire directories recursively
- ⚡ **Fast execution**: Built with Bun for optimal performance

## Requirements

- [Bun](https://bun.sh/) runtime

## Installation

### Global Installation (Recommended)

Install globally via npm:

```bash
npm install -g source-code-tracer
```

Then use anywhere:

```bash
source-code-tracer path/to/file.js
source-code-tracer path/to/directory
```

### Local Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/konard/source-code-tracer.git
cd source-code-tracer
bun install
```

## Usage

### Basic Usage

If installed globally:
```bash
source-code-tracer path/to/file.js
source-code-tracer path/to/directory
```

If running locally:
```bash
bun run index.js path/to/file.js
# or using the npm script:
npm start path/to/file.js
```

### Help

```bash
source-code-tracer --help
# or locally:
bun run index.js --help
```

## Output

The tool creates traced versions of files with the `.traced` suffix:
- `file.js` → `file.traced.js`
- `component.tsx` → `component.traced.tsx`

## Example

### Input file (`example.js`):
```javascript
function greet(name) {
  const message = `Hello, ${name}!`;
  return message;
}

const user = 'World';
greet(user);

if (user === 'World') {
  console.log('Default greeting');  
}
```

### Output file (`example.traced.js`):
```javascript
function greet(name) {
  const message = `Hello, ${name}!`;
console.log('/path/to/example.js:2');
  return message;
console.log('/path/to/example.js:3');
}
console.log('/path/to/example.js:4');

const user = 'World';
greet(user);
console.log('/path/to/example.js:7');

if (user === 'World') {
  console.log('Default greeting');
console.log('/path/to/example.js:9');
}
console.log('/path/to/example.js:10');
```

## What Gets Traced

The tool intelligently identifies meaningful code constructs using Tree-sitter:

✅ **Traced**:
- Variable declarations (`const`, `let`, `var`)
- Function declarations and expressions
- Class declarations and methods
- Control flow statements (`if`, `for`, `while`)
- Expression statements
- Return statements
- Import/export statements

❌ **Skipped**:
- Empty lines
- Comments (`//`, `/* */`)
- Standalone braces (`{`, `}`)
- Whitespace-only lines

## Testing

Run the automated test suite:

```bash
npm test
```

The test suite verifies:
- Single file processing
- Directory processing  
- TypeScript support
- Console.log format correctness
- Meaningful line detection

## How It Works

1. **Parse**: Uses Tree-sitter to build a Concrete Syntax Tree (CST)
2. **Analyze**: Traverses the tree to identify meaningful code nodes
3. **Insert**: Adds `console.log` statements after each meaningful line
4. **Output**: Writes traced version with `.traced` extension

## Supported File Types

| Extension | Language | Parser |
|-----------|----------|---------|
| `.js` | JavaScript | tree-sitter-javascript |
| `.jsx` | JavaScript JSX | tree-sitter-javascript |
| `.ts` | TypeScript | tree-sitter-typescript |
| `.tsx` | TypeScript JSX | tree-sitter-typescript |

## License

[Unlicense](https://unlicense.org) - Public Domain