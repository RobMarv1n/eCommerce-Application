import { useState } from 'react';
import { Modal } from '../../../../shared/ui/Modal';
import { ProductData } from '../../../../shared/api/clientApi/types';
import { WishlistIcon } from '../../../../shared/ui/Icon/WishlistIcon';
import { SwiperSlider } from '../../../../shared/ui/SwiperSlider/SwiperSlider';
// import { Counter } from '../../../../shared/ui/Counter';
import { CartActionButton } from './CartActionButton/CartActionButton';

import styles from './ProductDetailed.module.css';
import { client } from '../../../../shared/api/clientApi/ClientApi';

interface ProductDetailedProperties {
  product: ProductData;
}

export function ProductDetailed({ product }: ProductDetailedProperties) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const categoryPath = client.productApi.getCategoryPath(product.categoryId);

  return (
    <div className={styles.wrapper}>
      <div className={styles.slider}>
        <SwiperSlider
          images={product.images}
          onImageClick={(index) => {
            setActiveIndex(index);
            setModalOpen(true);
          }}
        />
      </div>

      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)}>
          <SwiperSlider images={product.images} startIndex={activeIndex} />
        </Modal>
      )}

      <div className={styles.detailed}>
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
          {/* <Counter /> */}
          <CartActionButton
            productId={product.id}
            productTitle={product.title}
          />
          <button className={styles.buttonWishlist}>
            <WishlistIcon width="20" height="20" color="#2C742F" />
          </button>
        </div>
        <div className={styles.category}>
          Category:{' '}
          <span className={styles.categoryName}>
            {categoryPath.map((item) => (
              <span key={'path' + item.id}>
                <span>{item.name}</span>
                <span> &gt; </span>
              </span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
