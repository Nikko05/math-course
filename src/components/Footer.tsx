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
    <footer className='border-t border-stone-800 px-6 sm:px-10 py-12 flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 w-full max-w-7xl mx-auto'>
      
      {/* Counters Section */}
      <div className='w-full lg:w-1/2 grid grid-cols-2 gap-8'>
        <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
          <div className='text-sm text-neutral-400'>Zaufało nam</div>
          <div className='text-4xl font-bold text-fuchsia-700'>{stats ? `${stats.users}+` : '...'}</div>
          <div className='text-sm text-neutral-400'>użytkowników</div>
        </div>
        <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
          <div className='text-sm text-neutral-400'>Dostępnych kursów</div>
          <div className='text-4xl font-bold text-fuchsia-700'>{stats ? `${stats.courses}` : '...'}</div>
          <div className='text-sm text-neutral-400'>kursów</div>
        </div>
        <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
          <div className='text-sm text-neutral-400'>Złożonych zamówień</div>
          <div className='text-4xl font-bold text-fuchsia-700'>{stats ? `${stats.orders}+` : '...'}</div>
          <div className='text-sm text-neutral-400'>zamówień</div>
        </div>
        <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
          <div className='text-sm text-neutral-400'>Aktywnych studentów</div>
          <div className='text-4xl font-bold text-fuchsia-700'>{stats ? `${stats.activeStudents}` : '...'}</div>
          <div className='text-sm text-neutral-400'>studentów</div>
        </div>
      </div>

      {/* Logo and Socials Section */}
      <div className='w-full lg:w-1/2 flex flex-row justify-between lg:justify-end gap-4 sm:gap-12'>
        {/* Logo */}
        <div className='w-1/2 lg:w-auto flex justify-center lg:justify-center items-center'>
          <Image src='/logo_basic.svg' alt='logo' className='h-20 sm:h-24 w-auto drop-shadow-lg' width={96} height={96} />
        </div>

        {/* Socials */}
        <div className='w-1/2 lg:w-auto flex flex-col items-center lg:items-end'>
          <div className='text-lg sm:text-xl mb-6 font-semibold text-center lg:text-right'>Znajdziesz nas tutaj</div>
          <div className='flex flex-col gap-4'>
            <a className='flex items-center gap-4 cursor-pointer hover:text-blue-500 transition-colors group'>
              <Image src='/facebook.svg' alt='facebook logo' width={28} height={28} className='group-hover:scale-110 transition-transform' />
              <span className='font-medium'>Facebook</span>
            </a>
            <a className='flex items-center gap-4 cursor-pointer hover:text-fuchsia-500 transition-colors group'>
              <Image src='/instagram.svg' alt='instagram logo' width={28} height={28} className='group-hover:scale-110 transition-transform' />
              <span className='font-medium'>Instagram</span>
            </a>
            <a className='flex items-center gap-4 cursor-pointer hover:text-white transition-colors group'>
              <Image src='/tiktok.svg' alt='tiktok logo' width={28} height={28} className='group-hover:scale-110 transition-transform' />
              <span className='font-medium'>TikTok</span>
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
