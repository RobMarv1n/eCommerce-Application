import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/swiper-bundle.css';

interface SwiperSliderProperties {
  images: string[];
  startIndex?: number;
  onImageClick?: (index: number) => void;
}

export function SwiperSlider({
  images,
  startIndex = 0,
  onImageClick,
}: SwiperSliderProperties) {
  if (images.length === 1) {
    return (
      <img src={images[0]} alt="product" onClick={() => onImageClick?.(0)} />
    );
  }

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      navigation
      initialSlide={startIndex}
      loop={images.length > 1}
    >
      {images.map((source, index) => (
        <SwiperSlide key={index}>
          <img
            src={source}
            alt={`product`}
            onClick={() => onImageClick?.(index)}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
