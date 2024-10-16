import Image from 'next/image';
import Link from 'next/link';
import { FaRegHandPointDown } from 'react-icons/fa6';

export default function Hero() {
  return (
    <section
      id='hero'
      className='relative grid md:grid-cols-2 grid-cols-1 h-full sm:min-h-[100vh]'
    >
      <figure className=' items-center justify-center gap-y-10 flex flex-col p-4'>
        <Image
          className=' rounded-xl'
          src='/images/hero.jpg'
          alt='Hero'
          width={680}
          height={680}
          priority
        />
        <blockquote className='font-mono  text-base sm:text-lg font-bold flex px-10'>
          🐾 Temukan kucing kesayanganmu dan bantu orang lain menemukan kucing
          mereka 🐾
        </blockquote>
      </figure>
      <aside className=' relative flex justify-center items-center p-4  font-mono  flex-col gap-y-10'>
        <blockquote className=' flex justify-center items-center flex-col gap-y-2'>
          <Image
            width={150}
            height={150}
            src='/images/black-cat.gif'
            alt='happy happy happy'
            className='hidden md:block'
          />
          <p className='text-sm sm:text-lg'>
            Di sini, kamu bisa membuat postingan jika kamu
            <strong> kehilangan</strong> kucing kesayanganmu, atau jika kamu
            <strong> menemukan</strong> kucing yang hilang.
          </p>
          <FaRegHandPointDown />
        </blockquote>
        <div className='flex gap-x-4 text-xs sm:text-base'>
          <Link href='kucing-ditemukan'>
            <button className='[box-shadow:2px_2px_0_0_black] select-none bg-secondary hover:scale-105 transition font-bold border-[1px]  border-accent p-2 min-w-24 min-h-15 rounded-md z-10'>
              Aku Menemukan Kucing 😸
            </button>
          </Link>
          <div className='w-[2px] bg-black rounded-md'></div>
          <Link href='kucing-hilang'>
            <button className='[box-shadow:2px_2px_0_0_black] select-none bg-secondary hover:scale-105 transition font-bold border-[1px]  border-accent p-2 min-w-24 min-h-15 rounded-md z-10'>
              Aku Kehilangan Kucing 😿
            </button>
          </Link>
        </div>
        <p>Semoga kucingmu cepet ketemu 😘</p>
      </aside>
    </section>
  );
}
