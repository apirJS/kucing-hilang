import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoSearch} from 'react-icons/io5';
import { FaPaw } from 'react-icons/fa6';

interface Props {
  state: {
    isMobileMenuVisible: boolean;
    setIsMobileMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

export default function NavbarMobile({ state }: Props) {
  const pathName = usePathname();

  return (
    <nav
      className={` ${
        state.isMobileMenuVisible
          ? '-translate-y-0'
          : '-translate-y-[calc(100%+10vh)]'
      } text-lg flex justify-center absolute min-h-10 py-4 top-full inset-x-0 bg-accent transition`}
    >
      <ul className='flex flex-col justify-center items-center gap-x-10 gap-y-4'>
        <li onClick={() => state.setIsMobileMenuVisible(false)}>
          <Link href='/' className='flex justify-center items-center gap-x-1'>
            {pathName === '/' && <FaPaw size={12} />}
            <span>Home</span>
          </Link>
        </li>
        <li
          onClick={() => state.setIsMobileMenuVisible(false)}
          className='flex gap-x-[2px] items-center justify-center'
        >
          <Link
            href='/kucing-hilang'
            className='flex justify-center items-center gap-x-1'
          >
            {pathName === '/kucing-hilang' && <FaPaw size={12} />}
            <span>Kucing Hilang</span>
          </Link>
          <IoSearch size={10}/>
        </li>
        <li
          onClick={() => state.setIsMobileMenuVisible(false)}
          className='flex gap-x-[2px] items-center justify-center'
        >
          <Link
            href='/kucing-ditemukan'
            className='flex justify-center items-center gap-x-1'
          >
            {pathName === '/kucing-ditemukan' && <FaPaw size={12} />}
            <span>Kucing Ditemukan</span>
          </Link>
          <IoSearch size={10}/>
        </li>
      </ul>
    </nav>
  );
}
