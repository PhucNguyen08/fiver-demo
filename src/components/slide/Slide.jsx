'use client';
import Slider from 'react-slick';
import { ArrowLeft, ArrowRight } from '../ui/arrow/Arrow';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Slide = ({ children, slidesToShow, slidesToScroll, responsive }) => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: slidesToShow,
        nextArrow: <ArrowRight />,
        prevArrow: <ArrowLeft />,
        slidesToScroll: slidesToScroll,
        responsive: responsive,
    };

    return <Slider {...settings}>{children}</Slider>;
};

export default Slide;
