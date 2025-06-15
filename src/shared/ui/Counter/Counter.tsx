import { useState } from 'react';

import styles from './Counter.module.css';

interface CounterProperties {
  className?: string;
  value?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

export function Counter({
  className = '',
  value,
  min = 1,
  max = Infinity,
  onChange,
}: CounterProperties) {
  const [internalValue, setInternalValue] = useState(value ?? min);

  const count = value ?? internalValue;

  function updateCount(newValue: number) {
    if (onChange) {
      onChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  }

  function increment() {
    if (count < max) updateCount(count + 1);
  }

  function decrement() {
    if (count > min) updateCount(count - 1);
  }

  return (
    <div className={`${styles.counter} ${className}`}>
      <button className={styles.counterBtn} onClick={decrement}>
        -
      </button>
      <span>{count}</span>
      <button className={styles.counterBtn} onClick={increment}>
        +
      </button>
    </div>
  );
}
