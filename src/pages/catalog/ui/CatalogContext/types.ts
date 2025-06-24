export type CatalogContextValue = {
  categoryId: string;
  setCategoryId: (id: string) => void;
  ratingValue: string;
  setRatingValue: (value: string) => void;
  sliderMinValue: number;
  setSliderMinValue: (value: number) => void;
  sliderMaxValue: number;
  setSliderMaxValue: (value: number) => void;
  minValue: number;
  setMinValue: (value: number) => void;
  maxValue: number;
  setMaxValue: (value: number) => void;
  minInput: number;
  setMinInput: (value: number) => void;
  maxInput: number;
  setMaxInput: (value: number) => void;
  resetFilters: () => void;
};

export enum CatalogDefaultValue {
  CATEGORY_ID = 'all',
  RATING = '1',
  MIN_PRICE = 0,
  MAX_PRICE = 100,
}
