import { createContext, useContext } from 'react';
import { CatalogContextValue, CatalogDefaultValue } from './types';

const defaultCatalogContext: CatalogContextValue = {
  categoryId: String(CatalogDefaultValue.CATEGORY_ID),
  setCategoryId: () => {},
  ratingValue: String(CatalogDefaultValue.RATING),
  setRatingValue: () => {},
  sliderMinValue: Number(CatalogDefaultValue.MIN_PRICE),
  setSliderMinValue: () => {},
  sliderMaxValue: Number(CatalogDefaultValue.MAX_PRICE),
  setSliderMaxValue: () => {},
  minValue: Number(CatalogDefaultValue.MIN_PRICE),
  setMinValue: () => {},
  maxValue: Number(CatalogDefaultValue.MAX_PRICE),
  setMaxValue: () => {},
  minInput: Number(CatalogDefaultValue.MIN_PRICE),
  setMinInput: () => {},
  maxInput: Number(CatalogDefaultValue.MAX_PRICE),
  setMaxInput: () => {},
  resetFilters: () => {},
};

export const CatalogContext = createContext(defaultCatalogContext);

export const useCatalogContext = () => useContext(CatalogContext);
