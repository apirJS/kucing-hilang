'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { BsPostcardFill } from 'react-icons/bs';
import { FaFilter, FaPlus } from 'react-icons/fa';
import AddLostCatPostPopUp from './AddLostCatPostPopUp';

interface Props {
  setIsSearchFilterVisible: Dispatch<SetStateAction<boolean>>;
}

export default function LostCatPosts({ setIsSearchFilterVisible }: Props) {
  const [isAddPostPopUpVisible, setIsAddPostPopUpVisible] =
    useState<boolean>(false);

  return (
    <section className='relative grid grid-rows-[1fr_9fr] min-h-screen p-4'>
      <header className='h-20 flex justify-between items-center flex-wrap md:flex-nowrap gap-y-4 md:px-[2vw] lg:px-[5vw]'>
        <div className='flex justify-between gap-2 order-2 md:order-1'>
          <div className='flex gap-2'>
            <input
              className='placeholder-opacity-50 p-1 outline-none border border-accent/30 rounded-sm min-w-[15vw]'
              type='text'
              placeholder='Nama kucing..'
            />
            <button className='active:scale-95 min-w-20 rounded-md h-full p-1 bg-accent text-white font-bold font-mono border-none'>
              Cari
            </button>
            <button
              onClick={() => setIsSearchFilterVisible((prev) => !prev)}
              className='active:scale-95 flex gap-2 justify-center items-center min-w-20 rounded-md h-full p-1 bg-accent text-primary border-none'
            >
              <span>Filter</span>
              <FaFilter size={14} />
            </button>
          </div>
        </div>
        <div className='flex justify-between gap-2 order-1 md:order-2'>
          <button
            onClick={() => setIsAddPostPopUpVisible((prev) => !prev)}
            className='active:scale-95 h-10 flex justify-center items-center bg-accent text-white font-mono gap-2 px-2 py-1 rounded-md'
          >
            <span>Buat postingan</span>
            <FaPlus size={15} />
          </button>
          <button className='active:scale-95 h-10 flex justify-center items-center bg-accent text-white font-mono gap-1 px-2 py-1 rounded-md'>
            <BsPostcardFill size={20} />
            <span>PostinganKu</span>
          </button>
        </div>
      </header>
      <article className='flex flex-col gap-6 py-2 h-full border-2 border-accent/50 rounded-md overflow-y-scroll'></article>
      <AddLostCatPostPopUp
        setIsAddPostPopUpVisible={setIsAddPostPopUpVisible}
        isAddPostPopUpVisible={isAddPostPopUpVisible}
      />
    </section>
  );
}
