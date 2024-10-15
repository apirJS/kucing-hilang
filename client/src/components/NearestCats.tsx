'use client';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useMapBox } from '@/hooks/useMapBox';
import SearchSuggestions from './SearchSuggestions';
import { FaPaw } from 'react-icons/fa';
import { ElementRef, useEffect, useRef, useState } from 'react';

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
    setSuggestions,
  } = useMapBox();
  const [currentSuggestionIndex, setCurrentSuggestionIndex] =
    useState<number>(-1);
  const inputRef = useRef<ElementRef<'input'>>(null);

  useEffect(() => {
    if (inputRef.current) {
      const inputElement = inputRef.current;

      addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === '/') {
          e.preventDefault();
          inputElement.focus();
        }
      });

      return () => {
        removeEventListener('keydown', (e: KeyboardEvent) => {
          if (e.key === '/') {
            e.preventDefault();
            inputElement.focus();
          }
        });
      };
    }
  }, []);

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    switch (e.key) {
      case 'Enter':
        const selectedSuggestion = suggestions.find(
          (s, i) => i === currentSuggestionIndex
        );

        if (selectedSuggestion) {
          handleSuggestionClick(selectedSuggestion);
        } else {
          handleSearch();
        }

        break;
      case 'Escape':
        inputRef.current?.blur();

        break;
      case 'ArrowDown':
        setCurrentSuggestionIndex((prevIndex) => {
          const newIndex =
            prevIndex < suggestions.length - 1 ? prevIndex + 1 : 0;
          setSuggestions((prev) =>
            prev.map((suggestion, i) => ({
              ...suggestion,
              selected: i === newIndex,
            }))
          );
          return newIndex;
        });

        break;
      case 'ArrowUp':
        setCurrentSuggestionIndex((prevIndex) => {
          const newIndex =
            prevIndex > 0 ? prevIndex - 1 : suggestions.length - 1;
          setSuggestions((prev) =>
            prev.map((suggestion, i) => ({
              ...suggestion,
              selected: i === newIndex,
            }))
          );
          return newIndex;
        });

        break;
      default:
        break;
    }
  }

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
            ref={inputRef}
            type='text'
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              fetchSuggestions(e.target.value);
            }}
            onKeyDown={(e) => handleKeyPress(e)}
            placeholder='( / ) Cari lokasi...'
            className='border p-2 rounded-md w-4/5 text-accent'
          />
          <button
            onClick={handleSearch}
            className='[box-shadow:2px_2px_0_0_black] active:text-white active:duration-200 font-bold flex justify-center items-center gap-x-1 border-accent border p-1 rounded-md flex-grow active:scale-95 font-mono text-base'
          >
            <span>Cari</span>
            <FaPaw />
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
        className='w-5/6 h-full flex-grow rounded-md select-none'
      ></div>
    </section>
  );
}
