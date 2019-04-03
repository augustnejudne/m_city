import React from 'react';
import Icon from '../UI/Icon';

import m_city_logo from '../../Resources/images/logos/manchester_city_logo.png';

const Footer = props => {
  return (
    <footer className="bck_blue">
      <div className="footer_logo">
        <Icon size="70" img={m_city_logo} />
      </div>
      <div className="footer_disclaimer">
        Manchester City 2019. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
