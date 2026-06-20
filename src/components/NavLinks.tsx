'use client'
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type HrefsProps = {
  hrefsToLink: {
    hrefs: Array<any>;
  } 
}

export default function LinksForNav({hrefsToLink: { hrefs }}: HrefsProps ) {
  const pathname = usePathname();

  return (
    <div className='flex items-center gap-4 sm:gap-8 justify-center whitespace-nowrap text-sm sm:text-base'>       
      {hrefs.map(({href, label}) => <Link key={label} href={`${href}`} className={`capitalize hover:text-blue-500 transition-colors ${pathname == href ? 'underline underline-offset-4 font-bold text-blue-600' : ''}`}>{label}</Link>)}
    </div>
  );
};
