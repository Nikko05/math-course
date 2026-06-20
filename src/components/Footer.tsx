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
    <footer className='border-t border-stone-800 px-6 sm:px-10 py-6 sm:py-8 flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6 sm:gap-8 w-full max-w-7xl mx-auto'>
      
      {/* Counters Section */}
      <div className='w-full lg:w-1/2 grid grid-cols-3 gap-2 sm:gap-8'>
        <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
          <div className='text-xs sm:text-sm text-neutral-400'>Zaufało nam</div>
          <div className='text-2xl sm:text-4xl font-bold text-fuchsia-700'>{stats ? `${stats.users}+` : '...'}</div>
          <div className='text-xs sm:text-sm text-neutral-400'>użytkowników</div>
        </div>
        <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
          <div className='text-xs sm:text-sm text-neutral-400'>Dostępnych kursów</div>
          <div className='text-2xl sm:text-4xl font-bold text-fuchsia-700'>{stats ? `${stats.courses}` : '...'}</div>
          <div className='text-xs sm:text-sm text-neutral-400'>kursów</div>
        </div>
        <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
          <div className='text-xs sm:text-sm text-neutral-400'>Aktywnych studentów</div>
          <div className='text-2xl sm:text-4xl font-bold text-fuchsia-700'>{stats ? `${stats.activeStudents}` : '...'}</div>
          <div className='text-xs sm:text-sm text-neutral-400'>studentów</div>
        </div>
      </div>

      {/* Logo and Socials Section */}
      <div className='w-full lg:w-1/2 flex flex-row justify-between lg:justify-end gap-4 sm:gap-12'>
        {/* Logo */}
        <div className='w-1/2 lg:w-auto flex justify-center lg:justify-center items-center'>
          <Image src='/logo_basic.svg' alt='logo' className='h-12 sm:h-16 w-auto drop-shadow-lg' width={64} height={64} style={{ width: 'auto', height: 'auto' }} />
        </div>

        {/* Socials */}
        <div className='w-1/2 lg:w-auto flex flex-col items-center lg:items-end'>
          <div className='text-sm sm:text-base mb-3 font-semibold text-center lg:text-right'>Znajdziesz nas tutaj</div>
          <div className='flex flex-col gap-2 sm:gap-3'>
            <a className='flex items-center gap-2 sm:gap-3 cursor-pointer hover:text-blue-500 transition-colors group'>
              <Image src='/facebook.svg' alt='facebook logo' width={20} height={20} className='w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform' style={{ width: 'auto', height: 'auto' }} />
              <span className='text-xs sm:text-sm font-medium'>Facebook</span>
            </a>
            <a className='flex items-center gap-2 sm:gap-3 cursor-pointer hover:text-fuchsia-500 transition-colors group'>
              <Image src='/instagram.svg' alt='instagram logo' width={20} height={20} className='w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform' style={{ width: 'auto', height: 'auto' }} />
              <span className='text-xs sm:text-sm font-medium'>Instagram</span>
            </a>
            <a className='flex items-center gap-2 sm:gap-3 cursor-pointer hover:text-white transition-colors group'>
              <Image src='/tiktok.svg' alt='tiktok logo' width={20} height={20} className='w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform' style={{ width: 'auto', height: 'auto' }} />
              <span className='text-xs sm:text-sm font-medium'>TikTok</span>
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
