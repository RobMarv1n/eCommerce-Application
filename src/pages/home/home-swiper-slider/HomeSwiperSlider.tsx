import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import image1 from './assets/home-image-1.png';
import image2 from './assets/home-image-2.png';
import image3 from './assets/home-image-3.png';
import './home-swiper-slider.css';
import { useState } from 'react';

const data = [
  { image: image1, discount: 10 },
  { image: image2, discount: 15 },
  { image: image3, discount: 20 },
];

export function HomeSwiperSlider() {
  const [slideIndex, setSlideIndex] = useState(0);

  return (
    <div className="home-slider-wrapper">
      <div className="home-slider">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          initialSlide={slideIndex}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          onActiveIndexChange={() => {
            setSlideIndex((previous) => (previous + 1) % 3);
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="home-slide">
                <img src={item.image} />
                <div className="home-discount">
                  <span className="home-discount-value">{item.discount}%</span>
                  <span>off</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {
        <div className="home-code">
          code: discount-{data[slideIndex].discount}
        </div>
      }
    </div>
  );
}
