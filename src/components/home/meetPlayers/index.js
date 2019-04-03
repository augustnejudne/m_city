import React, { Component } from 'react';
import { Tag } from '../../UI/misc';
import { Reveal } from 'react-reveal';

import HomeCards from './Cards';

class MeetPlayers extends Component {
  state = {
    show: false,
  };
  render() {
    return (
      <Reveal
        fraction={0.7}
        onReveal={() => {
          this.setState({
            show: true,
          });
        }}
      >
        <div
          className="home_meetplayers"
          style={{
            background: `repeating-linear-gradient(
                        -45deg,
                        #fff 0px,
                        #fff 21px,
                        #98c5e9 21px,
                        #98c5e9 30px
                      )`,
          }}
        >
          <div className="container">
            <div className="home_meetplayers_wrapper">
              <div className="home_card_wrapper">
                <HomeCards show={this.state.show} />
              </div>
              <div className="home_text_wrapper">
                <Tag
                  bg="#0e1731"
                  color="#fff"
                  size="100"
                  add={{ display: 'inline-block', marginBottom: '20px' }}
                >
                  Meet
                </Tag>
                <Tag
                  bg="#0e1731"
                  color="#fff"
                  size="100"
                  add={{ display: 'inline-block', marginBottom: '20px' }}
                >
                  The
                </Tag>
                <Tag
                  bg="#0e1731"
                  color="#fff"
                  size="100"
                  add={{ display: 'inline-block', marginBottom: '20px' }}
                >
                  Players
                </Tag>
                <Tag
                  link="/team"
                  bg="#fff"
                  color="#0e1731"
                  size="27"
                  add={{
                    display: 'inline-block',
                    marginBottom: '27px',
                    border: '1px solid #0e1731',
                  }}
                >
                  Meet them here
                </Tag>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    );
  }
}

export default MeetPlayers;
