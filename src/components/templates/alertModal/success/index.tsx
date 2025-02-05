import React from 'react';
import './Success.css';

const Success: React.FC = () => {
  return (
    <div className="success-container">
      <div className="success-icon">
        <div className="checkmark"></div>
      </div>
      <p className="success-message">Success</p>
    </div>
  );
};

export default Success;