import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './layout/Navbar';
import Dashboard from './lugares/containers/Dashboard';
import Lugares from './lugares/containers/Lugares';
import Login from './lugares/containers/Login';
import Register from './lugares/containers/Register';
import Profile from './lugares/containers/Profile';
import EditarPerfil from './lugares/containers/EditarPerfil';
import NotFound from './lugares/containers/NotFound';
import NuevoLugar from './lugares/containers/NuevoLugar';
import Home from './lugares/containers/Home';

import './App.css';
import Lugar from './lugares/containers/Lugar';
import Registrado from './lugares/containers/Registrado';

function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/lugares' component={Lugares} />
          <Route exact path='/lugar/:id' component={Lugar} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/registrado' component={Registrado} />
          <Route exact path='/dashboard' component={Dashboard} />
          <Route exact path='/profile/:userId' component={Profile} />
          <Route exact path='/edit-profile' component={EditarPerfil} />
          <Route exact path='/add-place' component={NuevoLugar} />
          <Route component={NotFound} />
        </Switch>
      </Fragment>
    </Router>
  );
}

export default App;
