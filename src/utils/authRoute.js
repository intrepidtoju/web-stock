import React from 'react';
import { session } from './';
import { Redirect, Route } from 'react-router-dom';
const token = Boolean(session.get('token'));

/* Don't allow unauthenticated users to view this page */
export const Private = ({ component: Component }) => (
  <Route
    render={props =>
      token ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

/* Don't allow authenticated user to view this page */
export const Public = ({ component: Component }) => (
  <Route
    render={props =>
      !token ? <Component {...props} /> : <Redirect to="/user" />
    }
  />
);
