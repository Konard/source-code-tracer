function greet(name) {
  const message = `Hello, ${name}!`;
  return message;
}

const user = 'World';
greet(user);

if (user === 'World') {
  console.log('Default greeting');  
}