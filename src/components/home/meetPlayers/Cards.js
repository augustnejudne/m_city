import React, { Component } from 'react';
import { easePolyOut } from 'd3-ease';
import { Animate } from 'react-move';
import Otamendi from '../../../Resources/images/players/Otamendi.png';
import PlayerCard from '../../UI/PlayerCard.js';

class HomeCards extends Component {
  state = {
    cards: [
      {
        bottom: 90,
        left: 300,
      },
      {
        bottom: 60,
        left: 200,
      },
      {
        bottom: 30,
        left: 100,
      },
      {
        bottom: 0,
        left: 0,
      },
    ],
  };

  showAnimateCards = () => {
    return this.state.cards.map((card, i) => {
      return (
        <Animate
          key={i}
          show={this.props.show}
          start={{
            bottom: 0,
            left: 0,
          }}
          enter={{
            bottom: [card.bottom],
            left: [card.left],
            timing: {
              duration: 500,
              ease: easePolyOut,
            },
          }}
        >
          {({ bottom, left }) => {
            return (
              <div style={{ position: 'absolute', bottom, left }}>
                <PlayerCard
                  number="30"
                  name="Nicolas"
                  lastName="Otamendi"
                  img={Otamendi}
                />
              </div>
            );
          }}
        </Animate>
      );
    });
  };

  render() {
    return <div>{this.showAnimateCards()}</div>;
  }
}

export default HomeCards;
