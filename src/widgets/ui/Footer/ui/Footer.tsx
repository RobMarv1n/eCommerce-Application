import { Link } from 'react-router-dom';
import { Copyright } from './Copyright/Copyright';
import { Logo } from '../../../../shared/ui/Logo';
import { footerNav } from '../config/footerNav';
import { socials } from '../config/socials';

import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContainer}`}>
        <div className={styles.info}>
          <Logo color="white" />
          <p className={styles.infoText}>
            Fresh, natural, real. <br />
            Caring for your health starts with what you eat.
          </p>
          <address className={styles.contacts}>
            <a className={styles.contactsLink} href="tel:+2195550114">
              (219) 555-0114
            </a>
            or
            <a className={styles.contactsLink} href="mailto:ecobazar@gmail.com">
              ecobazar@gmail.com
            </a>
          </address>
        </div>
        <div className={styles.nav}>
          {footerNav.map((navSection) => (
            <div className={styles.navSection} key={navSection.title}>
              <input
                className={styles.checkbox}
                type="checkbox"
                id={navSection.id}
              />
              <label className={styles.label} htmlFor={navSection.id}>
                <span className={styles.navTitle} role="heading" aria-level={2}>
                  {navSection.title}
                </span>
              </label>
              <ul className={styles.navList}>
                {navSection.items.map((item) => (
                  <li key={item.label} className={styles.navItem}>
                    {item.path ? (
                      <Link to={item.path} className={styles.navLink}>
                        {item.label}
                      </Link>
                    ) : (
                      <span className={styles.navLinkInactive}>
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div>
          <span className={styles.socialsTitle} role="heading" aria-level={2}>
            Socials
          </span>
          <ul className={styles.socialsList}>
            {socials.map((social) => (
              <li key={social.name} className={styles.socialsItem}>
                <a
                  className={styles.socialsLink}
                  href={social.url}
                  aria-label={`Follow us on ${social.label}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    className={styles.icon}
                    width="18"
                    height="18"
                    aria-hidden="true"
                  >
                    <use href={`/socials-sprite.svg#${social.name}`} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Copyright />
    </footer>
  );
}
