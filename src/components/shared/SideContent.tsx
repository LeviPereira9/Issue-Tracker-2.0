import React from 'react';
import { Link } from 'react-router-dom';

import { SideContentProps } from '../../types/autheticationTypes';

const SideContent = ({
  className,
  title,
  text,
  toRedirect,
  toText,
  label,
  imgUrl,
}: SideContentProps) => {
  return (
    <div
      className={`container d-none d-md-flex formStyle-sideContent ${className}`}
    >
      <h1>{title}</h1>
      <p className="formStyle-sideContent__text">
        {text}
        {'  '}
        <Link aria-label={label} tabIndex={0} to={toRedirect}>
          {toText}
        </Link>
      </p>
      <img
        className="formStyle-sideContent__img img-fluid"
        src={`/img/${imgUrl}`}
        alt={toText}
      />
    </div>
  );
};

export default SideContent;
