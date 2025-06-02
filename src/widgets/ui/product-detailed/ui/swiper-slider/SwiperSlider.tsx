import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

interface SwiperSliderProperties {
  images: string[];
}

export function SwiperSlider({ images }: SwiperSliderProperties) {
  if (images.length === 1) {
    return <img src={images[0]} alt="product" />;
  }

  return (
    <>
      <Swiper
        modules={[Navigation, Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation
        loop={images.length > 1}
      >
        {images.map((source, index) => (
          <SwiperSlide key={index}>
            <img src={source} alt={`product-${index}`} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
