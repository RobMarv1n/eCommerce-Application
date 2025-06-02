import { ProductData } from '../../../../shared/api/clientApi/types';
import { Button } from '../../../../shared/ui/Button';
import { CartIcon } from '../../../../shared/ui/Icon/CartIcon';
import { WishlistIcon } from '../../../../shared/ui/Icon/WishlistIcon';
import { SwiperSlider } from './swiper-slider/SwiperSlider';
import styles from './ProductDetailed.module.css';

interface ProductDetailedProperties {
  product: ProductData;
}

export function ProductDetailed({ product }: ProductDetailedProperties) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.slider}>
        <SwiperSlider images={product.images} />
      </div>
      <div className={styles.details}>
        <h1 className={styles.productTitle}>{product.title}</h1>
        <div className={styles.priceWrapper}>
          <span className={styles.discountedPrice}>
            ${product.discountedPrice}
          </span>
          {product.discountedPrice !== product.price && (
            <>
              <span className={styles.price}>${product.price}</span>
              <span className={styles.discount}>
                {Math.round(
                  (1 - product.discountedPrice / product.price) * 100
                )}
                % Off
              </span>
            </>
          )}
        </div>
        <p className={styles.shortDescription}>{product.descriptionShort}</p>
        <div className={styles.CTA}>
          <div className={styles.counter}>
            <button className={styles.counterBtn}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.3335 7H11.6668"
                  stroke="#666666"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
            <span>1</span>
            <button className={styles.counterBtn}>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.3335 6.99967H11.6668M7.00016 2.33301V11.6663V2.33301Z"
                  stroke="#1A1A1A"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <Button className={styles.buttonCart}>
            Add to Cart
            <CartIcon width="18" height="18" color="#fff" />
          </Button>
          <button className={styles.buttonWishlist}>
            <WishlistIcon width="20" height="20" color="#2C742F" />
          </button>
        </div>
        <div className={styles.category}>
          Category:{' '}
          <span className={styles.categoryName}>{product.categoryName}</span>
        </div>
      </div>
    </div>
  );
}
