import { MdClose } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa';

interface Props {
  isAddPostPopUpVisible: boolean;
  setIsAddPostPopUpVisible: (prev: boolean) => void;
}

export default function AddLostCatPostPopUp({
  setIsAddPostPopUpVisible,
  isAddPostPopUpVisible,
}: Props) {
  return (
    <div
      className={`${
        isAddPostPopUpVisible ? 'flex' : 'hidden'
      }  justify-center items-center  fixed z-100 inset-0 bg-black/40`}
    >
      <div className='grid grid-cols-[2fr_3fr] grid-rows-[10fr_2fr] bg-primary w-[80vw] xl:w-[50vw] h-[60vh] rounded-md relative'>
        <MdClose
          onClick={() => setIsAddPostPopUpVisible(false)}
          className='absolute top-4 right-4 hover:cursor-pointer active:scale-95'
          size={24}
        />
        <div className='border border-black flex justify-center pt-4'>
          <button className='gap-y-2 rounded-md h-2/5 border border-accent w-3/5 flex flex-col justify-center items-center '>
            <label htmlFor='file-upload' className='hover:cursor-pointer hover:scale-105'>
              <FaPlus size={20} />
            </label>
            <input id='file-upload' type='file' className='hidden' accept="image/*"/>
            <span className='md:text-lg'>Gambar</span>
          </button>
          <div></div>
        </div>
        <div className='border border-black'></div>
        <div className='flex justify-end col-span-2 px-8 gap-x-4 items-center'>
          <button
            type='button'
            className='min-w-[5vw] h-8 font-bold [box-shadow:2px_2px_0_0_black] bg-accent text-primary p-1 rounded-sm active:scale-95 hover:grayscale-[0] grayscale-[50%]'
          >
            Batal
          </button>
          <button className='min-w-[5vw] h-8 [box-shadow:2px_2px_0_0_black] bg-none border text-black border-accent  p-1 rounded-sm active:scale-95 hover:grayscale-[0] grayscale-[50%]'>
            Buat
          </button>
        </div>
      </div>
    </div>
  );
}
