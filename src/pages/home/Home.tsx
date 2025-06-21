import { useNavigate } from 'react-router-dom';
import { Button } from '../../shared/ui/Button';
import { ArrowIcon } from '../../shared/ui/Icon/ArrowIcon';
import { HomeSwiperSlider } from './home-swiper-slider/HomeSwiperSlider';
import './home.css';
import { ROUTES } from '../../types';

export function Home() {
  const navigate = useNavigate();

  return (
    <>
      <section className="home container">
        <HomeSwiperSlider />
        <div className="home-content">
          <div className="home-title">
            <p className="home-welcome">welcome to shopery</p>
            <h1 className="home-header">Fresh & Health Organic Food</h1>
          </div>
          <Button onClick={() => navigate(ROUTES.CATALOG)}>
            Shop now <ArrowIcon />
          </Button>
        </div>
      </section>
    </>
  );
}
