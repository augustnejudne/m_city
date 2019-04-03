import React from 'react';
import Blocks from './Blocks';
import { Tag } from '../../UI/misc';

const MatchesHome = () => {
  return (
    <div className="home_matches_wrapper">
      <div className="container">
        <Tag bg="#0e1731" color="#fff" size="50">
          Matches
        </Tag>

        <Blocks />

        <Tag link="/team" bg="#fff" color="#0e1731" size="22">
          See more matches
        </Tag>
      </div>
    </div>
  );
};

export default MatchesHome;
