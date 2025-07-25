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
    const result = await runCommand('bun', ['run', 'index.js', 'examples/example.js']);
    
    if (result.code === 0 && fs.existsSync('examples/example.traced.js')) {
      const tracedContent = fs.readFileSync('examples/example.traced.js', 'utf8');
      const hasConsoleLog = tracedContent.includes("console.log('/Users/konard/Code/konard/source-code-tracer/examples/example.js:");
      
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
    const result = await runCommand('bun', ['run', 'index.js', 'examples/example.ts']);
    
    if (result.code === 0 && fs.existsSync('examples/example.traced.ts')) {
      const tracedContent = fs.readFileSync('examples/example.traced.ts', 'utf8');
      const hasConsoleLog = tracedContent.includes("console.log('/Users/konard/Code/konard/source-code-tracer/examples/example.ts:");
      
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
    const result = await runCommand('bun', ['run', 'index.js', 'examples/test-dir']);
    
    if (result.code === 0 && fs.existsSync('examples/test-dir/sample.traced.js')) {
      const tracedContent = fs.readFileSync('examples/test-dir/sample.traced.js', 'utf8');
      const hasConsoleLog = tracedContent.includes("console.log('/Users/konard/Code/konard/source-code-tracer/examples/test-dir/sample.js:");
      
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
    // Generate traced file for testing
    await runCommand('bun', ['run', 'index.js', 'test.js']);
    
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
    // Ensure we have a traced file
    if (!fs.existsSync('test.traced.js')) {
      await runCommand('bun', ['run', 'index.js', 'test.js']);
    }
    
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
  
  // Test 6: Untrace functionality
  log(YELLOW, '🔄 Test 6: Untrace functionality');
  try {
    // First create a traced file
    await runCommand('bun', ['run', 'index.js', 'test.js']);
    
    if (fs.existsSync('test.traced.js')) {
      // Now untrace it
      const result = await runCommand('bun', ['run', 'index.js', '--untrace', 'test.traced.js']);
      
      if (result.code === 0 && !fs.existsSync('test.traced.js')) {
        log(GREEN, '✅ PASSED: Untrace functionality works correctly');
        passed++;
      } else {
        log(RED, '❌ FAILED: Untrace did not remove traced file');
        failed++;
      }
    } else {
      log(RED, '❌ FAILED: Could not create traced file for untrace test');
      failed++;
    }
  } catch (error) {
    log(RED, `❌ FAILED: ${error.message}`);
    failed++;
  }
  
  // Test 7: In-place functionality
  log(YELLOW, '📝 Test 7: In-place functionality');
  try {
    // Create a copy of test.js for in-place testing
    const testContent = fs.readFileSync('test.js', 'utf8');
    fs.writeFileSync('test-inplace.js', testContent);
    
    const result = await runCommand('bun', ['run', 'index.js', '--in-place', 'test-inplace.js']);
    
    if (result.code === 0 && fs.existsSync('test-inplace.untraced.original')) {
      const modifiedContent = fs.readFileSync('test-inplace.js', 'utf8');
      const hasConsoleLog = modifiedContent.includes("console.log('/Users/konard/Code/konard/source-code-tracer/test-inplace.js:");
      
      if (hasConsoleLog) {
        log(GREEN, '✅ PASSED: In-place tracing works correctly');
        passed++;
      } else {
        log(RED, '❌ FAILED: In-place tracing did not add console.log statements');
        failed++;
      }
      
      // Clean up
      if (fs.existsSync('test-inplace.js')) fs.unlinkSync('test-inplace.js');
      if (fs.existsSync('test-inplace.untraced.original')) fs.unlinkSync('test-inplace.untraced.original');
    } else {
      log(RED, '❌ FAILED: In-place functionality failed or backup not created');
      failed++;
    }
  } catch (error) {
    log(RED, `❌ FAILED: ${error.message}`);
    failed++;
  }
  
  // Test 8: In-place untrace functionality
  log(YELLOW, '🔄 Test 8: In-place untrace functionality');
  try {
    // Create a copy of test.js for in-place testing
    const testContent = fs.readFileSync('test.js', 'utf8');
    fs.writeFileSync('test-untrace.js', testContent);
    
    // First trace in-place
    await runCommand('bun', ['run', 'index.js', '--in-place', 'test-untrace.js']);
    
    if (fs.existsSync('test-untrace.untraced.original')) {
      // Now untrace in-place
      const result = await runCommand('bun', ['run', 'index.js', '--untrace', '--in-place', 'test-untrace.js']);
      
      if (result.code === 0 && !fs.existsSync('test-untrace.untraced.original')) {
        const restoredContent = fs.readFileSync('test-untrace.js', 'utf8');
        const hasNoConsoleLog = !restoredContent.includes("console.log('/Users/konard/Code/konard/source-code-tracer/test-untrace.js:");
        
        if (hasNoConsoleLog && restoredContent === testContent) {
          log(GREEN, '✅ PASSED: In-place untrace restored original file correctly');
          passed++;
        } else {
          log(RED, '❌ FAILED: In-place untrace did not restore original content');
          failed++;
        }
      } else {
        log(RED, '❌ FAILED: In-place untrace failed or backup not removed');
        failed++;
      }
      
      // Clean up
      if (fs.existsSync('test-untrace.js')) fs.unlinkSync('test-untrace.js');
      if (fs.existsSync('test-untrace.untraced.original')) fs.unlinkSync('test-untrace.untraced.original');
    } else {
      log(RED, '❌ FAILED: Could not create backup for in-place untrace test');
      failed++;
    }
  } catch (error) {
    log(RED, `❌ FAILED: ${error.message}`);
    failed++;
  }
  
  // Test 9: Help command
  log(YELLOW, '❓ Test 9: Help command');
  try {
    const result = await runCommand('bun', ['run', 'index.js', '--help']);
    
    if (result.code === 0 && result.stdout.includes('Usage:')) {
      log(GREEN, '✅ PASSED: Help command works correctly');
      passed++;
    } else {
      log(RED, '❌ FAILED: Help command did not work as expected');
      failed++;
    }
  } catch (error) {
    log(RED, `❌ FAILED: ${error.message}`);
    failed++;
  }
  
  // Test 10: Multiple traces on the same file
  log(YELLOW, '🔁 Test 10: Multiple traces on the same file');
  try {
    const testContent = fs.readFileSync('test.js', 'utf8');
    fs.writeFileSync('test-multiple.js', testContent);
    
    // First trace (creates backup)
    await runCommand('bun', ['run', 'index.js', '--in-place', 'test-multiple.js']);
    
    if (fs.existsSync('test-multiple.untraced.original')) {
      const firstBackupContent = fs.readFileSync('test-multiple.untraced.original', 'utf8');
      
      // Second trace (should not overwrite backup)
      await runCommand('bun', ['run', 'index.js', '--in-place', 'test-multiple.js']);
      
      const secondBackupContent = fs.readFileSync('test-multiple.untraced.original', 'utf8');
      
      if (firstBackupContent === testContent && secondBackupContent === testContent) {
        log(GREEN, '✅ PASSED: Multiple traces preserve original backup correctly');
        passed++;
      } else {
        log(RED, '❌ FAILED: Backup was corrupted during multiple traces');
        failed++;
      }
      
      // Clean up
      if (fs.existsSync('test-multiple.js')) fs.unlinkSync('test-multiple.js');
      if (fs.existsSync('test-multiple.untraced.original')) fs.unlinkSync('test-multiple.untraced.original');
    } else {
      log(RED, '❌ FAILED: Backup not created during first trace');
      failed++;
    }
  } catch (error) {
    log(RED, `❌ FAILED: ${error.message}`);
    failed++;
  }
  
  // Test 11: Untrace without backup
  log(YELLOW, '⚠️  Test 11: Untrace without backup');
  try {
    fs.writeFileSync('test-no-backup.js', 'console.log("test");');
    
    // Try to untrace in-place without backup
    const result = await runCommand('bun', ['run', 'index.js', '--untrace', '--in-place', 'test-no-backup.js']);
    
    if (result.stdout.includes('No backup found')) {
      log(GREEN, '✅ PASSED: Properly handles untrace without backup');
      passed++;
    } else {
      log(RED, '❌ FAILED: Did not handle missing backup correctly');
      failed++;
    }
    
    // Clean up
    if (fs.existsSync('test-no-backup.js')) fs.unlinkSync('test-no-backup.js');
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