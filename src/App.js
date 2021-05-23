import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from './pages/home/home';
import Dashboard from './pages/dashboard/dashboard';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/home' exact>
              <Home/>
          </Route>
          <Route path='/dashboard/:uid/:sid'>
              <Dashboard/>
          </Route>
          <Redirect to='/home' />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
