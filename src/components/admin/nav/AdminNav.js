import React from 'react';
import { Link } from 'react-router-dom';
import { ListItem } from '@material-ui/core';
import { firebase } from '../../../firebase';

const AdminNav = props => {
  const links = [
    {
      title: 'Matches',
      to: '/admin/matches',
    },
    {
      title: 'Add Match',
      to: '/admin/matches/add_match',
    },
    {
      title: 'Players',
      to: '/admin/players',
    },
    {
      title: 'Add Player',
      to: '/admin/players/add_player',
    },
  ];

  const buttonStyle = {
    color: '#fff',
    fontWeight: '300',
    borderBottom: '1px solid #353535',
  };

  const renderItems = () => {
    return links.map((link, i) => {
      return (
        <Link
          to={link.to}
          key={i}
          style={{
            pointerEvents:
              window.location.pathname === link.to ? 'none' : 'auto',
          }}
        >
          <ListItem button style={buttonStyle}>
            {link.title}
          </ListItem>
        </Link>
      );
    });
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log('log out successfull');
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      {renderItems()}
      <ListItem button style={buttonStyle} onClick={() => handleLogout()}>
        Logout
      </ListItem>
    </div>
  );
};

export default AdminNav;
