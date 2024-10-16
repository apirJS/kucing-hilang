'use client';

import { MdClose } from 'react-icons/md';
import { useState } from 'react';
import CatImages from './CatImages';
import AddPostButton from './AddPostButton';
import LostCatFormPost from './LostCatFormPost';

interface Props {
  isAddPostPopUpVisible: boolean;
  setIsAddPostPopUpVisible: (prev: boolean) => void;
}

interface CatImage {
  url: string;
  id: string;
}

export default function AddLostCatPostPopUp({
  setIsAddPostPopUpVisible,
  isAddPostPopUpVisible,
}: Props) {
  const [catImages, setCatImages] = useState<CatImage[]>([]);

  return (
    <div
      className={`${
        isAddPostPopUpVisible ? 'flex' : 'hidden'
      }  justify-center items-center  fixed inset-0 bg-black/70`}
    >
      <div className='grid grid-cols-[2fr_3fr] grid-rows-[10fr_2fr] bg-primary w-[80vw] xl:w-[50vw] h-[60vh] rounded-md relative'>
        <MdClose
          onClick={() => setIsAddPostPopUpVisible(false)}
          className='absolute top-4 right-4 hover:cursor-pointer active:scale-95'
          size={24}
        />
        <CatImages catImages={catImages} setCatImages={setCatImages} />
        <LostCatFormPost />
        <AddPostButton />
      </div>
    </div>
  );
}
