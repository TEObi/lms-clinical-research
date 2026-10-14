'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ViewMoreButton({ href }: { href: string }) {
  const [clicked, setClicked] = useState(false);

  return (
    <Link
      href={href}
      onClick={() => setClicked(true)}
      className={`
        block w-full text-center text-white text-sm font-semibold py-2.5 rounded
        transition-all duration-150 mt-auto select-none
        active:scale-95
        ${clicked
          ? 'bg-[#b8973b] cursor-wait opacity-80'
          : 'bg-[#c9a84c] hover:bg-[#b8973b]'
        }
      `}
    >
      {clicked ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Loading…
        </span>
      ) : (
        'View more'
      )}
    </Link>
  );
}
