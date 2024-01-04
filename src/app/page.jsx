import Featured from '@/components/featured/Featured';
import TrustedBy from '@/components/trustedBy/TrustedBy';
import Slide from '@/components/slide/Slide';
import { cards, projects } from '@/data/data';
import CatCard from '@/components/catCard/CatCard';
import { BsCheckCircle } from 'react-icons/bs';
import Wrapper from '@/components/ui/wrapper/Wrapper';
import { dataFeatures } from '@/data/data';
import Button from '@/components/ui/button/Button';
import ProjectCard from '@/components/projectCard/ProjectCard';

export default function Home() {
    return (
        <>
            <Featured />
            <TrustedBy />
            <div className={'bg-[#fafafa] py-20'}>
                <div className='w-[1400px] mx-auto'>
                    <h3 className='pb-8 text-3xl font-semibold'>
                        Popular services
                    </h3>
                    <Slide
                        slidesToShow={5}
                        slidesToScroll={5}
                        responsive={[
                            {
                                breakpoint: 1200,
                                settings: {
                                    slidesToShow: 4,
                                    slidesToScroll: 4,
                                },
                            },
                            {
                                breakpoint: 900,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3,
                                },
                            },
                            {
                                breakpoint: 700,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                },
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                },
                            },
                        ]}>
                        {cards.map(card => (
                            <CatCard key={card.id} item={card} />
                        ))}
                    </Slide>
                </div>
            </div>
            <div className='bg-[#fafafa] py-20'>
                <Wrapper>
                    <div className='flex-auto font-medium flex flex-col gap-5 pr-36 w-6/12'>
                        <h2 className='text-3xl font-bold'>
                            The Best Part? Everything.
                        </h2>
                        {dataFeatures.map(item => (
                            <div className='text-lg' key={item.id}>
                                <h6 className='flex items-center gap-3'>
                                    <BsCheckCircle className='text-xl' />
                                    <span className='font-semibold'>
                                        {item.title}
                                    </span>
                                </h6>
                                <p className='text-[#62646A] leading-[1.6] tracking-wide'>
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                    <div className='flex-auto w-7/12 px-4'>
                        <img
                            src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_700,dpr_1.0/v1/attachments/generic_asset/asset/089e3bb9352f90802ad07ad9f6a4a450-1599517407052/selling-proposition-still-1400-x1.png'
                            alt='img'
                            className='w-full object-cover'
                        />
                    </div>
                </Wrapper>
            </div>
            <div className='bg-[#0d084d] py-20 text-white'>
                <Wrapper>
                    <div className='flex-auto font-medium flex flex-col gap-5 pr-36 w-6/12'>
                        <h2 className='text-2xl'>
                            <strong>fiverr</strong> business.
                        </h2>
                        <h2 className='text-3xl font-bold'>
                            A solution built for <i>business</i>
                        </h2>
                        <p className='text-lg'>
                            Upgrade to a curated experience to access vetted
                            talent and exclusive tools
                        </p>
                        <div className='flex flex-col gap-2 pb-8 pt-6'>
                            <div className='text-base'>
                                <h6 className='flex items-center gap-3'>
                                    <BsCheckCircle className='text-xl' />
                                    <span>Talent matching</span>
                                </h6>
                            </div>
                            <div className='text-base'>
                                <h6 className='flex items-center gap-3'>
                                    <BsCheckCircle className='text-xl' />
                                    <span>Dedicated account management</span>
                                </h6>
                            </div>
                            <div className='text-base'>
                                <h6 className='flex items-center gap-3'>
                                    <BsCheckCircle className='text-xl' />
                                    <span>Team collaboration tools</span>
                                </h6>
                            </div>
                            <div className='text-base'>
                                <h6 className='flex items-center gap-3'>
                                    <BsCheckCircle className='text-xl' />
                                    <span>Business payment solutions</span>
                                </h6>
                            </div>
                        </div>

                        <Button text='Explore Fiverr Business' />
                    </div>
                    <div className='flex-auto w-7/12 px-4'>
                        <img
                            src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624757/business-desktop-870-x1.png'
                            alt='img'
                            className='w-full object-cover'
                        />
                    </div>
                </Wrapper>
            </div>
            <div className={'bg-white py-20'}>
                <div className='w-[1400px] mx-auto'>
                    <h3 className='pb-8 text-3xl font-semibold'>
                        Inspiring work made on Fiverr
                    </h3>
                    <Slide
                        isWhite={false}
                        slidesToShow={4}
                        slidesToScroll={4}
                        responsive={[
                            {
                                breakpoint: 900,
                                settings: {
                                    slidesToShow: 3,
                                    slidesToScroll: 3,
                                },
                            },
                            {
                                breakpoint: 700,
                                settings: {
                                    slidesToShow: 2,
                                    slidesToScroll: 2,
                                },
                            },
                            {
                                breakpoint: 480,
                                settings: {
                                    slidesToShow: 1,
                                    slidesToScroll: 1,
                                },
                            },
                        ]}>
                        {projects.map(item => (
                            <ProjectCard key={item.id} item={item} />
                        ))}
                    </Slide>
                </div>
            </div>
        </>
    );
}
