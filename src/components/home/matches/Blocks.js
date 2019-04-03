import React, { Component } from 'react';
import { Slide } from 'react-reveal';
import MatchesBlock from './MatchesBlock';
import { firebaseMatches } from '../../../firebase';
import { firebaseLooper } from '../../UI/misc';

class Blocks extends Component {
  state = {
    matches: [],
  };

  componentDidMount() {
    firebaseMatches
      .limitToLast(6)
      .once('value')
      .then(snapshot => {
        this.setState({
          matches: firebaseLooper(snapshot).reverse(),
        });
      });
  }

  showMatches = matches => {
    return matches
      ? matches.map(match => {
          return (
            <Slide key={match.id} bottom>
              <div className="item">
                <div className="wrapper">
                  <MatchesBlock match={match} />
                </div>
              </div>
            </Slide>
          );
        })
      : null;
  };

  render() {
    return (
      <div className="home_matches">{this.showMatches(this.state.matches)}</div>
    );
  }
}

export default Blocks;
