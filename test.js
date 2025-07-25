// Test file for format verification
function calculateTotal(items) {
  let total = 0;
  for (const item of items) {
    total += item.price;
  }
  return total;
}

const products = [
  { name: 'Book', price: 10 },
  { name: 'Pen', price: 2 }
];

const result = calculateTotal(products);

if (result > 10) {
  console.log('Expensive purchase');
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }
  
  addItem(item) {
    this.items.push(item);
  }
}

const cart = new ShoppingCart();
cart.addItem(products[0]);