import React from 'react';
import Home from './Home';
import { Switch, Route } from 'react-router-dom';

function Body() {
  return (
      <Switch>
          <Route exact path='/' component={Home}/>
      </Switch>
  );
}

export default Body;
