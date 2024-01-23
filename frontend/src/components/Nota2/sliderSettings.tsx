import { CSSProperties, MouseEventHandler } from "react";
import { Settings } from "react-slick";

interface IProps<T> {
 className?: string | undefined;
 style?: CSSProperties | undefined;
 onClick?: MouseEventHandler<T> | undefined;
}

function NextArrow<T extends HTMLDivElement>(props: IProps<T>) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className + " arrow-vertical"}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

function PrevArrow<T extends HTMLDivElement>(props: IProps<T>) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className + " arrow-vertical"}
      style={{ ...style }}
      onClick={onClick}
    />
  );
}

const settings: Settings = {
  // adaptiveHeight: true,
  // dots: true,
  // arrows: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerMode: true,
  className: "center",
  // centerPadding: "20px",
  focusOnSelect: true,
  initialSlide: 0,
  // nextArrow: <li>cres</li>,
  // prevArrow: <li>descres</li>,
  
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  
  vertical: true,
  verticalSwiping: true,
  swipeToSlide: true,

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
