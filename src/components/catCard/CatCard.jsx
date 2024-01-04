import Link from 'next/link';

const CatCard = ({ item }) => {
    return (
        <Link href={'/gigs?cat=design'}>
            <div className='relative cursor-pointer text-white h-80 w-60 max-lg::w-full'>
                <img
                    src={item.img}
                    alt={item.title}
                    className='w-full h-full object-cover hover:opacity-80'
                />
                <div className='absolute top-4 left-4 flex flex-col gap-3'>
                    <span className='text-base'>{item.desc}</span>
                    <h4 className='text-2xl font-bold'>{item.title}</h4>
                </div>
            </div>
        </Link>
    );
};

export default CatCard;
