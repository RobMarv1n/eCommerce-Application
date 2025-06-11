import './ratingStars.css';

type Properties = {
  rating: string;
};

export function RatingStars({ rating }: Properties) {
  return (
    <div>
      {Array.from({ length: 5 })
        .fill(0)
        .map((_, index) => (
          <span
            key={`star${index}`}
            className={index < +rating ? 'star-bright' : 'star-dim'}
          >
            &#9733;
          </span>
        ))}
    </div>
  );
}
