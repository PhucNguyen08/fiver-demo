'use client';
import { useState } from 'react';
import { MdOutlineSearch } from 'react-icons/md';
import Link from 'next/link';
import { dataPopular } from '@/data/data';
import { useRouter } from 'next/navigation';

const Featured = () => {
    const [valueInput, setValueInput] = useState('');

    const router = useRouter();

    const handleSubmit = () => {
        router.push('/gigs?search=' + valueInput);
    };

    return (
        <div className='h-[600px] bg-[#013914] text-white'>
            <div className='w-[1400px] mx-auto flex justify-center gap-32'>
                <div className='flex-1 flex flex-col gap-5 justify-center'>
                    <h1 className='font-semibold text-5xl leading-tight'>
                        Find the right <i>freelance service</i>, right away
                    </h1>
                    <div className='h-12 flex w-full justify-between'>
                        <input
                            type='text'
                            placeholder='Search for any service...'
                            className='rounded-tl rounded-bl border-none py-[10px] h-full px-4 w-full outline-0 text-black'
                            value={valueInput}
                            onChange={e => setValueInput(e.target.value)}
                        />
                        <button
                            onClick={handleSubmit}
                            className='px-6 bg-[#1dbf73] cursor-pointer h-full rounded-tr rounded-br hover:bg-[#19a463]'>
                            <MdOutlineSearch className='text-white text-xl' />
                        </button>
                    </div>
                    <div className='flex gap-4'>
                        <span>Popular:</span>
                        <ul className='flex gap-3'>
                            {dataPopular.map(item => (
                                <li key={item.id}>
                                    <Link
                                        href={item.href}
                                        className='font-semibold text-sm p-2 rounded-xl border border-white border-solid'>
                                        {item.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='flex-1'>
                    <img
                        src={'/img/man.png'}
                        alt='img'
                        className='object-contain h-full'
                    />
                </div>
            </div>
        </div>
    );
};

export default Featured;
