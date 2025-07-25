interface User {
  name: string;
  age: number;
}

class UserService {
  private users: User[] = [];
  
  addUser(user: User): void {
    this.users.push(user);
console.log('/Users/konard/Code/konard/source-code-tracer/test.ts:10');
  }
console.log('/Users/konard/Code/konard/source-code-tracer/test.ts:11');
  
  getUser(name: string): User | undefined {
    return this.users.find(u => u.name === name);
console.log('/Users/konard/Code/konard/source-code-tracer/test.ts:14');
  }
console.log('/Users/konard/Code/konard/source-code-tracer/test.ts:15');
}
console.log('/Users/konard/Code/konard/source-code-tracer/test.ts:16');

const service = new UserService();
service.addUser({ name: 'John', age: 30 });
console.log('/Users/konard/Code/konard/source-code-tracer/test.ts:19');

const foundUser = service.getUser('John');
console.log('/Users/konard/Code/konard/source-code-tracer/test.ts:21');
if (foundUser) {
  console.log(`Found user: ${foundUser.name}`);
console.log('/Users/konard/Code/konard/source-code-tracer/test.ts:23');
}
console.log('/Users/konard/Code/konard/source-code-tracer/test.ts:24');