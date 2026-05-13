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
  };
  isSelected?: boolean;
  onToggleSelect?: () => void;
  onRemove?: () => void;
}

export default function Item({itemToBuy: {item: {name, level, prize, img, difficulty}, amount}, isSelected, onToggleSelect, onRemove}: ItemProps) {

  return (
    <div className='flex w-full border-b border-blue-200/40 justify-start items-center pb-1.5 pt-3 gap-2'>
      {onToggleSelect && (
        <div className='w-auto flex justify-center items-center pl-2'>
          <input 
            type="checkbox" 
            className="w-5 h-5 cursor-pointer accent-blue-600"
            checked={isSelected}
            onChange={onToggleSelect}
          />
        </div>
      )}
      <div className='w-1/10 flex justify-center items-center'>
        {/* <Image src={img} alt="item photo" /> */}
      </div>
      <div className='flex-1 px-3'>
        <div className='flex flex-row'>
          <div className='text-2xl font-bold'>{name}</div>
        </div>
        <div className='flex flex-row gap-4'>
          <div className='text-sm opacity-80'>{level}</div>
          <div className='text-sm opacity-80'>{difficulty}</div>
        </div>
      </div>
      <div className='w-24 text-center font-semibold text-lg'>
        {prize} PLN
      </div>
      <div 
        className='w-10 text-center text-red-600 font-bold cursor-pointer hover:text-red-800 text-xl'
        onClick={onRemove}
      >
        X
      </div>
    </div>
  );
};
