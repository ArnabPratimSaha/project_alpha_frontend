import './App.css';
import React,{useState,useEffect,Suspense,lazy,useRef} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  useNavigate,
} from "react-router-dom";

import Authentication from './pages/authentication/authentication';
import Error from './pages/error/error';
import PostPage from './pages/fullPostPage/postPage';
import Validation from './pages/discordValidation/validation';
import useMode from './customhooks/useMode';
import Cookies from 'js-cookie';
import Navbar from './component/navbar/navbar';
import { Loading,Authenticating } from './pages/loading/loading';

const Home= lazy(()=>import( './pages/home/home'));
const Dashboard =lazy(()=>import('./pages/dashboard/dashboard'));
const Log =lazy(()=>import('./pages/log/log'));

const ProtectedRoutes = ({isAuth,isLoading,mode,MODETYPE}) => {
  if(!isLoading && !isAuth)window.location=`${process.env.REACT_APP_BACKENDAPI}auth/discord`;
  return isLoading ? <Authenticating mode={mode} MODETYPE={MODETYPE}/> : isAuth ? <Outlet /> : <Home  mode={mode} MODETYPE={MODETYPE}/>;
};
const useAuth=({isLoggedin})=>{
  const [isAuth, setIsAuth] = useState(isLoggedin);
  const [isLoading, setIsLoading] = useState(true);
  const first = useRef(true)
  useEffect(() => {
    const id = Cookies.get('temp_id') || Cookies.get("id");
    const avatar = Cookies.get("temp_avatar") || Cookies.get("avatar");
    const userName = Cookies.get("temp_userName") || Cookies.get("userName");
    const userTag = Cookies.get("temp_userTag") || Cookies.get("userTag");
    setIsLoading(false);
    //route for authenticating check
    if (!id || !avatar || !userName || !userTag) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  }, [isLoggedin]);
  return {isAuth,isLoading}
}
const App=() =>{
  const [mode, changeMode, MODETYPE, updateMode] = useMode();
  const [isLoggedin, setIsLoggedin] = useState(false);
  const {isAuth,isLoading}=useAuth({isLoggedin:isLoggedin});
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<Loading mode={mode} MODETYPE={MODETYPE} updateMode={updateMode} onStatusChange={setIsLoggedin}/>}>
          <Navbar mode={mode} MODETYPE={MODETYPE} updateMode={updateMode} onStatusChange={setIsLoggedin}/>
          <Routes >
            <Route path={'/'} element={<Home mode={mode} MODETYPE={MODETYPE} />} />
            <Route path='/error/:code' element={<Error />} />
            <Route path='/auth/:did/:uid' element={<Authentication mode={mode} MODETYPE={MODETYPE} />} />
            <Route path='/val/:did/:sid/:page' element={<Validation mode={mode} MODETYPE={MODETYPE} />} />
            <Route path='/learnmore' element={<div  style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}></div>} />
            <Route element={<ProtectedRoutes isAuth={isAuth} isLoading={isLoading} isLoggedin={isLoggedin} mode={mode} MODETYPE={MODETYPE} />}>
              <Route path='/dashboard/:uid/:did' element={<Dashboard mode={mode} MODETYPE={MODETYPE} />} />
              <Route path='/log/:uid/:did' element={<Log mode={mode} MODETYPE={MODETYPE} />} />
              <Route path='/post/:uid/:sid/:did/:pid' element={<PostPage mode={mode} MODETYPE={MODETYPE} />} />
            </Route>
            {/* <Route path={'*'} element={<ExtraRoute/>}/> */}
            <Route path={'*'} element={<Loading mode={mode} MODETYPE={MODETYPE} updateMode={updateMode} onStatusChange={setIsLoggedin}/>}/>
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}
const ExtraRoute=()=>{
  const navigate=useNavigate();
  useEffect(() => {
    navigate('/')
  }, [])
  return (<div></div>);
}
export default App;
