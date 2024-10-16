import React from 'react';
import 'swiper/css/pagination';
import "../../style.scss";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, Virtual } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import 'swiper/css/virtual';
import { product } from '../Interfaces/Item';
import CatalogItemCard from './CatalogItemCard';
import 'swiper/css/pagination';

import './styles.css';


interface ItemListProps {
  items: product[];
  onClick: () => void;
  setControlledSwiper: (swiper: any) => void;
  controlledSwiper: any;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;

}

const ItemInformation: React.FC<ItemListProps> = ({items, onClick, setControlledSwiper, controlledSwiper, setActiveIndex}) => {
  console.log(items);
  return (
    
    <Swiper
      //className={`w-full mx-auto overflow-visible border`}
      direction={'vertical'}
      autoplay={false}
      modules={[Virtual, Controller]}
      spaceBetween={30}
      slidesPerView={1}
      speed={100}
      centeredSlides={true}
      virtual
      onSwiper={setControlledSwiper}
      controller={{ control: controlledSwiper }}
      onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
    >
      {items.map((item, index) => {
        return (
          <SwiperSlide key={index} virtualIndex={index}>
            <CatalogItemCard
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onAddToCart={onClick}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
    // <Swiper
    //     direction={'vertical'}
    //     className="mySwiper"
    //   >
    //     <SwiperSlide>Slide 1</SwiperSlide>
    //     <SwiperSlide>Slide 2</SwiperSlide>
    //     <SwiperSlide>Slide 3</SwiperSlide>
    //     <SwiperSlide>Slide 4</SwiperSlide>
    //     <SwiperSlide>Slide 5</SwiperSlide>
    //     <SwiperSlide>Slide 6</SwiperSlide>
    //     <SwiperSlide>Slide 7</SwiperSlide>
    //     <SwiperSlide>Slide 8</SwiperSlide>
    //     <SwiperSlide>Slide 9</SwiperSlide>
    //   </Swiper>
  );     
};

export default ItemInformation;
