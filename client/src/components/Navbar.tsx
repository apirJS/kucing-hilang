import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaPaw } from 'react-icons/fa6';
import { IoSearch } from 'react-icons/io5';

export default function Navbar() {
  const pathName = usePathname();
  return (
    <nav className='md:flex justify-center items-center  text-base lg:text-lg font hidden'>
      <ul className='flex justify-center items-center gap-x-10'>
        <li>
          <Link href='/' className='flex justify-center items-center gap-x-1'>
            {pathName === '/' && <FaPaw size={12} />}
            <span>Home</span>
          </Link>
        </li>
        <li className='flex gap-x-[2px] items-center justify-center'>
          <Link
            href='/kucing-hilang'
            className='flex justify-center items-center gap-x-1'
          >
            {pathName === '/kucing-hilang' && <FaPaw size={12} />}
            <span>Kucing Hilang</span>
          </Link>
          <IoSearch size={12} />
        </li>
        <li className='flex gap-x-[2px] items-center justify-center'>
          <Link
            href='/kucing-ditemukan'
            className='flex justify-center items-center gap-x-1'
          >
            {pathName === '/kucing-ditemukan' && <FaPaw size={14} />}
            <span>Kucing Ditemukan</span>
          </Link>
          <IoSearch size={12} />
        </li>
      </ul>
    </nav>
  );
}
