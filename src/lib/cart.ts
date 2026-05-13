export type Course = {
  _id: string;
  title: string;
  category: string;
  level: string;
  price: number;
  description: string;
  image: string;
  createdAt: string;
};

export type CartItem = {
  item: Course;
  amount: number;
  selected: boolean;
};

const CART_KEY = 'mathapp-cart';

export function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(course: Course) {
  const items = loadCart();
  const exists = items.find(item => item.item._id === course._id);

  if (exists) {
    const updated = items.map(item =>
      item.item._id === course._id ? { ...item, amount: item.amount + 1 } : item
    );
    saveCart(updated);
    return updated;
  }

  const newItem = {
    item: course,
    amount: 1,
    selected: true,
  };

  const updated = [...items, newItem];
  saveCart(updated);
  return updated;
}

export function removeFromCart(id: string) {
  const items = loadCart();
  const updated = items.filter(item => item.item._id !== id);
  saveCart(updated);
  return updated;
}

export function updateCartQuantity(id: string, amount: number) {
  const items = loadCart();
  const updated = items.map(item =>
    item.item._id === id ? { ...item, amount: Math.max(1, amount) } : item
  );
  saveCart(updated);
  return updated;
}

export function toggleCartItem(id: string) {
  const items = loadCart();
  const updated = items.map(item =>
    item.item._id === id ? { ...item, selected: !item.selected } : item
  );
  saveCart(updated);
  return updated;
}
