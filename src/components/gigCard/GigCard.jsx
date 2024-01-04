import { Avatar } from '@/lib/mui';
import Link from 'next/link';
import { AiFillStar } from 'react-icons/ai';

const GigCard = ({ item }) => {
    return (
        <div className='h-[400px]'>
            <Link href={`/gig/${item._id}`}>
                <img
                    src={'http://localhost:5000/public/img/' + item.images[0]}
                    className='rounded-2xl w-full h-1/2 object-cover'
                    alt={'img'}
                />
            </Link>

            <div className='p-3 flex flex-col gap-4'>
                <div className='flex items-center gap-2'>
                    {item.userId.image ? (
                        <Avatar
                            src={
                                'http://localhost:5000/public/img/' +
                                item.userId.image
                            }
                            sx={{ width: 24, height: 24 }}
                        />
                    ) : (
                        <Avatar
                            src={'/img/noavatar.jpg'}
                            sx={{ width: 24, height: 24 }}
                        />
                    )}

                    <span className='font-bold'>{item.userId.username}</span>
                </div>
                <Link href={`/gig/${item._id}`}>
                    <p className='line-clamp-2 h-12 max-h-12 hover:underline'>
                        {item.desc}
                    </p>
                </Link>
                <div className='flex gap-2 items-center'>
                    <AiFillStar className='font-bold' />
                    <span className='font-bold'>
                        {item.starNumber.toFixed(1)}
                    </span>
                    <span>&#40;{item.totalRating}&#41;</span>
                </div>
                <div>
                    <span className='font-bold'>From US${item.price}</span>
                </div>
            </div>
        </div>
    );
};

export default GigCard;
