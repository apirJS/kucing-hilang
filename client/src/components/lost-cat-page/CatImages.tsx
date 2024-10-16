'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';
import { MdClose } from 'react-icons/md';

interface CatImage {
  url: string;
  id: string;
}

interface Props {
  catImages: CatImage[];
  setCatImages: React.Dispatch<React.SetStateAction<CatImage[]>>;
}

export default function CatImages({ catImages, setCatImages }: Props) {
  const [thereIsPlusNImage, setThereIsPlusNImage] = useState<number>(0);
  const [isImageViewPopUpVisible, setIsImageViewPopUpVisible] =
    useState<boolean>(false);
  const [viewedImage, setViewedImage] = useState<CatImage>();

  useEffect(() => {
    const newImages: CatImage[] = [];
    for (let i = 0; i < 10; i++) {
      newImages.push({ id: `${i} id`, url: '' });
    }
    setCatImages((prev) => [...prev, ...newImages]);
  }, [setCatImages]);

  useEffect(() => {
    if (catImages.length > 3) {
      setThereIsPlusNImage(catImages.length - 4);
    }
  }, [catImages]);

  function handleImageClick(image: CatImage) {
    const imageUrl = image.url ? image.url : 'https://placehold.co/1000x2000';

    setViewedImage(() => ({ ...image, url: imageUrl }));
    setIsImageViewPopUpVisible(true);
  }

  return (
    <div className='border border-black grid grid-cols-1 grid-rows-[1fr_1fr] justify-center pt-4 gap-y-4 w-full'>
      <button className='w-3/5 h-4/5 justify-self-center self-center gap-y-2 rounded-md border border-accent '>
        <label
          htmlFor='file-upload'
          className='hover:cursor-pointer hover:scale-105 flex flex-col justify-center items-center '
        >
          <FaPlus size={20} />
          <span className='md:text-lg'>Gambar</span>
        </label>
        <input
          id='file-upload'
          type='file'
          className='hidden'
          accept='image/*'
        />
      </button>
      <div className='grid grid-cols-4 gap-x-1 w-full justify-center items-start p-6'>
        {catImages.map((image, i) => (
          <div
            key={i}
            className={`${
              i > 3 ? 'hidden' : ''
            } border aspect-square w-full relative hover:cursor-pointer`}
          >
            <Image
              src={image.url || 'https://placehold.co/100x100'}
              alt={image.id}
              fill
              onClick={() => handleImageClick(image)}
            ></Image>
            {thereIsPlusNImage > 0 && i === 3 ? (
              <div className='absolute hover:inset-0 hover:flex hover:justify-center hover:items-center z-10'>
                <FaPlus size={10} />
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <div
        className={`${
          isImageViewPopUpVisible ? 'flex' : 'hidden'
        } fixed inset-0 bg-black/90 justify-center items-center z-50 overflow-y-auto`}
      >
        <figure className='h-[50vh] w-[30vw] bg-none relative flex justify-center items-center'>
          {viewedImage ? (
            <Image
              alt={viewedImage.id}
              src={viewedImage.url}
              width={200}
              height={200}
            />
          ) : (
            <h1>Error when loading an image</h1>
          )}
          <MdClose
            size={50}
            className='text-white absolute -top-14 -right-14 hover:cursor-pointer active:scale-95 '
            onClick={() => setIsImageViewPopUpVisible(false)}
          />
        </figure>
      </div>
    </div>
  );
}
