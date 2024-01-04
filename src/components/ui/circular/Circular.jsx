import { CircularProgress } from '@/lib/mui';

const Circular = () => {
    return (
        <div className='fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'>
            <CircularProgress />
        </div>
    );
};

export default Circular;
