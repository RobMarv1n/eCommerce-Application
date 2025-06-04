import { useState } from 'react';
import { RatingStars } from '../../../../shared/ui/RatingStars/RatingStars';
import './ratingList.css';
import { client } from '../../../../shared/api/clientApi/ClientApi';

const ratingTitle = [
  { title: '1 & up', value: '1' },
  { title: '2 & up', value: '2' },
  { title: '3 & up', value: '3' },
  { title: '4 & up', value: '4' },
  { title: '5', value: '5' },
];

type Properties = {
  onClick: () => void;
};

export function RatingList({ onClick }: Properties) {
  const [selectValue, setSelectValue] = useState('1');

  return (
    <div className="rating-list">
      {ratingTitle.map((rating) => (
        <div className="rating-item" key={`rating${rating.value}`}>
          <input
            type="radio"
            name="rating"
            id={`rating-item${rating.value}`}
            value={rating.value}
            checked={selectValue === rating.value}
            onChange={(event) => {
              setSelectValue(event.target.value);
              client.minRating = event.target.value;
              onClick();
            }}
          />
          <label
            className="rating-label"
            htmlFor={`rating-item${rating.value}`}
          >
            <RatingStars rating={rating.value} />
            {rating.title}
          </label>
        </div>
      ))}
    </div>
  );
}
