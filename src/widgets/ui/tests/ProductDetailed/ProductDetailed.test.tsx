import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { ProductData } from '../../../../shared/api/clientApi/types';
import { ProductDetailed } from '../../ProductDetailed';

const mockProductData: ProductData = {
  id: '1',
  title: 'Product 1',
  images: ['image1.jpg', 'image2.jpg'],
  descriptionShort: 'Short description',
  descriptionFull: 'Full description',
  price: 19.99,
  discountedPrice: 14.99,
  categoryName: 'Category 1',
  rating: '4.5',
};

describe('Header component', () => {
  test('should render Header component', () => {
    render(<ProductDetailed product={mockProductData} />);

    expect(
      screen.getByRole('heading', { name: mockProductData.title })
    ).toBeInTheDocument();

    expect(
      screen.getByText(mockProductData.descriptionShort)
    ).toBeInTheDocument();

    expect(screen.getByText(`$${mockProductData.price}`)).toBeInTheDocument();

    expect(
      screen.getByText(`$${mockProductData.discountedPrice}`)
    ).toBeInTheDocument();

    expect(screen.getByText(mockProductData.categoryName));
  });
});
