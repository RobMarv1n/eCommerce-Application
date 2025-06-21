import { useState } from 'react';
import { toast } from 'sonner';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { ClipboardIcon } from '../../../shared/ui/Icon/ClipboardIcon';
import image1 from './assets/home-image-1.png';
import image2 from './assets/home-image-2.png';
import image3 from './assets/home-image-3.png';
import './home-swiper-slider.css';

const data = [
  { image: image1, discount: 10 },
  { image: image2, discount: 15 },
  { image: image3, discount: 20 },
];

const bodyCode = 'DISCOUNT-';

export function HomeSwiperSlider() {
  const [slideIndex, setSlideIndex] = useState(0);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `${bodyCode}${data[slideIndex].discount}`
      );
      toast.success('Code is copied to the buffer');
    } catch {
      toast.error("Couldn't copy the code");
    }
  };

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
          onActiveIndexChange={(swiper) => {
            setSlideIndex(swiper.realIndex);
          }}
          grabCursor={true}
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
          <span>
            code: {bodyCode}
            {data[slideIndex].discount}
          </span>
          <span className="home-code-icon" onClick={copyToClipboard}>
            <ClipboardIcon color="var(--color-gray-5)" />
          </span>
        </div>
      }
    </div>
  );
}
