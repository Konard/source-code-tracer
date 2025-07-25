// Comprehensive example showing various JavaScript constructs

import fs from 'fs';
import path from 'path';

// Variable declarations
const PI = 3.14159;
let counter = 0;
var globalVar = 'test';

// Function declarations
function calculateArea(radius) {
  const area = PI * radius * radius;
  return area;
}

// Arrow functions  
const multiply = (a, b) => {
  const result = a * b;
  return result;
};

// Class declaration
class Calculator {
  constructor() {
    this.history = [];
  }
  
  add(a, b) {
    const result = a + b;
    this.history.push(`${a} + ${b} = ${result}`);
    return result;
  }
  
  subtract(a, b) {
    const result = a - b;
    this.history.push(`${a} - ${b} = ${result}`);
    return result;
  }
}

// Object creation and method calls
const calc = new Calculator();
const sum = calc.add(5, 3);
const difference = calc.subtract(10, 4);

// Control flow statements
if (sum > 5) {
  console.log('Sum is greater than 5');
} else {
  console.log('Sum is not greater than 5');
}

// For loop
for (let i = 0; i < 3; i++) {
  counter += i;
}

// While loop
while (counter < 10) {
  counter++;
}

// Try-catch block
try {
  const area = calculateArea(5);
  console.log(`Area: ${area}`);
} catch (error) {
  console.error('Error calculating area:', error);
}

// Export statement
export { Calculator, calculateArea, multiply };