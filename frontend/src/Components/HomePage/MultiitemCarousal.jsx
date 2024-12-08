import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { TopMeal } from "./TopMeel";
import { Carouselitem } from "./Carousalitem";

const MultiitemCarousal = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
      };
    return (
        <div>
            <Slider {...settings}>
                {TopMeal.map((item)=><Carouselitem image = {item.image} title={item.title}/>)}
            </Slider>
        </div>
    )
}
export default MultiitemCarousal;