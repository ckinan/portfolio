import React from 'react';
import Home from './Home';
import MarkDownTest from './MarkDownTest';
import { Switch, Route } from 'react-router-dom';

function Body() {
  return (
      <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/react-js' component={MarkDownTest}/>
      </Switch>
  );
}

export default Body;
