import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Main from './Main';
import App from './App';
import TestStock from './containers/test_stock';

export default (
  <Route path="/" component={Main} >
    <IndexRoute component={App} />
    <Route path="test/:ticker" component={TestStock} />
  </Route>
);
