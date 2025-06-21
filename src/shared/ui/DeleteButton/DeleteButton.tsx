import styles from './DeleteButton.module.css';

interface DeleteButtonProperties {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}

export function DeleteButton({
  className = '',
  type = 'button',
  disabled = false,
  onClick,
}: DeleteButtonProperties) {
  return (
    <button
      type={type}
      className={`${styles.deleteButton} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      ✕
    </button>
  );
}
