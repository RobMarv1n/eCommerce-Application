import { useState, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import './CatalogPriceFilter.css';
import { client } from '../../../../shared/api/clientApi/ClientApi';

type Properties = {
  updateRange: () => void;
};

export function CatalogPriceFilter({ updateRange }: Properties) {
  const initialMinPrice = 0;
  const initialMaxPrice = 100;

  const [sliderMinValue, setSliderMinValue] = useState(initialMinPrice);
  const [sliderMaxValue, setSliderMaxValue] = useState(initialMaxPrice);

  const [minValue, setMinValue] = useState(initialMinPrice);
  const [maxValue, setMaxValue] = useState(initialMaxPrice);
  const [minInput, setMinInput] = useState(initialMinPrice);
  const [maxInput, setMaxInput] = useState(initialMaxPrice);

  const [isDragging, setIsDragging] = useState(false);

  const minGap = 1;

  function slideMin(event: ChangeEvent<HTMLInputElement>) {
    const value = Number.parseInt(event.target.value, 10);
    if (value >= sliderMinValue && maxValue - value >= minGap) {
      setMinValue(value);
      setMinInput(value);
    }
  }

  function slideMax(event: ChangeEvent<HTMLInputElement>) {
    const value = Number.parseInt(event.target.value, 10);
    if (value <= sliderMaxValue && value - minValue >= minGap) {
      setMaxValue(value);
      setMaxInput(value);
    }
  }

  function setSliderTrack() {
    const range = document.querySelector('.slider-track');

    if (range instanceof HTMLElement) {
      const minPercent =
        ((minValue - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;
      const maxPercent =
        ((maxValue - sliderMinValue) / (sliderMaxValue - sliderMinValue)) * 100;

      range.style.left = `${minPercent}%`;
      range.style.right = `${100 - maxPercent}%`;
    }
  }

  async function getMinMaxPrice() {
    const results = await client.getMinMaxPrice();
    setSliderMaxValue(results.max);
    setMaxInput(results.max);
    setMaxValue(results.max);
    setSliderMinValue(results.min);
    setMinValue(results.min);
    setMinInput(results.min);
  }

  useEffect(() => {
    getMinMaxPrice();
  }, []);

  useEffect(() => {
    setSliderTrack();
  }, [minValue, maxValue]);

  function handleMinInput(event: ChangeEvent<HTMLInputElement>) {
    const value =
      event.target.value === ''
        ? sliderMinValue
        : Number.parseInt(event.target.value, 10);
    if (value >= sliderMinValue && value < maxValue - minGap) {
      setMinInput(value);
      setMinValue(value);
    }
  }

  function handleMaxInput(event: ChangeEvent<HTMLInputElement>) {
    const value =
      event.target.value === ''
        ? sliderMaxValue
        : Number.parseInt(event.target.value, 10);
    if (value <= sliderMaxValue && value > minValue + minGap) {
      setMaxInput(value);
      setMaxValue(value);
    }
  }

  function handleInputKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
    type: 'min' | 'max'
  ) {
    if (event.key === 'Enter') {
      const value = Number.parseInt(event.currentTarget.value, 10);
      if (
        type === 'min' &&
        value >= sliderMinValue &&
        value < maxValue - minGap
      ) {
        setMinValue(value);
      } else if (
        type === 'max' &&
        value <= sliderMaxValue &&
        value > minValue + minGap
      ) {
        setMaxValue(value);
      }
    }
  }

  function startDrag() {
    setIsDragging(true);
  }

  function stopDrag() {
    setIsDragging(false);
    console.log(minValue, maxValue);
    client.priceRange = { min: 100 * minValue, max: 100 * maxValue };
    updateRange();
  }

  return (
    <div className="double-slider-box">
      <div className="input-box">
        <div className="min-box">
          <input
            type="number"
            value={minInput}
            onChange={handleMinInput}
            onKeyDown={(event) => handleInputKeyDown(event, 'min')}
            className="min-input"
            min={sliderMinValue}
            max={maxValue - minGap}
          />
        </div>
        <div className="max-box">
          <input
            type="number"
            value={maxInput}
            onChange={handleMaxInput}
            onKeyDown={(event) => handleInputKeyDown(event, 'max')}
            className="max-input"
            min={minValue + minGap}
            max={sliderMaxValue}
          />
        </div>
      </div>
      <div className="range-slider">
        <div className="slider-track"></div>
        <input
          type="range"
          min={sliderMinValue}
          max={sliderMaxValue}
          value={minValue}
          onChange={slideMin}
          onMouseDown={startDrag}
          onMouseUp={stopDrag}
          onTouchStart={startDrag}
          onTouchEnd={stopDrag}
          className="min-val"
        />
        <input
          type="range"
          min={sliderMinValue}
          max={sliderMaxValue}
          value={maxValue}
          onChange={slideMax}
          onMouseDown={startDrag}
          onMouseUp={stopDrag}
          onTouchStart={startDrag}
          onTouchEnd={stopDrag}
          className="max-val"
        />
        {isDragging && <div className="min-tooltip">{minValue}</div>}
        {isDragging && <div className="max-tooltip">{maxValue}</div>}
      </div>
    </div>
  );
}
