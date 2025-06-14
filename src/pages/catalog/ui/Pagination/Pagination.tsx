import styles from './Pagination.module.css';

interface PaginationProperties {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProperties) {
  const handlePageClick = (page: number) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPages = () => {
    const pages = [];

    for (let index = 1; index <= totalPages; index++) {
      pages.push(
        <button
          key={index}
          className={`${styles.button} ${index === currentPage ? styles.active : ''}`}
          onClick={() => handlePageClick(index)}
        >
          {index}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.button} ${styles.arrow}`}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.91699 1.16634L1.08366 6.99967L6.91699 12.833"
            stroke="#B3B3B3"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {renderPages()}
      <button
        className={`${styles.button} ${styles.arrow}`}
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.08301 1.16634L6.91634 6.99967L1.08301 12.833"
            stroke="#1A1A1A"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
