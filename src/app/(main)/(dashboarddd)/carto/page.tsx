import React from 'react';
import Item from '@/components/Item';

const itemToBuy = {
    item: {
      id: '123',
      name: 'Ułamki dziesiętne',
      level: 'Klasa 4',
      prize: 99,
      img: './logo_basic.svg',
      difficulty: "Nic nie wiem"
    },
    amount: 1
  }

export default function Cart() {
  return (
    <div className='w-full h-full flex flex-row'>
      <div className='w-6/10'>
        <Item itemToBuy={itemToBuy}></Item>
        <Item itemToBuy={itemToBuy}></Item>
        <Item itemToBuy={itemToBuy}></Item>
      </div>
      <div className='m-5 w-4/10 border border-blue-100/10 bg-blue-100/8 rounded-2xl'>
        {/* summary and methods of buying */}
        <div>
          {/* articles prize */}
          {/* methods of prize */}
          {/* coupons */}
        </div>
      </div>
    </div>
  );
};
