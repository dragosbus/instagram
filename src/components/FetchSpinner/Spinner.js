import React from 'react';
import './Spinner.css';

export const Spinner = ({regiterBtnDisabled}) => {
  return (
    <div className="spinner" style={{display: regiterBtnDisabled ? 'block' : 'none'}}>
      <div className="bounce1" />
      <div className="bounce2" />
      <div className="bounce3" />
    </div>
  );
};
