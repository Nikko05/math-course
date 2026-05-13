import React from 'react';
import Button from './Button';

const selected = {
  background: 'bg-blue-400', 
  color: 'text-slate-950', 
  name: 'Wybieram', 
  type: 'text',
  paddingY: 'py-1',
  paddingX: 'px-2',
  width: 'w-2/3'
};

export default function PricingCard() {
  return (
    <div className='border-2 border-blue-200/40 rounded-4xl w-1/4 h-full p-3 flex flex-col justify-around'>
      <div className='text-4xl font-extrabold'>Optymalny</div>
      <div className='text-xs'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem adipisci error itaque quibusdam earum!
      </div>
      <div className='font-semibold text-2xl'>
        <span className='font-normal align-super text-base'>$</span>199 <span className='font-normal text-base'>per/month</span>
      </div>
      <div className='flex justify-center'>
        <Button btnData={selected}></Button>
      </div>
      <div className='px-5'>
        <ul className='list-disc'>
          <li>10h korepetycji</li>
          <li>dostęp do zadań</li>
          <li>dostęp do kursów</li>
        </ul>
      </div>
    </div>
  );
};
