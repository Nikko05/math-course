import React from 'react';
import Image from 'next/image';
import Button from './Button';
import Link from 'next/link';
import NavLinks from './NavLinks';
import { cookies } from 'next/headers';

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

const btnLogout = {
  background: 'bg-red-500', 
  color: 'text-white', 
  name: 'Logout', 
  type: 'text',
  paddingY: 'py-0.5',
  paddingX: 'px-2'
};

export default async function NavigationBar() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.has('user-session');

  const links = [
    { href: '/', label: 'Home' },
    { href: '/courses', label: 'Courses' },
    ...(isLoggedIn ? [{ href: '/tasks', label: 'Tasks' }] : []),
    { href: '/about-us', label: 'AboutUs' }
  ];

  return (
    <nav className='flex justify-center items-center py-3.5 px-10 border-b border-stone-800'>
      <div className='w-1/6'>
        <Image src='/logo_basic.svg' alt="logo" className='h-10 w-auto' width={40} height={40}/>
      </div>
      
      <NavLinks hrefsToLink={{ hrefs: links }} />
      
      <div className='flex items-baseline w-1/3 justify-around'>
        {isLoggedIn ? (
          <>
            <Link href='/cart'>
              <Button btnData={btnBuy} />
            </Link>
            <Link href='/api/logout'>
              <Button btnData={btnLogout} />
            </Link>
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