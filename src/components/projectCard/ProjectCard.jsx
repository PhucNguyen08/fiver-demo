import Link from 'next/link';
import { Avatar } from '@/lib/mui';

const ProjectCard = ({ item }) => {
    return (
        <Link href={'#'} className='overflow-hidden'>
            <div className='h-72 rounded-lg w-[310px] shadow-card cursor-pointer overflow-hidden'>
                <img
                    src={item.img}
                    alt={item.cat}
                    className='w-full h-[70%] object-cover'
                />
                <div className='flex gap-3 items-center bg-white px-4 pb-4'>
                    <Avatar src={item.pp} alt={item.username} />
                    <div className='flex flex-col gap-1 pt-4'>
                        <h3>{item.cat}</h3>
                        <p>By {item.username}</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;
