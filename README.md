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

### Advanced Options

#### Untrace Files
Remove tracing from previously traced files:
```bash
# For traced copies
source-code-tracer --untrace file.traced.js
source-code-tracer -u file.traced.js

# For in-place traced files (restores from .untraced.original backup)
source-code-tracer --untrace --in-place file.js
source-code-tracer -u -i file.js
```

#### In-Place Modification
Modify files directly instead of creating .traced versions:
```bash
source-code-tracer --in-place file.js
source-code-tracer -i file.js
```

When using `--in-place`, the tool creates a backup file with `.untraced.original` extension before modifying the original. This backup preserves the original untouched code and is used for restoration when untracing.

### Help

```bash
source-code-tracer --help
# or locally:
bun run index.js --help
```

## Output

### Default Mode
The tool creates traced versions of files with the `.traced` suffix:
- `file.js` → `file.traced.js`
- `component.tsx` → `component.traced.tsx`

### In-Place Mode
With `--in-place` flag, the tool:
- Modifies the original file directly
- Creates a backup: `file.js` → `file.untraced.original`
- The backup is preserved even if you trace the file multiple times

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
1. Single JavaScript file processing
2. TypeScript file processing
3. Directory processing  
4. Console.log format correctness (file:line)
5. Meaningful line detection
6. Untrace functionality (for .traced files)
7. In-place modification with backup creation
8. In-place untrace functionality with backup restoration
9. Help command functionality
10. Multiple trace protection (preserves original backup)
11. Error handling for missing backups

### Example Tests

The `examples/` directory contains comprehensive test files:
- `example.js` - Basic JavaScript example
- `example.ts` - TypeScript with interfaces and classes
- `comprehensive.js` - Advanced JavaScript features
- `comprehensive.ts` - Advanced TypeScript with generics and types

## How It Works

1. **Parse**: Uses Tree-sitter to build a Concrete Syntax Tree (CST)
2. **Analyze**: Traverses the tree to identify meaningful code nodes
3. **Insert**: Adds `console.log` statements after each meaningful line
4. **Output**: Writes traced version with `.traced` extension

## Edge Cases and Behavior

### Multiple Traces
When tracing a file multiple times in in-place mode:
- The original backup (`.untraced.original`) is preserved
- Only the first trace creates the backup
- Subsequent traces modify the already-traced file
- This ensures you can always restore to the original untouched code

### Untrace Without Backup
If you try to untrace a file without a backup:
- The tool will display an error message
- The file remains unchanged
- This prevents accidental data loss

## Supported File Types

| Extension | Language | Parser |
|-----------|----------|---------|
| `.js` | JavaScript | tree-sitter-javascript |
| `.jsx` | JavaScript JSX | tree-sitter-javascript |
| `.ts` | TypeScript | tree-sitter-typescript |
| `.tsx` | TypeScript JSX | tree-sitter-typescript |

## License

[Unlicense](https://unlicense.org) - Public Domain