"use client";

import React, { useEffect, useState } from 'react';
import Item from '@/components/Item';
import Button from '@/components/Button';
import { loadCart, saveCart, removeFromCart, toggleCartItem, updateCartQuantity, CartItem } from '@/lib/cart';

const btnCheckout = {
  background: 'bg-blue-600',
  color: 'text-white',
  name: 'Przejdź do kasy',
  type: 'text',
  paddingY: 'py-3',
  paddingX: 'px-4',
  width: 'w-full',
};

export default function Cart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const current = loadCart();
    setItems(current);
  }, []);

  const syncCart = (nextItems: CartItem[]) => {
    setItems(nextItems);
    saveCart(nextItems);
  };

  const handleToggleSelect = (id: string) => {
    syncCart(toggleCartItem(id));
  };

  const handleRemoveItem = (id: string) => {
    syncCart(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, amount: number) => {
    if (amount < 1) return;
    syncCart(updateCartQuantity(id, amount));
  };

  const totalSelectedPrice = items
    .filter(item => item.selected)
    .reduce((sum, current) => sum + current.item.price * current.amount, 0);

  return (
    <div className='w-full h-full flex flex-col lg:flex-row gap-10 p-5'>
      <div className='w-full lg:w-7/12 xl:w-8/12 flex flex-col gap-4'>
        <h2 className='text-3xl font-bold mb-4'>Twój koszyk</h2>
        {items.length === 0 ? (
          <p className='text-neutral-500'>Twój koszyk jest pusty.</p>
        ) : (
          items.map((cartItem) => (
            <Item
              key={cartItem.item._id}
              itemToBuy={cartItem}
              isSelected={cartItem.selected}
              onToggleSelect={() => handleToggleSelect(cartItem.item._id)}
              onRemove={() => handleRemoveItem(cartItem.item._id)}
              onIncrease={() => handleQuantityChange(cartItem.item._id, cartItem.amount + 1)}
              onDecrease={() => handleQuantityChange(cartItem.item._id, cartItem.amount - 1)}
            />
          ))
        )}
      </div>

      <div className='w-full lg:w-5/12 xl:w-4/12'>
        <div className='border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 rounded-3xl p-8 shadow-lg flex flex-col gap-6 sticky top-24'>
          <h3 className='text-2xl font-bold'>Podsumowanie</h3>
          <div className='flex flex-col gap-3 text-lg'>
            <div className='flex justify-between'>
              <span className='text-neutral-500 dark:text-neutral-400'>Wartość produktów:</span>
              <span className='font-medium'>{totalSelectedPrice} PLN</span>
            </div>
            <div className='flex justify-between'>
              <span className='text-neutral-500 dark:text-neutral-400'>Zniżka:</span>
              <span className='font-medium text-green-600 dark:text-green-400'>-0 PLN</span>
            </div>
          </div>
          <div className='border-t border-neutral-200 dark:border-neutral-800 pt-4 mt-2'>
            <div className='flex justify-between items-center mb-6'>
              <span className='text-xl font-bold'>Do zapłaty:</span>
              <span className='text-3xl font-bold text-blue-600 dark:text-blue-400'>{totalSelectedPrice} PLN</span>
            </div>
            <Button btnData={{ ...btnCheckout, background: totalSelectedPrice === 0 ? 'bg-neutral-400' : 'bg-blue-600' }} />
          </div>

          <div className='text-sm text-center text-neutral-500 dark:text-neutral-400 mt-4'>
            Masz kod rabatowy? Dodaj go w następnym kroku.
          </div>
        </div>
      </div>
    </div>
  );
}
