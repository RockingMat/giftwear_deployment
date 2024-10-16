import React, { useEffect } from 'react';
import Item from './Item';
import { gsap } from 'gsap';
import "../../style.scss";
// import Swiper core and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Controller, Virtual } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import 'swiper/css/navigation';
import 'swiper/css/virtual';
import { slide } from '../Interfaces/Item';

interface ItemListProps {
  name: string;
  items: slide[];
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  height: number;
  controlledSwiper?: any;
  setControlledSwiper?: (swiper: any) => void;
}

const ItemList: React.FC<ItemListProps> = ({name, items, activeIndex, setActiveIndex, height, controlledSwiper, setControlledSwiper}) => {
  
  useEffect(() => {
    handleClick(activeIndex);
  }, [activeIndex]);
  
  const handleClick = (index: number) => {
    setActiveIndex(index);
    items.forEach((_, idx) => {
      const itemClass = `.${name}-item-${idx + 1}`;
      const isSelected = index === idx;

      gsap.to(itemClass, {
        duration: 2,
        scale: isSelected ? 1 : 0.8,
        ease: 'elastic.out(1, 0.85)',
      });
      gsap.to(itemClass, {
        duration: 0,
        filter: isSelected ? 'blur(0)' : 'blur(10px)',
      });
    });
  }
  return (
    <Swiper
      className={`w-full mx-auto overflow-visible`}
      style={{ maxHeight: `${height}rem` }}
      modules={[Virtual, Controller]}
      spaceBetween={30}
      slidesPerView={3}
      speed={600}
      centeredSlides={true}
      virtual
      {...(controlledSwiper ? { controller: { control: controlledSwiper } } : {})}
      {...(setControlledSwiper ? { onSwiper: setControlledSwiper } : {})}
    >
      {items.map((item, index) => {
        return (
          <SwiperSlide key={index} virtualIndex={index}>
            <Item
              src={item.image}
              index={index}
              alt={item.name}
              height={height}
              customClass={`${name}-item-${index + 1} ${
                index === activeIndex ? '' : 'blur-md scale-90'
              }`}
              onClick={() => setActiveIndex(index)}
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );     
};

export default ItemList;
