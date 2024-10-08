
import Hero from '@/components/Hero';
import NearestCats from '@/components/NearestCats';

export default async function Home() {
  return (
    <>
      <main>
        <Hero />
        <NearestCats />
      </main>
    </>
  );
}
