'use client';

import { Province, Regency, District, Village } from '@/lib/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';

interface Props {
  setIsSearchFilterVisible: Dispatch<SetStateAction<boolean>>;
  isSearchFilterVisible: boolean;
}
type RegionTypes = 'provinces' | 'regencies' | 'districts' | 'villages';
type SetState<T extends Province | Regency | District | Village> = Dispatch<
  SetStateAction<T[]>
>;

export default function SearchFilter({
  setIsSearchFilterVisible,
  isSearchFilterVisible,
}: Props) {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [regencies, setRegencies] = useState<Regency[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [villages, setVillages] = useState<Village[]>([]);

  const [location, setLocation] = useState<{
    province: { id: string; name: string };
    regency: { id: string; name: string };
    district: { id: string; name: string };
    village: { id: string; name: string };
  }>({
    province: {
      id: '',
      name: '',
    },
    regency: {
      id: '',
      name: '',
    },
    district: {
      id: '',
      name: '',
    },
    village: {
      id: '',
      name: '',
    },
  });

  async function fetchRegions<
    T extends Province | Regency | District | Village
  >(type: RegionTypes, setState: SetState<T>, id?: string): Promise<void> {
    const INDONESIA_REGION_API_URL =
      'https://www.emsifa.com/api-wilayah-indonesia/api';
    let url = `${INDONESIA_REGION_API_URL}/${type}.json`;

    if (id && type !== 'provinces') {
      url = `${INDONESIA_REGION_API_URL}/${type}/${id}.json`;
    }

    try {
      const response = await fetch(url);
      const data: T[] = await response.json();
      setState(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleProvinceChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const provinceId = event.target.value;
    const provinceName = event.target.dataset.provinceName!;

    setLocation((prev) => ({
      ...prev,
      province: {
        id: provinceId,
        name: provinceName,
      },
      regency: {
        id: '',
        name: '',
      },
      district: {
        id: '',
        name: '',
      },
      village: {
        id: '',
        name: '',
      },
    }));
    fetchRegions<Regency>('regencies', setRegencies, provinceId);
    setDistricts([]);
    setVillages([]);
  }

  function handleRegencyChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const regencyId = event.target.value;
    const regencyName = event.target.dataset.regencyName!;

    setLocation((prev) => ({
      ...prev,
      regency: {
        id: regencyId,
        name: regencyName,
      },
      district: {
        id: '',
        name: '',
      },
      village: {
        id: '',
        name: '',
      },
    }));
    fetchRegions<District>('districts', setDistricts, regencyId);
    setVillages([]);
  }

  function handleDistrictChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const districtId = event.target.value;
    const districtName = event.target.dataset.districtName!;

    setLocation((prev) => ({
      ...prev,
      district: {
        id: districtId,
        name: districtName,
      },
      village: {
        id: '',
        name: '',
      },
    }));
    fetchRegions<Village>('villages', setVillages, districtId);
  }

  function handleVillageChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const villageId = event.target.value;
    const villageName = event.target.dataset.villageName!;

    setLocation((prev) => ({
      ...prev,
      village: {
        id: villageId,
        name: villageName,
      },
    }));
  }

  function handleResetFilter() {
    setLocation(() => ({
      province: {
        id: '',
        name: '',
      },
      regency: {
        id: '',
        name: '',
      },
      district: {
        id: '',
        name: '',
      },
      village: {
        id: '',
        name: '',
      },
    }));
  }

  useEffect(() => {
    if (provinces.length === 0) {
      fetchRegions<Province>('provinces', setProvinces);
    }
  }, [provinces.length]);

  return (
    <aside
      className={`${
        isSearchFilterVisible ? 'left-0' : '-left-full'
      } transition-all px-10 fixed  flex flex-col justify-start items-center py-20 gap-y-5 bg-secondary h-[110vh] z-10 top-[-10vh] pt-[calc(25vh)]`}
    >
      <h1 className='font-bold font-mono text-xl'>Filter Pencarian</h1>
      <form
        action=''
        className='flex justify-center items-center flex-col gap-y-6 relative'
      >
        <MdClose
          onClick={() => setIsSearchFilterVisible((prev) => !prev)}
          className='hover:scale-90 hover:font-bold absolute -right-6 -top-20 hover:cursor-pointer'
          size={24}
        />
        <div className='flex justify-center items-center flex-col gap-y-4'>
          {/* Province */}
          <select
            className='select-region'
            name='Provinsi'
            id='Provinsi'
            value={location.province.id}
            data-provinceName={location.province.name}
            onChange={handleProvinceChange}
          >
            <option value=''>Provinsi</option>
            {provinces.map((province) => (
              <option key={province.id} value={province.id}>
                {province.name}
              </option>
            ))}
          </select>

          {/* Regency */}
          <select
            className='select-region'
            name='Kabupaten/Kota'
            id='Kabupaten/Kota'
            value={location.regency.id}
            data-regencyName={location.regency.name}
            onChange={handleRegencyChange}
            disabled={!location.province.id}
          >
            <option value=''>Kabupaten/Kota</option>
            {regencies.map((regency) => (
              <option key={regency.id} value={regency.id}>
                {regency.name}
              </option>
            ))}
          </select>

          {/* District */}
          <select
            className='select-region'
            name='Kecamatan'
            id='Kecamatan'
            value={location.district.id}
            data-districtName={location.district.name}
            onChange={handleDistrictChange}
            disabled={!location.regency.id}
          >
            <option value=''>Kecamatan</option>
            {districts.map((district) => (
              <option key={district.id} value={district.id}>
                {district.name}
              </option>
            ))}
          </select>

          {/* Village */}
          <select
            className='select-region'
            name='Desa/Kelurahan'
            id='Desa/Kelurahan'
            value={location.village.id}
            data-villageName={location.village.name}
            onChange={handleVillageChange}
            disabled={!location.district.id}
          >
            <option value=''>Desa/Kelurahan</option>
            {villages.map((village) => (
              <option key={village.id} value={village.id}>
                {village.name}
              </option>
            ))}
          </select>
        </div>

        <div className='grid grid-cols-2 gap-x-6'>
          <button
            type='button'
            onClick={handleResetFilter}
            className='font-bold [box-shadow:2px_2px_0_0_black] bg-accent text-primary p-1 rounded-sm active:scale-95 hover:grayscale-[0] grayscale-[50%]'
          >
            Reset
          </button>
          <button className='[box-shadow:2px_2px_0_0_black] bg-none border text-black border-accent  p-1 rounded-sm active:scale-95 hover:grayscale-[0] grayscale-[50%]'>
            Terapkan
          </button>
        </div>
      </form>
    </aside>
  );
}
