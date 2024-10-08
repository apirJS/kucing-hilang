import Link from 'next/link';
import { FaGithub } from 'react-icons/fa6';

export default function Footer() {
  return (
    <footer className='h-[10vh] flex items-center px-10 font-mono'>
      <div className='opacity-75'>
        <span>© 2024 - Echa Apriliyanto</span>
        <div className='flex gap-x-1 items-center'>
          <FaGithub />
          <Link href='https://github.com/apirJS'>
          apirJS
          </Link>
        </div>
      </div>
    </footer>
  );
}
