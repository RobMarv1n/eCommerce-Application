import { useState } from 'react';
import vector from './assets/Vector.png';
import './FilterItem.css';

type Properties = {
  title: string;
  children: React.ReactNode;
};

export function FilterItem({ title, children }: Properties) {
  const [hide, setHide] = useState(false);

  const styleItem = 'filter-item' + (hide ? ' filter-item-hide' : '');
  const styleVector = hide ? 'vector-rotate' : undefined;

  return (
    <div className={styleItem}>
      <div className="filter-item-header">
        <p>{title}</p>
        <img
          className={styleVector}
          src={vector}
          alt=""
          onClick={() => setHide(!hide)}
        />
      </div>
      {children}
    </div>
  );
}
