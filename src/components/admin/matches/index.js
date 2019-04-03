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

import { firebaseMatches } from '../../../firebase';
import { firebaseLooper } from '../../UI/misc';

class AdminMatches extends Component {
  state = {
    isLoading: true,
    matches: [],
  };

  componentDidMount() {
    firebaseMatches.once('value').then(snapshot => {
      this.setState({
        isLoading: false,
        matches: firebaseLooper(snapshot).reverse(),
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
                  <TableCell>Date</TableCell>
                  <TableCell>Match</TableCell>
                  <TableCell>Result</TableCell>
                  <TableCell>Final</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.matches
                  ? this.state.matches.map((match, i) => {
                      return (
                        <TableRow key={i}>
                          <TableCell>{match.date}</TableCell>
                          <TableCell>
                            <Link to={`/admin/matches/edit_match/${match.id}`}>
                              {match.away} <strong>-</strong> {match.local}
                            </Link>
                          </TableCell>
                          <TableCell>
                            {match.resultAway} <strong>-</strong>{' '}
                            {match.resultLocal}
                          </TableCell>
                          <TableCell>
                            {match.final === 'Yes' ? (
                              <span className="matches_tag_red">Final</span>
                            ) : (
                              <span className="matches_tag_green">
                                Not yet played
                              </span>
                            )}
                          </TableCell>
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

export default AdminMatches;
