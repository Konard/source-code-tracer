// Comprehensive TypeScript example with type annotations

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// Type alias
type CartTotal = {
  subtotal: number;
  tax: number;
  total: number;
};

// Enum declaration
enum PaymentMethod {
  Cash = 'cash',
  Card = 'card',
  Digital = 'digital'
}

// Generic function
function filterItems<T>(items: T[], predicate: (item: T) => boolean): T[] {
  const filtered: T[] = [];
  for (const item of items) {
    if (predicate(item)) {
      filtered.push(item);
    }
  }
  return filtered;
}

// Class with generics and decorators-like functionality
class ShoppingCart<T extends Product> {
  private items: CartItem[] = [];
  
  constructor(private taxRate: number = 0.08) {}
  
  addItem(product: T, quantity: number = 1): void {
    const existingItem = this.findItem(product.id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  }
  
  removeItem(productId: number): boolean {
    const index = this.items.findIndex(item => item.product.id === productId);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }
  
  private findItem(productId: number): CartItem | undefined {
    return this.items.find(item => item.product.id === productId);
  }
  
  calculateTotal(): CartTotal {
    const subtotal = this.items.reduce((sum, item) => {
      return sum + (item.product.price * item.quantity);
    }, 0);
    
    const tax = subtotal * this.taxRate;
    const total = subtotal + tax;
    
    return { subtotal, tax, total };
  }
}

// Sample data
const products: Product[] = [
  { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
  { id: 2, name: 'Book', price: 19.99, category: 'Education' },
  { id: 3, name: 'Headphones', price: 149.99, category: 'Electronics' }
];

// Usage
const cart = new ShoppingCart<Product>(0.1);
cart.addItem(products[0], 1);
cart.addItem(products[2], 2);

const electronicsProducts = filterItems(products, p => p.category === 'Electronics');
console.log('Electronics products:', electronicsProducts.length);

const totals = cart.calculateTotal();
if (totals.total > 100) {
  console.log('High value cart');
}

// Async function example
async function processPayment(amount: number, method: PaymentMethod): Promise<boolean> {
  try {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (amount > 0 && method in PaymentMethod) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Payment failed:', error);
    return false;
  }
}

// Export
export { ShoppingCart, PaymentMethod, processPayment };
export type { Product, CartItem, CartTotal };