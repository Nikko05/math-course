"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

type StatsData = {
  users: number;
  courses: number;
  orders: number;
  activeStudents: number;
};

function Footer() {
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await fetch('/api/stats');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Błąd pobierania statystyk:', error);
      }
    }

    loadStats();
  }, []);

  return (
    <footer className='flex flex-wrap justify-center border-t border-stone-800 px-10 py-8'>
      <div className='w-full sm:w-1/5 flex py-5 justify-center items-center'>
        <Image src='/logo_basic.svg' alt='logo' className='h-[35px] w-auto' width={35} height={35} />
      </div>
      <div className='w-full sm:w-2/5 flex flex-col justify-center items-center'>
        <div>
          <div className='text-2xl'>Znajdziesz nas tutaj</div>
          <a className='flex py-0.5 cursor-pointer'>
            <Image src='/facebook.svg' alt='facebook logo' className='pr-2' width={30} height={35} />
            <div>Facebook</div>
          </a>
          <a className='flex py-0.5 cursor-pointer'>
            <Image src='/instagram.svg' alt='instagram logo' className='pr-2' width={30} height={35} />
            <div>Instagram</div>
          </a>
          <a className='flex py-0.5 cursor-pointer'>
            <Image src='/tiktok.svg' alt='tiktok logo' className='pr-2' width={30} height={35} />
            TikTok
          </a>
        </div>
      </div>
      <div className='w-full sm:w-2/5 grid grid-cols-1 sm:grid-cols-2 gap-6'>
        <div className='justify-around flex flex-col text-center'>
          <div className='text-lg'>Zaufało nam</div>
          <div className='text-5xl text-fuchsia-700'>{stats ? `${stats.users}+` : '...'}</div>
          <div className='text-lg'>użytkowników</div>
        </div>
        <div className='justify-around flex flex-col text-center'>
          <div className='text-lg'>Dostępnych kursów</div>
          <div className='text-5xl text-fuchsia-700'>{stats ? `${stats.courses}` : '...'}</div>
          <div className='text-lg'>kursów</div>
        </div>
        <div className='justify-around flex flex-col text-center'>
          <div className='text-lg'>Złożonych zamówień</div>
          <div className='text-5xl text-fuchsia-700'>{stats ? `${stats.orders}+` : '...'}</div>
          <div className='text-lg'>zamówień</div>
        </div>
        <div className='justify-around flex flex-col text-center'>
          <div className='text-lg'>Aktywnych studentów</div>
          <div className='text-5xl text-fuchsia-700'>{stats ? `${stats.activeStudents}` : '...'}</div>
          <div className='text-lg'>studentów</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
