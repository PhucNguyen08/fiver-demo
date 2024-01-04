import React from 'react';
import { AiOutlineLike, AiOutlineDislike } from 'react-icons/ai';
import { Avatar, Rating } from '@/lib/mui';

const Review = ({ item }) => {
    return (
        <div className='flex gap-5 border-t border-solid border-[#ccc] py-5'>
            {item.userId.image ? (
                <Avatar
                    src={
                        'http://localhost:5000/public/img/' + item.userId.image
                    }
                />
            ) : (
                <Avatar src={'/img/noavatar.jpg'} />
            )}

            <div>
                <span className='text-lg font-semibold hover:underline cursor-pointer'>
                    {item.userId.username}
                </span>
                <div className='flex gap-2 items-center'>
                    <span className='text-sm text-[#62646a] font-medium'>
                        {item.userId.country}
                    </span>
                </div>
                <div className='flex gap-1 items-center'>
                    <Rating
                        name='readonly-rating'
                        value={item.star}
                        readOnly
                        size='small'
                    />
                    <span className='text-[#faaf00] font-semibold'>
                        {item.star}
                    </span>
                </div>
                <p className='text-gray-800 font-medium text-base py-3'>
                    {item.comment}
                </p>
                <div className='flex gap-3'>
                    <span>Helpful?</span>
                    <button className='flex gap-1 items-center'>
                        <AiOutlineLike />
                        <span>Yes</span>
                    </button>
                    <button className='flex gap-1 items-center'>
                        <AiOutlineDislike />
                        <span>No</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Review;
