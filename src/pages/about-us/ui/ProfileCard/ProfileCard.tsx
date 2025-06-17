import { Link } from 'react-router-dom';

import styles from './ProfileCard.module.css';

interface ProfileCardProperties {
  image: string;
  name: string;
  role: string;
  description: string;
  contributions: string[];
  github: string;
}

export function ProfileCard({
  image,
  name,
  role,
  description,
  contributions,
  github,
}: ProfileCardProperties) {
  return (
    <div className={styles.profileCard}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <img
            className={styles.headerPhoto}
            src={image}
            alt={name}
            width={140}
            height={140}
          />
        </div>
        <div className={styles.headerRight}>
          <div className={styles.headerName}>{name}</div>
          <div className={styles.headerRole}>{role}</div>
        </div>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.contributions}>
        <details>
          <summary className={styles.contributionsLabel}>contributions</summary>
          <ul className={styles.contributionsList}>
            {contributions.map((item, index) => {
              return (
                <li key={index} className={styles.contributionsItem}>
                  ✔ {item}
                </li>
              );
            })}
          </ul>
        </details>
      </div>
      <div className={styles.socials}>
        <Link to={github} target="_blank">
          <img src="/github.png" alt="github" />
        </Link>
      </div>
    </div>
  );
}
