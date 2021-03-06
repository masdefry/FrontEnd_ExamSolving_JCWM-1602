import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// Component
import Navbar from './Components/Navbar'
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login'
import TransactionHistory from './Pages/TransactionHistory';

class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <Navbar />

        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/login' component={Login} />
          <Route path='/history' component={TransactionHistory} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
