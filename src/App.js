import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from './pages/home/home';
import Dashboard from './pages/dashboard/dashboard';
import Authentication from './pages/authentication/authentication';
import Error from './pages/error/error';
import Log from './pages/log/log';
import PostPage from './pages/fullPostPage/postPage';
import Validation from './pages/discordValidation/validation';
function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/home' exact>
              <Home/>
          </Route>
          <Route path='/dashboard/:uid/:did'>
              <Dashboard/>
          </Route>
          <Route path='/log/:uid/:did'>
              <Log/>
          </Route>
          <Route path='/post/:uid/:sid/:did/:pid'>
            <PostPage/>
          </Route>
          <Route path='/auth/:did/:uid'>
              <Authentication/>
          </Route>
          <Route path='/val/:did/:sid/:page'>
              <Validation/>
          </Route>
          <Route path='/error/:code'>
              <Error/>
          </Route>
          <Redirect to='/home' />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
