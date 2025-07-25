interface User {
  name: string;
  age: number;
}

function createUser(name: string, age: number): User {
  const user: User = { name, age };
  return user;
}

const john = createUser('John', 30);
console.log(john.name);

class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
  
  multiply(a: number, b: number): number {
    return a * b;
  }
}