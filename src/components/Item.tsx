import Image from 'next/image';
import React from 'react';

type ItemProps = {
  itemToBuy: {
    item: {
      _id: string;
      title: string;
      level: string;
      price: number;
      image: string;
      description?: string;
    };
    amount: number;
    selected: boolean;
  };
  isSelected?: boolean;
  onToggleSelect?: () => void;
  onRemove?: () => void;
  onIncrease?: () => void;
  onDecrease?: () => void;
};

export default function Item({
  itemToBuy: {
    item: { title, level, price, image },
    amount,
    selected,
  },
  isSelected,
  onToggleSelect,
  onRemove,
  onIncrease,
  onDecrease,
}: ItemProps) {
  return (
    <div className='flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between'>
      <div className='flex items-start gap-4'>
        <div className='h-20 w-20 overflow-hidden rounded-3xl bg-slate-100'>
          <Image src={image || '/logo_basic.svg'} alt={title} width={80} height={80} className='object-cover' />
        </div>
        <div>
          <div className='text-xl font-bold'>{title}</div>
          <div className='text-sm text-slate-500'>{level}</div>
        </div>
      </div>

      <div className='flex flex-col gap-3 items-start md:items-end'>
        <div className='flex items-center gap-3'>
          {onToggleSelect && (
            <input
              type='checkbox'
              className='w-5 h-5 cursor-pointer accent-blue-600'
              checked={isSelected}
              onChange={onToggleSelect}
            />
          )}
          <span className='text-lg font-semibold'>{price} PLN</span>
        </div>

        <div className='flex items-center gap-2'>
          <button
            type='button'
            onClick={onDecrease}
            className='h-9 w-9 rounded-full border border-slate-300 text-xl text-slate-700 hover:bg-slate-100'
          >
            –
          </button>
          <span className='min-w-[2rem] text-center text-lg'>{amount}</span>
          <button
            type='button'
            onClick={onIncrease}
            className='h-9 w-9 rounded-full border border-slate-300 text-xl text-slate-700 hover:bg-slate-100'
          >
            +
          </button>
        </div>

        <button
          type='button'
          onClick={onRemove}
          className='rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700'
        >
          Usuń
        </button>
      </div>
    </div>
  );
}
