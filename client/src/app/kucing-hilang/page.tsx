"use client"
import LostCatPosts from '@/components/LostCatPosts';
import SearchFilter from '@/components/SearchFilter';
import React, { useState } from 'react';

export default function KucingHilang() {
  const [isSearchFilterVisible, setIsSearchFilterVisible] = useState<boolean>(false);

  return (
    <main className=''>
      <SearchFilter setIsSearchFilterVisible={setIsSearchFilterVisible} isSearchFilterVisible={isSearchFilterVisible}/>
      <LostCatPosts setIsSearchFilterVisible={setIsSearchFilterVisible}/>
    </main>
  );
}
