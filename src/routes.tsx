import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { FirstScreen } from './pages/FirstScreen';
import { Loading } from './pages/Loading';
import { SMSConfirmation } from './pages/SMSConfirmation';
import { Welcome } from './pages/Welcome';
import { Menu } from './pages/Menu';
import { Products } from './pages/Products';
import { About } from './pages/About';

// import { Container } from './styles';

export function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={FirstScreen} />
        <Route path="/loading" component={Loading} />
        <Route path="/sms" component={SMSConfirmation} />
        <Route path="/welcome" component={Welcome} />
        <Route path="/menu" component={Menu} />
        <Route path="/products" component={Products} />
        <Route path="/about" component={About} />
      </Switch>
    </BrowserRouter>
  );
}
