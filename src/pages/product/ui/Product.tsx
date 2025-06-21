import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../../../shared/api/clientApi/ClientApi';
import { ProductData } from '../../../shared/api/clientApi/types';
import { emptyProduct } from '../../../shared/api/clientApi/constants';
import { ProductDetailed } from '../../../widgets/ui/ProductDetailed';
import styles from './Product.module.css';

export function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductData>(emptyProduct);

  async function getProduct() {
    const product = await client.productApi.getProduct(id);
    setProduct(product);
  }

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="container">
      <ProductDetailed product={product} />
      <div className={styles.fullDescriptionWrapper}>
        <div className={styles.fullDescriptionLabel}>Description</div>
        <p>{product.descriptionFull}</p>
      </div>
    </section>
  );
}
