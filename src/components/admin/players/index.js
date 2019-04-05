import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../../HOC/AdminLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

import { firebasePlayers } from '../../../firebase';
import { firebaseLooper } from '../../UI/misc';

class AdminPlayers extends Component {
  state = {
    isLoading: true,
    players: [],
  };

  componentDidMount() {
    firebasePlayers.once('value').then(snapshot => {
      this.setState({
        isLoading: false,
        players: firebaseLooper(snapshot).reverse(),
      });
    });
  }


  render() {
    return (
      <AdminLayout>
        <div>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Last Name</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Position</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.players
                  ? this.state.players.map((player, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell>
                            <Link to={`/admin/players/add_player/${player.id}`}>
                              {player.name}
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Link to={`/admin/players/add_player/${player.id}`}>
                              {player.lastname}
                            </Link>
                          </TableCell>
                          <TableCell>{player.number}</TableCell>
                          <TableCell>{player.position}</TableCell>
                        </TableRow>
                      );
                    })
                  : null}
              </TableBody>
            </Table>
          </Paper>
          <div className="admin_progress">
            {this.state.isLoading ? (
              <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
            ) : null}
          </div>
        </div>
      </AdminLayout>
    );
  }
}

export default AdminPlayers;
