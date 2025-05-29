import styles from './Button.module.css';

interface ButtonProperties {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({
  type = 'button',
  disabled = false,
  onClick,
  children,
}: ButtonProperties) {
  return (
    <button
      type={type}
      className={styles.button}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
