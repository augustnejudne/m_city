import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';

import Icon from '../UI/Icon';

import m_city_logo from '../../Resources/images/logos/manchester_city_logo.png';

class Header extends Component {
  render() {
    return (
      <AppBar
        position="fixed"
        style={{
          backgroundColor: '#98c5e9',
          boxShadow: 'none',
          padding: '10px 0',
          borderBottom: '2px solid #00285e',
        }}
      >
        <Toolbar style={{ display: 'flex' }}>
          <div className="header_logo">
            <Icon link="/" size="70" img={m_city_logo} />
          </div>
          <div style={{ flexGrow: 1 }} />
          <Link to="/team">
            <Button color="inherit">Team</Button>
          </Link>
          <Link to="/matches">
            <Button color="inherit">Matches</Button>
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
