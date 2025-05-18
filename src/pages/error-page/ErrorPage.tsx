import { ROUTES } from '../../types';
import { LinkButton } from '../../shared/ui/LinkButton';
import styles from './ErrorPage.module.css';
import errorImage from './assets/img/404.png';

export function ErrorPage() {
  return (
    <section className={styles.errorPage}>
      <img src={errorImage} alt="404 page not found" width="584" height="355" />
      <h1 className={styles.errorPageTitle}>Oops! page not found</h1>
      <LinkButton to={ROUTES.HOME}>Back to Home</LinkButton>
    </section>
  );
}
