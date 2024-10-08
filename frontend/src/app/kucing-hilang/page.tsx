import React from 'react';

export default function KucingHilang() {
  return (
    <>
      <main className='grid grid-cols-[1fr,4fr]'>
        <aside className='border border-black flex flex-col justify-start items-center py-20 gap-y-5'>
          <h1 className=' font-mono text-xl'>Filter Pencarian</h1>
          <form
            action=''
            className='flex justify-center items-center flex-col gap-y-6'
          >
            <div className='flex justify-center items-center flex-col gap-y-4'>
              <input
                type='text'
                placeholder='Provinsi'
                className='p-1 rounded-md border border-emerald-500/50'
              />
              <input
                type='text'
                placeholder='Kabupaten/Kota'
                className='p-1 rounded-md border border-emerald-500/50'
              />
              <input
                type='text'
                placeholder='Kecamatan'
                className='p-1 rounded-md border border-emerald-500/50'
              />
              <input
                type='text'
                placeholder='Kelurahan/Desa'
                className='p-1 rounded-md border border-emerald-500/50'
              />
            </div>
            <div className='grid grid-cols-2 gap-x-6'>
              <button className='bg-none border text-black border-accent  p-1 rounded-sm active:scale-95 hover:scale-105'>
                Reset
              </button>
              <button className='bg-accent text-primary p-1 rounded-sm active:scale-95 hover:scale-105'>
                Terapkan
              </button>
            </div>
          </form>
        </aside>
        <section className='h-[100vh] border border-black'></section>
      </main>
    </>
  );
}
