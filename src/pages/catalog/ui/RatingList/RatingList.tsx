import { RatingStars } from '../../../../shared/ui/RatingStars/RatingStars';
import './ratingList.css';
import { client } from '../../../../shared/api/clientApi/ClientApi';
import { useCatalogContext } from '../CatalogContext/CatalogContext';

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
  // const [selectValue, setSelectValue] = useState('1');
  const { ratingValue, setRatingValue } = useCatalogContext();

  return (
    <div className="rating-list">
      {ratingTitle.map((rating) => (
        <div className="rating-item" key={`rating${rating.value}`}>
          <input
            type="radio"
            name="rating"
            id={`rating-item${rating.value}`}
            value={rating.value}
            checked={ratingValue === rating.value}
            onChange={(event) => {
              setRatingValue(event.target.value);
              client.productApi.minRating = event.target.value;
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
