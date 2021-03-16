import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Component
import Navbar from './Components/Navbar'
import Login from './Pages/Login'

class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route path='/login' component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
