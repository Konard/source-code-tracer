interface User {
  name: string;
  age: number;
}

function createUser(name: string, age: number): User {
  const user: User = { name, age };
  return user;
console.log('/Users/konard/Code/konard/source-code-tracer/examples/example.ts:8');
}
console.log('/Users/konard/Code/konard/source-code-tracer/examples/example.ts:9');

const john = createUser('John', 30);
console.log('/Users/konard/Code/konard/source-code-tracer/examples/example.ts:11');
console.log(john.name);
console.log('/Users/konard/Code/konard/source-code-tracer/examples/example.ts:12');

class Calculator {
  add(a: number, b: number): number {
    return a + b;
console.log('/Users/konard/Code/konard/source-code-tracer/examples/example.ts:16');
  }
console.log('/Users/konard/Code/konard/source-code-tracer/examples/example.ts:17');
  
  multiply(a: number, b: number): number {
    return a * b;
console.log('/Users/konard/Code/konard/source-code-tracer/examples/example.ts:20');
  }
console.log('/Users/konard/Code/konard/source-code-tracer/examples/example.ts:21');
}
console.log('/Users/konard/Code/konard/source-code-tracer/examples/example.ts:22');