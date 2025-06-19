import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';
import { SwiperSlider } from '../../ui/SwiperSlider/SwiperSlider';

describe('SwiperSlider component', () => {
  const images = ['image1.jpg', 'image2.jpg', 'image3.jpg'];
  const onImageClick = vi.fn();

  test('should render a single image when images length is 1', () => {
    render(
      <SwiperSlider images={['single-image.jpg']} onImageClick={onImageClick} />
    );
    expect(screen.getByRole('img', { name: /product/i })).toBeInTheDocument();
  });

  test('should render multiple SwiperSlides when images length is greater than 1', () => {
    render(<SwiperSlider images={images} onImageClick={onImageClick} />);
    expect(screen.getAllByRole('img', { name: /product/i }).length).toBe(
      images.length
    );
  });

  test('should call onImageClick with correct index when an image is clicked', async () => {
    render(<SwiperSlider images={images} onImageClick={onImageClick} />);
    const user = userEvent.setup();

    await user.click(screen.getAllByRole('img', { name: /product/i })[0]);
    expect(onImageClick).toHaveBeenCalledWith(0);
  });
});
