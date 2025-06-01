import styles from './Button.module.css';

interface ButtonProperties {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({
  className = '',
  type = 'button',
  disabled = false,
  onClick,
  children,
}: ButtonProperties) {
  return (
    <button
      type={type}
      className={`${styles.button} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
