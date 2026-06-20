import React from 'react';
import Image from 'next/image';
import Button from './Button';
import Link from 'next/link';
import NavLinks from './NavLinks';
import { cookies } from 'next/headers';

const btnDark = {
  background: 'bg-blue-400', 
  color: 'text-slate-950', 
  name: 'Zaloguj', 
  type: 'text',
  paddingY: 'py-1 sm:py-1.5',
  paddingX: 'px-2 sm:px-4',
  textClass: 'text-xs sm:text-sm font-semibold'
};

const btnLight = {
  background: 'bg-transparent', 
  color: 'text-white', 
  name: 'Zarejestruj', 
  type: 'text',
  paddingY: 'py-1 sm:py-1.5',
  paddingX: 'px-2 sm:px-4',
  textClass: 'text-xs sm:text-sm font-semibold'
};

const btnBuy = {
  background: 'bg-transparent', 
  color: 'text-white', 
  name: '🛒', 
  type: 'text',
  paddingY: 'py-1 sm:py-1.5',
  paddingX: 'px-2 sm:px-4',
  textClass: 'text-xs sm:text-sm'
};

const btnLogout = {
  background: 'bg-red-500', 
  color: 'text-white', 
  name: 'Wyloguj', 
  type: 'text',
  paddingY: 'py-1 sm:py-1.5',
  paddingX: 'px-2 sm:px-4',
  textClass: 'text-xs sm:text-sm font-semibold'
};

export default async function NavigationBar() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('user-session');

  const links = [
    { href: '/', label: 'Główna' },
    { href: '/courses', label: 'Kursy' },
    { href: '/about-us', label: 'O nas' }
  ];

  return (
    <nav className='flex items-center justify-between py-2.5 px-4 lg:px-10 border-b border-stone-800 h-16'>
      <div className='flex-shrink-0 flex items-center'>
        <Image src='/logo_basic.svg' alt="logo" className='h-8 w-auto' width={32} height={32} style={{ width: 'auto', height: 'auto' }}/>
      </div>
      
      <div className='flex-1 flex justify-center px-4 overflow-x-auto no-scrollbar'>
        <NavLinks hrefsToLink={{ hrefs: links }} />
      </div>
      
      <div className='flex items-center justify-end gap-2 flex-shrink-0'>
        {isLoggedIn ? (
          <>
            <Link href='/cart'>
              <Button btnData={btnBuy} />
            </Link>
            <a href='/api/logout'>
              <Button btnData={btnLogout} />
            </a>
          </>
        ) : (
          <>
            <Link href='/login'>
              <Button btnData={btnDark} />
            </Link>
            <Link href='/register'>
              <Button btnData={btnLight} />
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};