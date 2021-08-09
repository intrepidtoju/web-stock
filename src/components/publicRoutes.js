import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AdminsLogin from './AdminsLogin/AdminsLogin';
import Orders from './Order/Order';
import Products from './Products/Products';

export default () => {
  return (
    <Switch>
      <Route exact path="/login" component={AdminsLogin} />
      <Route exact path="/orders" component={Orders} />
      <Route exact path="/products" component={Products} />
    </Switch>
  );
};
