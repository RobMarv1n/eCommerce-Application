import { authors } from '../../config/authors';
import { paymentMethods } from '../../config/paymentMethods';

import styles from './Copyright.module.css';

export function Copyright() {
  return (
    <div className={styles.copyright}>
      <div className={`container ${styles.copyrightContainer}`}>
        <div>
          <p>Ecobazar eCommerce © 2025</p>
          <div className={styles.copyrightCreators}>
            Created by:
            {authors.map((author) => (
              <a
                key={author.name}
                className={styles.copyrightLink}
                href={author.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${author.name}'s GitHub profile`}
              >
                {author.name}
              </a>
            ))}
          </div>
        </div>
        <div className={styles.payments} aria-label="Accepted payment methods">
          {paymentMethods.map((method) => (
            <svg
              key={method.id}
              width={method.width}
              height={method.height}
              aria-label={method.label}
              role="img"
            >
              <use href={`/payments-sprite.svg#${method.id}`} />
            </svg>
          ))}
        </div>
      </div>
    </div>
  );
}
