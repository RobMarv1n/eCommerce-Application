import { useEffect, useState } from 'react';
import { CatalogContext } from './CatalogContext';
import { CatalogContextValue, CatalogDefaultValue } from './types';
import { client } from '../../../../shared/api/clientApi/ClientApi';

type Properties = {
  children: React.ReactNode;
};

export function CatalogProvider({ children }: Properties) {
  const initialMinPrice = Number(CatalogDefaultValue.MIN_PRICE);
  const initialMaxPrice = Number(CatalogDefaultValue.MAX_PRICE);

  const [categoryId, setCategoryId] = useState(
    String(CatalogDefaultValue.CATEGORY_ID)
  );

  const [ratingValue, setRatingValue] = useState(
    String(CatalogDefaultValue.RATING)
  );

  const [sliderMinValue, setSliderMinValue] = useState(initialMinPrice);
  const [sliderMaxValue, setSliderMaxValue] = useState(initialMaxPrice);

  const [minValue, setMinValue] = useState(initialMinPrice);
  const [maxValue, setMaxValue] = useState(initialMaxPrice);
  const [minInput, setMinInput] = useState(initialMinPrice);
  const [maxInput, setMaxInput] = useState(initialMaxPrice);

  async function getMinMaxPrice() {
    await client.productApi.getMinMaxPrice();
    const min = Math.floor(client.productApi.priceRange.min / 100);
    const max = Math.ceil(client.productApi.priceRange.max / 100);
    setSliderMaxValue(max);
    setMaxInput(max);
    setMaxValue(max);
    setSliderMinValue(min);
    setMinValue(min);
    setMinInput(min);
  }

  async function resetFilters() {
    setCategoryId(CatalogDefaultValue.CATEGORY_ID);
    client.productApi.currentCategoryId = CatalogDefaultValue.CATEGORY_ID;

    setMinValue(sliderMinValue);
    setMaxValue(sliderMaxValue);
    setMinInput(sliderMinValue);
    setMaxInput(sliderMaxValue);
    client.productApi.priceRange = {
      min: sliderMinValue * 100,
      max: sliderMaxValue * 100,
    };

    setRatingValue('1');
    client.productApi.minRating = '1';
  }

  useEffect(() => {
    getMinMaxPrice();
  }, []);

  const value: CatalogContextValue = {
    categoryId,
    setCategoryId: (id) => setCategoryId(id),
    ratingValue,
    setRatingValue: (value) => setRatingValue(value),
    sliderMinValue,
    setSliderMinValue: (value) => setSliderMinValue(value),
    sliderMaxValue,
    setSliderMaxValue: (value) => setSliderMaxValue(value),
    minValue,
    setMinValue: (value) => setMinValue(value),
    maxValue,
    setMaxValue: (value) => setMaxValue(value),
    minInput,
    setMinInput: (value) => setMinInput(value),
    maxInput,
    setMaxInput: (value) => setMaxInput(value),
    resetFilters,
  };

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}
