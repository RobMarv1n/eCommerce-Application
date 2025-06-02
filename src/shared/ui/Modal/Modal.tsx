import styles from './Modal.module.css';

interface ModalProperties {
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ onClose, children }: ModalProperties) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
