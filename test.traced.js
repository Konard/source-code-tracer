function greet(name) {
  const message = `Hello, ${name}!`;
  console.log(message);
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:3');
  return message;
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:4');
}
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:5');

const user = 'World';
greet(user);
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:8');

if (user === 'World') {
  console.log('Default greeting');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:11');
}
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:12');

class MyClass {
  constructor() {
    this.value = 42;
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:16');
  }
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:17');
  
  getValue() {
    return this.value;
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:20');
  }
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:21');
}
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:22');