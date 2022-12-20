import React from 'react';

import styles from './Button.module.css';

const Button = ({
  color='blue',
  size='default',
  template,
  type = 'functional',
  children,
  onClick,
  disabled,
}) => {

  const renderContent = () => {
    if (children) {
      return (
        <span className={`${styles.section} ${styles.sectionContent}`}>
          {children}
        </span>
      );
    }
  };

  const params = { className: `${styles.component} ${size ? styles[size] : ''} ${color ? styles[color] : ''} ${template ? styles[template] : ''}`, disabled };

  switch (type) {
    case 'functional':
    default:
      return (
        <button type='button' onClick={onClick} {...params}>
          {renderContent()}
        </button>
      );
  }
};

export default Button;
