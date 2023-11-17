'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <footer className="sticky inset-x-0 bottom-0 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6">
      <span className="text-sm text-gray-500 sm:text-center ">
        © {year + ' '}
        <a href="https://flowbite.com/" className="hover:underline">
          Remote Jobs Greece™
        </a>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
        <li>
          <Link href="/about" className="mr-4 hover:underline md:mr-6">
            About
          </Link>
        </li>
        <li>
          <Link href="privacy-policy" className="mr-4 hover:underline md:mr-6">
            Privacy Policy
          </Link>
        </li>
        <li>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </li>
      </ul>
    </footer>
  );
}
