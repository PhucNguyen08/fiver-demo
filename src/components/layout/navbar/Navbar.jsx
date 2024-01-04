'use client';
import { useEffect, useState } from 'react';
import Logo from '../../logo/Logo';
import Link from 'next/link';
import { Avatar } from '@mui/material';
import { usePathname } from 'next/navigation';
import { categoriesSearch } from '@/data/data';
import { useLogout } from '@/hooks/UseAuth';
import getCurrentUser from '@/utils/getCurrentUser';

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);
    const [isOpenMenu, setIsOpenMenu] = useState(false);

    const pathname = usePathname();

    const currentUser = getCurrentUser();

    const handleOpenToggle = () => {
        setIsOpenMenu(prev => !prev);
    };

    const { mutate } = useLogout();

    const handleScroll = () => {
        window.scrollY > 0 ? setIsActive(true) : setIsActive(false);
    };

    const handleLogout = () => {
        mutate();
        setIsOpenMenu(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header
                className={`sticky top-0 transition-all ease-linear z-40 ${
                    isActive || pathname !== '/'
                        ? 'bg-white text-black'
                        : 'bg-[#013914] text-white'
                }`}>
                <nav className='w-[1400px] flex mx-auto my-0 justify-between py-5 max-xl:w-auto max-xl:justify-center max-xl:align-center'>
                    <div className='flex items-center'>
                        <Link href={'/'}>
                            <Logo isScroll={isActive || pathname !== '/'} />
                        </Link>
                    </div>
                    <div className='flex gap-7 items-center max-xl:hidden'>
                        <Link href={'/'} className='text-base font-semibold'>
                            Fiverr Business
                        </Link>
                        <Link href={'/'} className='text-base font-semibold'>
                            Explore
                        </Link>
                        <Link href={'/'} className='text-base font-semibold'>
                            English
                        </Link>

                        {!currentUser?.isSeller && (
                            <Link
                                href={'/'}
                                className='text-base font-semibold'>
                                Become a Seller
                            </Link>
                        )}

                        {currentUser ? (
                            <div className='relative'>
                                <div
                                    onClick={handleOpenToggle}
                                    className='flex items-center justify-center gap-1 cursor-pointer'>
                                    {currentUser?.image ? (
                                        <>
                                            <Avatar
                                                alt={currentUser?.username}
                                                src={
                                                    'http://localhost:5000/public/img/' +
                                                    currentUser?.image
                                                }
                                            />
                                            <span>{currentUser?.username}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Avatar
                                                alt={currentUser?.username}
                                                src={'/img/noavatar.jpg'}
                                            />
                                            <span>{currentUser?.username}</span>
                                        </>
                                    )}
                                </div>
                                {isOpenMenu && (
                                    <div className='absolute top-12 right-0 bg-white text-gray-500 font-light drop-shadow-2xl rounded-md p-5'>
                                        <div className='flex flex-col gap-3 w-48'>
                                            {currentUser?.isSeller && (
                                                <>
                                                    <Link
                                                        href='/mygigs'
                                                        onClick={() =>
                                                            setIsOpenMenu(false)
                                                        }>
                                                        Gigs
                                                    </Link>
                                                    <Link
                                                        href='/add'
                                                        onClick={() =>
                                                            setIsOpenMenu(false)
                                                        }>
                                                        Add New Gig
                                                    </Link>
                                                </>
                                            )}
                                            <Link
                                                href='/orders'
                                                onClick={() =>
                                                    setIsOpenMenu(false)
                                                }>
                                                Orders
                                            </Link>
                                            <Link
                                                href='/messages'
                                                onClick={() =>
                                                    setIsOpenMenu(false)
                                                }>
                                                Messages
                                            </Link>
                                            <button
                                                className='w-fit'
                                                onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <>
                                <Link
                                    href={'/auth/login'}
                                    className='text-base font-semibold'>
                                    Sign In
                                </Link>
                                <Link
                                    href={'/auth/register'}
                                    className={`hover:bg-[#19a463] hover:border-[#1dbf73] hover:text-white py-[10px] px-4 border border-solid ${
                                        isActive || pathname !== '/'
                                            ? 'border-[#19a463] text-[#19a463]'
                                            : 'border-white text-white'
                                    } rounded cursor-pointer bg-transparent font-medium text-sm`}>
                                    Join
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
                {(isActive || pathname !== '/') && (
                    <div className='bg-white max-xl:hidden'>
                        <hr />
                        <nav className='w-[1400px] mx-auto py-[10px]'>
                            <ul className='flex gap-5 text-gray-500 font-medium'>
                                {categoriesSearch.map(category => (
                                    <li key={category.id}>
                                        <Link href={category.href}>
                                            {category.title}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <hr />
                    </div>
                )}
            </header>
        </>
    );
};

export default Navbar;
