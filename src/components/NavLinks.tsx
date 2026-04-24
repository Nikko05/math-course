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
    <div className='flex items-baseline w-1/2 pr-15 justify-around'>       
      {hrefs.map(({href, label}) => <Link key={label} href={`${href}`} className={`capitalize ${pathname == href ? 'underline underline-offset-4 font-bold' : ''}`}>{label}</Link>)}
    </div>
  );
};
