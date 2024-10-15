import { Dispatch, SetStateAction } from 'react';
import { BsPostcardFill } from 'react-icons/bs';
import { FaFilter } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';

interface Props {
  setIsSearchFilterVisible: Dispatch<SetStateAction<boolean>>;
}

export default function LostCatPosts({ setIsSearchFilterVisible }: Props) {
  return (
    <section className='grid grid-rows-[.1fr_9fr] min-h-[100vh]  p-4'>
      <header className='h-20 flex justify-end items-center sm:px-[10%]'>
        <button className=' h-10 flex justify-center items-center bg-accent text-white font-mono gap-x-1 px-2 py-1 rounded-md'>
          <BsPostcardFill size={20} />
          <span>PostinganKu</span>
        </button>
      </header>
      <article className=' flex flex-col gap-y-6 py-2 '>
        <div className='flex justify-between gap-x-2 sm:px-[10%]'>
          <div className='flex gap-x-2 '>
            <input
              className='placeholder:opacity-50 p-1 outline-none border border-accent/30 rounded-sm min-w-[15vw]'
              type='text'
              placeholder='Nama kucing..'
            />
            <button className='active:scale-95  min-w-20 rounded-md h-full p-1 bg-accent text-white font-bold font-mono border-none'>
              Cari
            </button>
            <button
              onClick={() => setIsSearchFilterVisible((prev) => !prev)}
              className='active:scale-95 flex gap-x-2 justify-center items-center  min-w-20 rounded-md h-full p-1 bg-accent text-primary border-none'
            >
              <span>Filter</span>
              <FaFilter size={14} />
            </button>
          </div>
          <button className=' h-10 flex justify-center items-center bg-accent text-white font-mono gap-x-2 px-2 py-1 rounded-md'>
            <span>Buat postingan</span>
            <FaPlus size={15} />
          </button>
        </div>
        <div className=' h-full border-2 border-accent/50 rounded-md overflow-y-scroll'></div>
      </article>
    </section>
  );
}
