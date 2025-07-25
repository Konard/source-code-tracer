#!/usr/bin/env bun
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

function log(color, message) {
  console.log(`${color}${message}${RESET}`);
}

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'pipe' });
    let stdout = '';
    let stderr = '';
    
    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });
    
    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });
    
    child.on('close', (code) => {
      resolve({ code, stdout, stderr });
    });
    
    child.on('error', reject);
  });
}

async function runTests() {
  let passed = 0;
  let failed = 0;
  
  log(YELLOW, '🧪 Running Source Code Tracer Tests\n');
  
  // Test 1: Single JavaScript file processing
  log(YELLOW, '📄 Test 1: Single JavaScript file processing');
  try {
    const result = await runCommand('bun', ['run', 'index.js', 'test.js']);
    
    if (result.code === 0 && fs.existsSync('test.traced.js')) {
      const tracedContent = fs.readFileSync('test.traced.js', 'utf8');
      const hasConsoleLog = tracedContent.includes("console.log('/Users/konard/Code/konard/source-code-tracer/test.js:");
      
      if (hasConsoleLog) {
        log(GREEN, '✅ PASSED: Single JS file processed successfully');
        passed++;
      } else {
        log(RED, '❌ FAILED: Console.log statements not found in traced file');
        failed++;
      }
    } else {
      log(RED, '❌ FAILED: Traced file not created or command failed');
      failed++;
    }
  } catch (error) {
    log(RED, `❌ FAILED: ${error.message}`);
    failed++;
  }
  
  // Test 2: TypeScript file processing
  log(YELLOW, '📄 Test 2: TypeScript file processing');
  try {
    const result = await runCommand('bun', ['run', 'index.js', 'test.ts']);
    
    if (result.code === 0 && fs.existsSync('test.traced.ts')) {
      const tracedContent = fs.readFileSync('test.traced.ts', 'utf8');
      const hasConsoleLog = tracedContent.includes("console.log('/Users/konard/Code/konard/source-code-tracer/test.ts:");
      
      if (hasConsoleLog) {
        log(GREEN, '✅ PASSED: TypeScript file processed successfully');
        passed++;
      } else {
        log(RED, '❌ FAILED: Console.log statements not found in traced TS file');
        failed++;
      }
    } else {
      log(RED, '❌ FAILED: Traced TS file not created or command failed');
      failed++;
    }
  } catch (error) {
    log(RED, `❌ FAILED: ${error.message}`);
    failed++;
  }
  
  // Test 3: Directory processing
  log(YELLOW, '📁 Test 3: Directory processing');
  try {
    const result = await runCommand('bun', ['run', 'index.js', 'test-dir']);
    
    if (result.code === 0 && fs.existsSync('test-dir/sample.traced.js')) {
      const tracedContent = fs.readFileSync('test-dir/sample.traced.js', 'utf8');
      const hasConsoleLog = tracedContent.includes("console.log('/Users/konard/Code/konard/source-code-tracer/test-dir/sample.js:");
      
      if (hasConsoleLog) {
        log(GREEN, '✅ PASSED: Directory processed successfully');
        passed++;
      } else {
        log(RED, '❌ FAILED: Console.log statements not found in traced directory file');
        failed++;
      }
    } else {
      log(RED, '❌ FAILED: Directory processing failed or traced file not created');
      failed++;
    }
  } catch (error) {
    log(RED, `❌ FAILED: ${error.message}`);
    failed++;
  }
  
  // Test 4: Verify console.log format
  log(YELLOW, '🔍 Test 4: Verify console.log format');
  try {
    if (fs.existsSync('test.traced.js')) {
      const content = fs.readFileSync('test.traced.js', 'utf8');
      const lines = content.split('\n');
      const consoleLogLines = lines.filter(line => line.includes("console.log('/Users/konard/Code/konard/source-code-tracer/test.js:"));
      
      if (consoleLogLines.length > 0) {
        const hasCorrectFormat = consoleLogLines.every(line => {
          const match = line.match(/console\.log\('([^']+):(\d+)'\);/);
          return match && match[1] && match[2];
        });
        
        if (hasCorrectFormat) {
          log(GREEN, '✅ PASSED: Console.log format is correct (file:line)');
          passed++;
        } else {
          log(RED, '❌ FAILED: Console.log format is incorrect');
          failed++;
        }
      } else {
        log(RED, '❌ FAILED: No console.log statements found');
        failed++;
      }
    } else {
      log(RED, '❌ FAILED: No traced file to verify format');
      failed++;
    }
  } catch (error) {
    log(RED, `❌ FAILED: ${error.message}`);
    failed++;
  }
  
  // Test 5: Check that meaningful lines are traced
  log(YELLOW, '📝 Test 5: Check meaningful lines are traced');
  try {
    if (fs.existsSync('test.traced.js')) {
      const content = fs.readFileSync('test.traced.js', 'utf8');
      const originalLines = fs.readFileSync('test.js', 'utf8').split('\n');
      
      // Count meaningful lines in original (excluding empty lines and single braces)
      const meaningfulOriginalLines = originalLines.filter(line => 
        line.trim() && 
        line.trim() !== '{' && 
        line.trim() !== '}' &&
        !line.trim().startsWith('//')
      ).length;
      
      const consoleLogCount = (content.match(/console\.log\('/g) || []).length;
      
      // Should have console.logs for most meaningful lines (allowing some flexibility)
      if (consoleLogCount >= meaningfulOriginalLines * 0.5) {
        log(GREEN, `✅ PASSED: Found ${consoleLogCount} console.log statements for meaningful code`);
        passed++;
      } else {
        log(RED, `❌ FAILED: Only ${consoleLogCount} console.log statements found, expected more`);
        failed++;
      }
    } else {
      log(RED, '❌ FAILED: No traced file to check');
      failed++;
    }
  } catch (error) {
    log(RED, `❌ FAILED: ${error.message}`);
    failed++;
  }
  
  // Summary
  log(YELLOW, '\n📊 Test Summary:');
  log(GREEN, `✅ Passed: ${passed}`);
  log(RED, `❌ Failed: ${failed}`);
  log(YELLOW, `📈 Total: ${passed + failed}`);
  
  if (failed === 0) {
    log(GREEN, '\n🎉 All tests passed! The tool is working correctly.');
  } else {
    log(RED, `\n😞 ${failed} test(s) failed. Please check the implementation.`);
    process.exit(1);
  }
}

runTests().catch(console.error);