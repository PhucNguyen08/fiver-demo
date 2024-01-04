import { dataLogoBrand } from '@/data/data';

const TrustedBy = () => {
    return (
        <div className='bg-[#fafafa] flex justify-center'>
            <div className='w-[760px] mx-auto flex items-center justify-center gap-10'>
                <span className='font-semibold text-[#b5b6ba]'>
                    Trusted by:
                </span>
                {dataLogoBrand.map(item => (
                    <img key={item.id} src={item.url} alt={item.alt} />
                ))}
            </div>
        </div>
    );
};

export default TrustedBy;
