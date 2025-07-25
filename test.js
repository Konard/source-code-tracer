function greet(name) {
  const message = `Hello, ${name}!`;
  console.log(message);
  return message;
}

const user = 'World';
greet(user);

if (user === 'World') {
  console.log('Default greeting');
}

class MyClass {
  constructor() {
    this.value = 42;
  }
  
  getValue() {
    return this.value;
  }
}