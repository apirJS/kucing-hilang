export default function AddPostButton() {
  return (
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
  );
}
