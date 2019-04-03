import React from 'react';
import { Link } from 'react-router-dom';

const Icon = props => {
  const template = (
    <div
      className="img_cover"
      style={{
        width: `${props.size}px`,
        height: `${props.size}px`,
      }}
    >
      <img src={props.img} alt="" style={{ width: '100%' }} />
    </div>
  );
  if (props.link) {
    return <Link to={props.link}>{template}</Link>;
  } else {
    return template;
  }
};

export default Icon;
