import Image from 'next/image';
import Link from 'next/link';
import StaffList from '../components/StaffList';
import UserList from '../components/UserList';


import Navbar from '@/components/navbar';
export default function Home() {
  return (
    <div>
      <div>
          <p className='text-4xl'>
            <Link href="/register" className='size-[100px]'>Go to Register Page</Link>
          </p>
      </div>
      <div>
          <p className='text-4xl'>
            <Link href="/login" className='size-[100px]'>Go to Login Page</Link>
          </p>
      </div>
        <UserList />
        <StaffList />
    </div>
  );
}

//INI CUMA BUAT COPAS AKU KE PAGE.TSX E, ini buat nunjuin all user and staff mbe login register page