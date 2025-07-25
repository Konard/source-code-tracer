// Test file for format verification
function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price;
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:5');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:5');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:6');
  }
  return total;
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:8');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:7');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:9');
}
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:10');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:8');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:11');

const products = [
  { name: 'Book', price: 10 },
  { name: 'Pen', price: 2 }
];

const result = calculateTotal(products);
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:18');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:15');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:19');

if (result > 10) {
  console.log('Expensive purchase');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:22');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:18');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:23');
}
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:24');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:19');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:25');

class ShoppingCart {
  constructor() {
    this.items = [];
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:29');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:23');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:30');
  }
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:31');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:24');
  
  addItem(item) {
    this.items.push(item);
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:35');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:27');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:36');
  }
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:37');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:28');
}
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:39');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:29');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:40');

const cart = new ShoppingCart();
cart.addItem(products[0]);
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:43');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:32');
console.log('/Users/konard/Code/konard/source-code-tracer/test.js:44');