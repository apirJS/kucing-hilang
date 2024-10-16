'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from './Navbar';
import AuthButtons from './home-page/AuthButtons';
import { MdMenu } from 'react-icons/md';
import Link from 'next/link';
import NavbarMobile from './NavbarMobile';

export default function Header() {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isMobileMenuVisible, setIsMobileMenuVisible] =
    useState<boolean>(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={` bg-accent text-primary flex justify-between h-[10vh]  items-center px-5 font-mono fixed inset-x-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className='sm:w-[70px] sm:h-[70px] h-[40px] w-[40px] flex justify-center items-center'>
        <Link href='/'>
          <Image
            src='/images/logo-no-bg.svg'
            alt='Kucing Hilangku'
            width={0}
            height={0}
            sizes='100vw'
            style={{ width: '100%', height: 'auto' }}
          />
        </Link>
      </div>
      <div className='flex gap-x-10'>
        <Navbar />
        <AuthButtons />
        <MdMenu
          className='md:hidden aspect-square'
          size={32}
          onClick={() => setIsMobileMenuVisible((prev) => !prev)}
        />
        <NavbarMobile state={{ isMobileMenuVisible, setIsMobileMenuVisible }} />
      </div>
    </header>
  );
}
