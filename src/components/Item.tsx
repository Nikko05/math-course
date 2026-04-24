// import { difference } from 'next/dist/build/utils';
import Image from 'next/image'
import React from 'react';

type ItemProps = {
  itemToBuy: {
    item: {
      id: string,
      name: string,
      level: string,
      prize: number,
      img: string,
      difficulty: string
    },
    amount: number
  }
}

export default function Item({itemToBuy: {item: {name, level, prize, img, difficulty}, amount}}: ItemProps) {

  return (
    <div className='flex w-full border-b border-blue-200/40 justify-start items-center pb-1.5 pt-3'>
      <div className='w-1/10 flex justify-center items-center'>
        <Image src={img} alt="item photo" />
      </div>
      <div className='w-7/10 px-3'>
        <div className='flex flex-row'>
          <div className='text-2xl font-bold'>{name}</div>
        </div>
        <div className='flex flex-row'>
          <div className='text-sm opacity-80 pr-10'>{level}</div>
          <div className='text-sm opacity-80'>{difficulty}</div>
        </div>
      </div>
      <div className='w-1/10 text-center'>
        {prize} PLN
      </div>
      <div className='w-1/10 text-center text-red-600'>
        X
      </div>
    </div>
  );
};
