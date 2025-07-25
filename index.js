#!/usr/bin/env bun
import Parser from 'tree-sitter';
import JavaScript from 'tree-sitter-javascript';
import TypeScript from 'tree-sitter-typescript';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';
import path from 'path';

const parser = new Parser();

const languageMap = {
  '.js': JavaScript,
  '.jsx': JavaScript,
  '.ts': TypeScript.typescript,
  '.tsx': TypeScript.tsx,
};

function getLanguageForFile(filePath) {
  const ext = path.extname(filePath);
  return languageMap[ext];
}

function isRealCode(node) {
  const meaningfulTypes = [
    'expression_statement',
    'variable_declaration',
    'function_declaration',
    'class_declaration',
    'if_statement',
    'for_statement',
    'while_statement',
    'try_statement',
    'return_statement',
    'throw_statement',
    'import_statement',
    'export_statement',
    'assignment_expression',
    'call_expression',
    'method_definition',
    'arrow_function',
    'function_expression'
  ];
  
  return meaningfulTypes.includes(node.type);
}

function processFile(filePath) {
  const language = getLanguageForFile(filePath);
  if (!language) {
    console.log(`Skipping ${filePath}: unsupported file type`);
    return;
  }

  parser.setLanguage(language);
  
  const sourceCode = fs.readFileSync(filePath, 'utf8');
  const tree = parser.parse(sourceCode);
  
  const lines = sourceCode.split('\n');
  const modifications = [];
  const processedLines = new Set();
  
  function traverse(node) {
    if (isRealCode(node) && node.parent && !isRealCode(node.parent)) {
      const endLine = node.endPosition.row;
      if (endLine < lines.length && !processedLines.has(endLine)) {
        const logStatement = `console.log('${filePath}:${endLine + 1}');`;
        modifications.push({
          line: endLine,
          content: logStatement
        });
        processedLines.add(endLine);
      }
    }
    
    for (const child of node.children) {
      traverse(child);
    }
  }
  
  traverse(tree.rootNode);
  
  modifications.sort((a, b) => b.line - a.line);
  
  for (const mod of modifications) {
    lines.splice(mod.line + 1, 0, mod.content);
  }
  
  const outputPath = filePath.replace(/(\.[^.]+)$/, '.traced$1');
  fs.writeFileSync(outputPath, lines.join('\n'));
  console.log(`Processed: ${filePath} -> ${outputPath}`);
}

function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.isFile() && getLanguageForFile(entry.name)) {
      processFile(fullPath);
    }
  }
}

const argv = yargs(hideBin(process.argv))
  .usage('Usage: $0 <path>')
  .positional('path', {
    describe: 'File or directory to process',
    type: 'string'
  })
  .help()
  .argv;

const targetPath = argv._[0];

if (!targetPath) {
  console.error('Please provide a file or directory path');
  process.exit(1);
}

if (!fs.existsSync(targetPath)) {
  console.error(`Path does not exist: ${targetPath}`);
  process.exit(1);
}

const fullPath = path.resolve(targetPath);
const stats = fs.statSync(fullPath);

if (stats.isDirectory()) {
  processDirectory(fullPath);
} else if (stats.isFile()) {
  processFile(fullPath);
} else {
  console.error(`Invalid path: ${targetPath}`);
  process.exit(1);
}