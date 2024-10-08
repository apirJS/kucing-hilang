
import Hero from '@/components/Hero';
import NearestCats from '@/components/NearestCats';
import React from 'react';

export default async function Home() {
  const data = await fetch('http://backend:5000');
  return (
    <>
      <main>
        {JSON.stringify(data)}
        <Hero />
        <NearestCats />
      </main>
    </>
  );
}
