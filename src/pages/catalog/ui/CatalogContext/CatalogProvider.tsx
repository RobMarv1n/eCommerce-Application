import { useState } from 'react';
import { CatalogContext } from './CatalogContext';
import { CatalogContextValue, CatalogDefaultValue } from './types';

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
  };

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}
