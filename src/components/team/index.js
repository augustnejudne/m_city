import React, { Component } from 'react';
import PlayerCard from '../UI/PlayerCard';
import { Fade } from 'react-reveal';
import { firebasePlayers, firebase } from '../../firebase';
import { firebaseLooper } from '../UI/misc';
import { CircularProgress } from '@material-ui/core';
import { Promise } from 'core-js';

class Team extends Component {
  state = {
    isLoading: true,
    players: [],
  };

  componentDidMount() {
    firebasePlayers.once('value').then(snapshot => {
      const players = firebaseLooper(snapshot);
      let promises = [];
      for (let key in players) {
        promises.push(
          new Promise((resolve, reject) => {
            firebase
              .storage()
              .ref('players')
              .child(players[key].image)
              .getDownloadURL()
              .then(url => {
                players[key].url = url;
                resolve();
              })
              .catch(e => console.log(e));
          })
        );
      }

      Promise.all(promises)
        .then(() => {
          this.setState({
            isLoading: false,
            players,
          });
        })
        .catch(e => console.log(e));
    });
  }

  showPlayersByCategory = category => {
    return this.state.players
      ? this.state.players.map((player, i) => {
          return player.position === category ? (
            <Fade left key={i} delay={i * 50}>
              <div className="item">
                <PlayerCard
                  number={player.number}
                  name={player.name}
                  lastName={player.lastName}
                  img={player.url}
                />
              </div>
            </Fade>
          ) : null;
        })
      : null;
  };

  render() {
    return (
      <div className="the_team_container" style={{ background: '#98c5e9' }}>
        {this.state.isLoading ? (
          <div className="admin_progress" style={{ textAlign: 'center' }}>
            <CircularProgress thickness={7} style={{ color: '#fff' }} />
          </div>
        ) : (
          <div>
            <div className="team_category_wrapper">
              <div className="title">Keepers</div>
              <div className="team_cards">
                {this.showPlayersByCategory('Keeper')}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Defenders</div>
              <div className="team_cards">
                {this.showPlayersByCategory('Defence')}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Midfielders</div>
              <div className="team_cards">
                {this.showPlayersByCategory('Midfield')}
              </div>
            </div>

            <div className="team_category_wrapper">
              <div className="title">Strikers</div>
              <div className="team_cards">
                {this.showPlayersByCategory('Striker')}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Team;
