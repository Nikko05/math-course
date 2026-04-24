import React from 'react';
import Image from 'next/image'
import Button from './button'; // error with Button ?
import Link from 'next/link';
import NavLinks from './NavLinks';

const btnDark = {
  background: 'bg-blue-400', 
  color: 'text-slate-950', 
  name: 'Login', 
  type: 'text',
  paddingY: 'py-0.5',
  paddingX: 'px-2'
};

const btnLight = {
  background: 'bg-transparent', 
  color: 'text-white', 
  name: 'Register', 
  type: 'text',
  paddingY: 'py-0.5',
  paddingX: 'px-2'
};

const btnBuy = {
  background: 'bg-transparent', 
  color: 'text-white', 
  name: '🛒', 
  type: 'text',
  paddingY: 'py-0.5',
  paddingX: 'px-2'
};

const hrefsToLink = {
  hrefs: [
    {
      href: '/',
      label: 'Home'
    },
    {
      href: '/courses',
      label: 'Courses'
    },
    {
      href: '/tutor',
      label: 'Tutor'
    },
    {
      href: '/tasks',
      label: 'Tasks'
    },
    {
      href: '/aboutUs',
      label: 'AboutUs'
    }
  ]
};

function NavigationBar() {
  return (
    <nav className='flex justify-center items-center py-3.5 px-10 border-b border-stone-800'>
      <div className='w-1/6'>
        <Image src='/logo_basic.svg' alt="logo" className='h-10'/>
      </div>
      <NavLinks hrefsToLink={hrefsToLink}></NavLinks>
      <div className='flex items-baseline w-1/3 justify-around'>
        <Link href='/login'>
          <Button btnData={ btnDark }/>
        </Link>
        <Link href='/register'>
          <Button btnData={ btnLight }/></Link>
        <Link href='/cart'>
          <Button btnData={ btnBuy }/>
        </Link>
      </div>
    </nav>
  );
};

export default NavigationBar;