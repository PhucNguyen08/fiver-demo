'use client';
import { useState } from 'react';
import { Grid, Breadcrumbs, Avatar, Rating, Divider } from '@/lib/mui';
import Link from 'next/link';
import Slider from 'react-slick';
import { ArrowLeft, ArrowRight } from '@/components/ui/arrow/Arrow';
import { dataTabs } from '@/data/data';
import { TbClockHour3 } from 'react-icons/tb';
import { HiArrowRight } from 'react-icons/hi';
import { HiOutlineArrowPath } from 'react-icons/hi2';
import { MdOutlineDone } from 'react-icons/md';
import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import getGig from './gigService';
import { formatMonthYear } from '@/utils/Formatter';
import Reviews from '@/components/reviews/Reviews';

function loadScript(src) {
    return new Promise(resolve => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

const Gig = () => {
    const [tab, setTab] = useState(1);

    const { id } = useParams();

    const { isLoading, data, error } = useQuery({
        queryKey: ['gig', id],
        queryFn: () => getGig(id),
    });

    // async function displayRazorpay() {
    //     const res = await loadScript(
    //         'https://checkout.razorpay.com/v1/checkout.js'
    //     );

    //     if (!res) {
    //         alert('Razorpay SDK failed to load. Are you online?');
    //         return;
    //     }

    //     const data = await fetch('http://localhost:1337/razorpay', {
    //         method: 'POST',
    //     }).then(t => t.json());

    //     console.log(data);

    //     var options = {
    //         key: 'rzp_test_DLCNeRkeK07RzO', // Enter the Key ID generated from the Dashboard
    //         amount: '1000',
    //         currency: 'INR',
    //         description: 'Order',
    //         image: 'https://s3.amazonaws.com/rzp-mobile/images/rzp.jpg',
    //         prefill: {
    //             email: 'gaurav.kumar@example.com',
    //             contact: +919900000000,
    //         },
    //         config: {
    //             display: {
    //                 blocks: {
    //                     utib: {
    //                         //name for Axis block
    //                         name: 'Pay using Axis Bank',
    //                         instruments: [
    //                             {
    //                                 method: 'card',
    //                                 issuers: ['UTIB'],
    //                             },
    //                             {
    //                                 method: 'netbanking',
    //                                 banks: ['UTIB'],
    //                             },
    //                         ],
    //                     },
    //                     other: {
    //                         //  name for other block
    //                         name: 'Other Payment modes',
    //                         instruments: [
    //                             {
    //                                 method: 'card',
    //                                 issuers: ['ICIC'],
    //                             },
    //                             {
    //                                 method: 'netbanking',
    //                             },
    //                         ],
    //                     },
    //                 },
    //                 hide: [
    //                     {
    //                         method: 'upi',
    //                     },
    //                 ],
    //                 sequence: ['block.utib', 'block.other'],
    //                 preferences: {
    //                     show_default_blocks: false, // Should Checkout show its default blocks?
    //                 },
    //             },
    //         },
    //         handler: function (response) {
    //             alert(response.razorpay_payment_id);
    //         },
    //         modal: {
    //             ondismiss: function () {
    //                 if (confirm('Are you sure, you want to close the form?')) {
    //                     txt = 'You pressed OK!';
    //                     console.log('Checkout form closed by the user');
    //                 } else {
    //                     txt = 'You pressed Cancel!';
    //                     console.log('Complete the Payment');
    //                 }
    //             },
    //         },
    //     };

    //     const options = {
    //         key: __DEV__ ? 'rzp_test_DLCNeRkeK07RzO' : 'PRODUCTION_KEY',
    //         currency: data.currency,
    //         amount: data.amount.toString(),
    //         order_id: data.id,
    //         name: 'Donation',
    //         description: 'Thank you for nothing. Please give us some money',
    //         image: 'http://localhost:1337/logo.svg',
    //         handler: function (response) {
    //             alert(response.razorpay_payment_id);
    //             alert(response.razorpay_order_id);
    //             alert(response.razorpay_signature);
    //         },
    //         prefill: {
    //             name,
    //             email: 'sdfdsjfh2@ndsfdf.com',
    //             phone_number: '9899999999',
    //         },
    //     };
    //     const paymentObject = new window.Razorpay(options);
    //     paymentObject.open();
    // }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        nextArrow: <ArrowRight class={'!right-[-17px]'} />,
        prevArrow: <ArrowLeft />,
        slidesToScroll: 1,
    };

    return (
        <div className='w-default mx-auto'>
            {isLoading ? (
                'Loading...'
            ) : error ? (
                'Something went wrong'
            ) : (
                <div className='py-5'>
                    <Grid container>
                        <Grid xl={8}>
                            <div className='px-20'>
                                <Breadcrumbs>
                                    <Link
                                        href={'#'}
                                        className='text-[#446EE7] hover:underline font-medium'>
                                        Graphics & Design
                                    </Link>
                                    <Link
                                        href={'#'}
                                        className='text-[#446EE7]  hover:underline font-medium'>
                                        AI Artists{' '}
                                    </Link>
                                </Breadcrumbs>
                                <h3 className='text-3xl font-semibold py-2'>
                                    {data.title}
                                </h3>
                                <div className='flex gap-2 items-center'>
                                    {data.userId.image ? (
                                        <Avatar
                                            src={
                                                'http://localhost:5000/public/img/' +
                                                data.userId.image
                                            }
                                            sx={{
                                                width: '30px',
                                                height: '30px',
                                            }}
                                        />
                                    ) : (
                                        <Avatar
                                            src={'/img/noavatar.jpg'}
                                            sx={{
                                                width: '30px',
                                                height: '30px',
                                            }}
                                        />
                                    )}

                                    <span className='font-semibold text-base hover:underline'>
                                        {data.userId.username}
                                    </span>
                                    <div className='flex gap-1 items-center'>
                                        <Rating
                                            name='readonly-rating'
                                            value={data.starNumber}
                                            readOnly
                                        />
                                        <span className='text-[#faaf00] font-semibold'>
                                            {data.starNumber.toFixed(1)}
                                        </span>
                                        <span>({data.totalRating})</span>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <Slider {...settings}>
                                        {data.images.map((image, i) => (
                                            <img
                                                key={i}
                                                src={
                                                    'http://localhost:5000/public/img/' +
                                                    image
                                                }
                                                alt={'image'}
                                                className='object-contain w-full h-full'
                                            />
                                        ))}
                                    </Slider>
                                </div>
                                <h3 className='text-xl font-semibold py-10'>
                                    About this gig
                                </h3>
                                <p className='text-justify'>{data.desc}</p>
                                <Divider
                                    sx={{
                                        mt: '20px',
                                    }}
                                />
                                <h3 className='text-xl font-semibold py-5'>
                                    About the seller
                                </h3>
                                <div className='flex gap-5'>
                                    {data.userId.image ? (
                                        <Avatar
                                            src={
                                                'http://localhost:5000/public/img/' +
                                                data.userId.image
                                            }
                                            sx={{
                                                width: '110px',
                                                height: '110px',
                                            }}
                                        />
                                    ) : (
                                        <Avatar
                                            src={'/img/noavatar.jpg'}
                                            sx={{
                                                width: '110px',
                                                height: '110px',
                                            }}
                                        />
                                    )}

                                    <div className='flex flex-col gap-3'>
                                        <span className='text-lg font-semibold hover:underline cursor-pointer'>
                                            {data.userId.username}
                                        </span>
                                        <div className='flex gap-1 items-center'>
                                            <Rating
                                                name='readonly-rating'
                                                value={data.starNumber}
                                                readOnly
                                                size='small'
                                            />
                                            <span className='text-[#faaf00] font-semibold'>
                                                {data.starNumber.toFixed(1)}
                                            </span>
                                            <span>({data.totalRating})</span>
                                        </div>
                                        <button className='border border-solid border-black rounded py-2 px-5 text-[#62646a] hover:bg-[#74767e] cursor-pointer hover:text-white font-medium'>
                                            Contact me
                                        </button>
                                    </div>
                                </div>
                                <div className='mt-5 p-5 border border-solid border-[#0000001f] rounded'>
                                    <ul className='flex flex-wrap justify-between'>
                                        <li className='w-3/6 flex flex-col gap-1 py-2'>
                                            <span>Form</span>
                                            <span className='font-semibold'>
                                                {data.userId.country}
                                            </span>
                                        </li>
                                        <li className='w-3/6 flex flex-col gap-1 py-2'>
                                            <span>Avg. response time</span>
                                            <span className='font-semibold'>
                                                1 hours
                                            </span>
                                        </li>
                                        <li className='w-3/6 flex flex-col gap-1 py-2'>
                                            <span>Languages</span>
                                            <span className='font-semibold'>
                                                German, English
                                            </span>
                                        </li>
                                        <li className='w-3/6 flex flex-col gap-1 py-2'>
                                            <span>Member since</span>
                                            <span className='font-semibold'>
                                                {formatMonthYear(
                                                    data.userId.createdAt
                                                )}
                                            </span>
                                        </li>
                                        <li className='w-3/6 flex flex-col gap-1 py-2'>
                                            <span>Last delivery</span>
                                            <span className='font-semibold'>
                                                {data.deliveryTime}
                                            </span>
                                        </li>
                                    </ul>
                                    <Divider />
                                    <p className='pt-5 font-medium'>
                                        {data.userId.desc}
                                    </p>
                                </div>
                                <Reviews gigId={id} />
                            </div>
                        </Grid>
                        <Grid xl={4}>
                            <div className='border border-solid border-[#0000001f]'>
                                <div className='flex w-full'>
                                    {dataTabs.map(item => (
                                        <span
                                            onClick={() => setTab(item.id)}
                                            key={item.id}
                                            className={`p-5 flex-1 text-center font-semibold ${
                                                item.id !== 3
                                                    ? 'border-r border-solid border-[#0000001f]'
                                                    : ''
                                            } cursor-pointer ${
                                                tab === item.id
                                                    ? 'border-b-3 border-b-greenLight bg-white text-greenLight'
                                                    : 'bg-white-700 text-dark-gray'
                                            }`}>
                                            {item.text}
                                        </span>
                                    ))}
                                </div>
                                <div className='pt-8 px-5'>
                                    <div className='flex justify-between text-gray-800'>
                                        <h3 className='font-bold'>
                                            {tab === 1
                                                ? '10'
                                                : tab === 2
                                                ? '20'
                                                : '30'}{' '}
                                            HQ Artworks
                                        </h3>
                                        <span className='text-xl font-normal'>
                                            US$
                                            {tab === 1
                                                ? '175'
                                                : tab === 2
                                                ? '325'
                                                : '495'}
                                        </span>
                                    </div>
                                    <p className='py-8 text-sm font-medium text-gray-bold'>
                                        {tab === 1
                                            ? '10'
                                            : tab === 2
                                            ? '20'
                                            : '30'}{' '}
                                        high quality artworks, unique style, 1
                                        revision
                                    </p>
                                    <div className='pt-7 flex gap-4 items-center text-gray-bold text-sm'>
                                        <div className='flex items-center justify-center gap-2'>
                                            <TbClockHour3 className='text-base text-gray-bold' />
                                            <span className='font-semibold'>
                                                {tab === 1
                                                    ? '7'
                                                    : tab === 2
                                                    ? '10'
                                                    : '14'}{' '}
                                                Days Delivery
                                            </span>
                                        </div>
                                        <div className='flex items-center gap-2'>
                                            <HiOutlineArrowPath className='text-base text-gray-bold' />
                                            <span className='font-semibold'>
                                                1 Revision
                                            </span>
                                        </div>
                                    </div>
                                    <ul className='py-5'>
                                        <li className='flex items-center gap-2'>
                                            <MdOutlineDone className='text-greenLight' />
                                            <span className='text-sm text-lightGray font-medium'>
                                                Prompt creation
                                            </span>
                                        </li>
                                        <li className='flex items-center gap-2'>
                                            <MdOutlineDone className='text-greenLight' />
                                            <span className='text-sm text-lightGray font-medium'>
                                                Artwork delivery
                                            </span>
                                        </li>
                                    </ul>
                                    <button className='relative w-full bg-black text-white rounded-md py-2 text-base my-5 cursor-pointer font-semibold text-center hover:bg-gray-800'>
                                        Continue
                                        <HiArrowRight className='absolute top-1/2 -translate-y-2/4 right-8' />
                                    </button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            )}
        </div>
    );
};

export default Gig;
