"use client"
import LostCatPosts from '@/components/lost-cat-page/LostCatPosts';
import SearchFilter from '@/components/lost-cat-page/SearchFilter';
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
