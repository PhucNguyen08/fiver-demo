import { Grid } from '@/lib/mui';
import Wrapper from '../../ui/wrapper/Wrapper';
import Link from 'next/link';
import { dataFooter } from '@/data/data';
import LogoFooter from '../../logo/LogoFooter';
import {
    FaTwitter,
    FaFacebook,
    FaLinkedin,
    FaPinterest,
    FaInstagram,
} from 'react-icons/fa';
import { TfiWorld } from 'react-icons/tfi';
import { RxAccessibility } from 'react-icons/rx';

const Footer = () => {
    return (
        <div className=' bg-white pt-20 border border-solid border-[#e4e5e7]'>
            <Wrapper className='flex-col gap-5'>
                <Grid container>
                    {dataFooter.map(data => (
                        <Grid xl={3} key={data.id}>
                            <h2 className='text-base font-semibold'>
                                {data.title}
                            </h2>
                            <ul className='flex flex-col gap-4 pt-5'>
                                {data.items.map((item, i) => (
                                    <li key={i}>
                                        <Link
                                            href={item.url}
                                            className='text-greyish font-medium text-base hover:underline'>
                                            {item.text}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Grid>
                    ))}
                </Grid>
                <div className='flex justify-between border-t py-3 border-solid border-[#e4e5e7]'>
                    <div className='flex gap-2 items-center'>
                        <LogoFooter />
                        <span>&copy; Fiverr International Ltd. 2023</span>
                    </div>
                    <div className='flex gap-4 items-center'>
                        <div className='flex gap-4'>
                            <span>
                                <FaTwitter className='text-2xl' />
                            </span>
                            <span>
                                <FaFacebook className='text-2xl' />
                            </span>
                            <span>
                                <FaLinkedin className='text-2xl' />
                            </span>
                            <span>
                                <FaPinterest className='text-2xl' />
                            </span>
                            <span>
                                <FaInstagram className='text-2xl' />
                            </span>
                        </div>
                        <button className='flex items-center gap-2 hover:rounded-3xl font-medium p-2 cursor-pointer hover:bg-white-300 hover:text-gray-800'>
                            <TfiWorld />
                            English
                        </button>
                        <button className='flex items-center gap-2 hover:rounded-3xl font-medium p-2 cursor-pointer hover:bg-white-300 hover:text-gray-800'>
                            US$ USD
                        </button>
                        <button className='flex items-center gap-2 hover:rounded-3xl font-medium p-2 cursor-pointer hover:bg-white-300 hover:text-gray-800'>
                            <RxAccessibility className='text-3xl' />
                        </button>
                    </div>
                </div>
            </Wrapper>
        </div>
    );
};

export default Footer;
