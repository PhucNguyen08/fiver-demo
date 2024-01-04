'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import GigCard from '@/components/gigCard/GigCard';
import { HiOutlineHome } from 'react-icons/hi';
import { Breadcrumbs, Grid } from '@/lib/mui';
import { TiArrowSortedDown } from 'react-icons/ti';
import { dataSortedBy } from '@/data/data';
import { useState } from 'react';
import { MdOutlineDone } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import newRequest from '@/utils/axios-utils';

const Gigs = () => {
    const [sortedBy, setSortedBy] = useState(dataSortedBy[1].sort);
    const [toggleMenu, setToggleMenu] = useState(false);
    const minRef = useRef();
    const maxRef = useRef();

    const searchParams = useSearchParams();

    const { isLoading, data, error, refetch } = useQuery({
        queryKey: ['gigs'],
        queryFn: () =>
            newRequest
                .get(
                    `/gigs?${searchParams.toString()}&min=${
                        minRef.current.value
                    }&max=${maxRef.current.value}&sort=${sortedBy}`
                )
                .then(res => res.data),
    });

    const handleSortedBy = value => {
        setSortedBy(value);
        setToggleMenu(false);
    };

    const handleToggleMenu = () => {
        setToggleMenu(prev => !prev);
    };

    const handleApply = () => {
        refetch();
    };

    useEffect(() => {
        refetch();
    }, [sortedBy]);

    return (
        <div className='border border-solid border-[#e4e5e7]'>
            <div className='w-[1400px] mx-auto'>
                <div className='py-5'>
                    <Breadcrumbs aria-label='breadcrumb'>
                        <Link href={'/'}>
                            <HiOutlineHome />
                        </Link>
                        <Link
                            href={'#'}
                            className='hover:underline text-gray-800 text-base font-medium'>
                            Graphics & Design
                        </Link>
                    </Breadcrumbs>
                    <h3 className='font-bold text-3xl py-5'>AI Artists</h3>
                    <p className='text-greyish text-base font-medium'>
                        Explore the boundaries of art and technology with
                        Fiverr's AI artists
                    </p>
                    <div className='py-3 flex justify-between items-center h-20'>
                        <div className='flex gap-2'>
                            <span>Budget</span>
                            <input
                                type='text'
                                placeholder='min'
                                ref={minRef}
                                className='border border-solid border-[#e4e5e7] outline-0 px-3'
                            />
                            <input
                                type='text'
                                placeholder='max'
                                ref={maxRef}
                                className='border border-solid border-[#e4e5e7] outline-0 px-3'
                            />
                            <button
                                onClick={handleApply}
                                className='w-fit cursor-pointer px-5 rounded bg-[#1dbf73] hover:bg-[#19a463] text-white'>
                                Apply
                            </button>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <span>Sort by:</span>
                            <div className='flex gap-2 items-center py-[10px] bg-white-300 rounded-md cursor-pointer px-2 font-medium relative'>
                                <span onClick={handleToggleMenu}>
                                    {sortedBy === 'sales'
                                        ? 'Best Selling'
                                        : 'Newest'}
                                </span>
                                <TiArrowSortedDown />
                                {toggleMenu && (
                                    <div className='absolute top-[115%] right-0 bg-white border border-solid border-[#e4e5e7] rounded-xl p-6 w-60'>
                                        <ul className='flex flex-col gap-2'>
                                            {dataSortedBy.map(item => (
                                                <li
                                                    onClick={() =>
                                                        handleSortedBy(
                                                            item.sort
                                                        )
                                                    }
                                                    key={item.id}
                                                    className='flex gap-3 items-center hover:bg-white-300 hover:rounded-md py-2'>
                                                    <span className='w-4 h-4'>
                                                        {item.sort ===
                                                        sortedBy ? (
                                                            <MdOutlineDone />
                                                        ) : (
                                                            ''
                                                        )}
                                                    </span>
                                                    <span>{item.text}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <Grid container spacing={4}>
                            {isLoading
                                ? 'Loading...'
                                : error
                                ? 'Something went wrong'
                                : data.map(gig => (
                                      <Grid item key={gig._id} xl={3}>
                                          <GigCard item={gig} />
                                      </Grid>
                                  ))}
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gigs;
