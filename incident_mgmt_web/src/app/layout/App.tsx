import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { theme } from 'app/theme';
import Dashboard from './dashboard/Dashboard';

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/">
              <Redirect to="/dashboard" />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};
