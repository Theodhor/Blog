import React from 'react';
import reactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import NavbarComp from './components/NavbarComp';
import Register from './components/access/register';
import Login from './components/access/login';

import 'bootstrap/dist/css/bootstrap.min.css';




class App extends React.Component {
  constructor(){
    super();

  }
  componentDidMount(){
  }


  render(){
    return(
      <BrowserRouter>
        <div>
          <NavbarComp/>
          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

reactDOM.render(
  <App/>,
  document.getElementById('root')
);
