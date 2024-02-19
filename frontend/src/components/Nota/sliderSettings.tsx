import { CSSProperties, MouseEventHandler } from "react";
import { Settings } from "react-slick";

interface IProps<T> {
 className?: string | undefined;
 style?: CSSProperties | undefined;
 onClick?: MouseEventHandler<T> | undefined;
}

const settings: Settings = {
  // adaptiveHeight: true,
  // dots: true,
  // arrows: true,
  infinite: true,
  swipe: false,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  // centerPadding: "20px",
  centerMode: true,
  className: "center",
  focusOnSelect: true,
  initialSlide: 0,
  nextArrow: <li>cres</li>,
  prevArrow: <li>descres</li>,

  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export default settings;
