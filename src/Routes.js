import React from 'react';
import Layout from './HOC/Layout';
import { Switch } from 'react-router-dom';

import PrivateRoute from './components/authRoutes/PrivateRoute';
import PublicRoute from './components/authRoutes/PublicRoute';

import Home from './components/home';
import Login from './components/login';
import Dashboard from './components/admin/Dashboard';
import AdminMatches from './components/admin/matches';
import AddEditMatch from './components/admin/matches/AddEditMatch';
import AdminPlayers from './components/admin/players';
import AddEditPlayer from './components/admin/players/AddEditPlayer';
import Team from './components/team';
import Matches from './components/matches';
import Page404 from './components/UI/Page404';

const Routes = props => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute
          {...props}
          exact
          component={AddEditPlayer}
          path="/admin/players/add_player/:id"
        />
        <PrivateRoute
          {...props}
          exact
          component={AddEditPlayer}
          path="/admin/players/add_player"
        />
        <PrivateRoute
          {...props}
          exact
          component={AdminPlayers}
          path="/admin/players"
        />
        <PrivateRoute
          {...props}
          exact
          component={AddEditMatch}
          path="/admin/matches/add_match"
        />
        <PrivateRoute
          {...props}
          exact
          component={AddEditMatch}
          path="/admin/matches/edit_match/:id"
        />
        <PrivateRoute
          {...props}
          exact
          component={AdminMatches}
          path="/admin/matches"
        />
        <PrivateRoute
          {...props}
          exact
          component={Dashboard}
          path="/admin"
        />
        <PublicRoute
          {...props}
          exact
          component={Home}
          path="/"
          restricted={false}
        />
        <PublicRoute
          {...props}
          exact
          component={Login}
          path="/login"
          restricted={true}
        />
        <PublicRoute
          {...props}
          exact
          component={Team}
          path="/team"
        />
        <PublicRoute
          {...props}
          exact
          component={Matches}
          path="/matches"
        />
        <PublicRoute
          {...props}
          component={Page404}
        />
      </Switch>
    </Layout>
  );
};

export default Routes;
