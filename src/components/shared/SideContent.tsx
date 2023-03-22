import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  className: string;
  title: string;
  text: string;
  toRedirect: string;
  toText: string;
  label: string;
  imgUrl: string;
};

const SideContent = ({
  className,
  title,
  text,
  toRedirect,
  toText,
  label,
  imgUrl,
}: Props) => {
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
