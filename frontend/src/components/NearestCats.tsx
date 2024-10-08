'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapBox } from '@/hooks/useMapBox';
import SearchSuggestions from './SearchSuggestions';
import { FaPaw } from 'react-icons/fa';

export default function NearestCats() {
  const {
    fetchSuggestions,
    handleSearch,
    suggestions,
    askLocationPermission,
    searchQuery,
    setSearchQuery,
    mapContainerRef,
    handleSuggestionClick,
  } = useMapBox();

  return (
    <section className='relative bg-secondary min-h-[100vh]  justify-start sm:justify-center items-center  gap-y-5 p-4  flex flex-col'>
      <div className='flex gap-y-4 w flex-col gap-x-2 w-full justify-center items-center'>
        <div className='flex flex-col items-center gap-4'>
          <h1 className='text-xl font-mono font-bold'>
            Temukan Kucing Hilang Di Sekitarmu
          </h1>
          <button
            className=' bg-accent text-primary p-2 text-xs  rounded-md max-w-max'
            onClick={askLocationPermission}
          >
            Gunakan Lokasi Saat Ini
          </button>
        </div>
        <div className='flex gap-x-2 relative w-4/5 sm:w-2/5 '>
          <input
            type='text'
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              fetchSuggestions(e.target.value);
            }}
            placeholder='Cari lokasi...'
            className='border p-2 rounded-md w-4/5 text-accent'
          />
          <button
            onClick={handleSearch}
            className='font-bold flex justify-center items-center gap-x-1 border-accent border p-2 rounded-md flex-grow active:scale-95 font-mono text-base'
          >
            <span>Cari</span>
            <FaPaw className='text-accent'/>
          </button>
          {suggestions.length > 0 && (
            <SearchSuggestions
              suggestions={suggestions}
              handleSuggestionClick={handleSuggestionClick}
            />
          )}
        </div>
      </div>
      <div
        id='map-container'
        ref={mapContainerRef}
        className='w-5/6 h-full flex-grow rounded-md'
      ></div>
    </section>
  );
}
