import React from 'react';
import './App.css';
import { Layout } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import Routes from './components/Routes';
import Sidebar from './components/Sidebar';
import MenuTop from './components/MenuTop';
import firebase from 'firebase';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
const { Content } = Layout;

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  databaseURL: process.env.REACT_APP_DATABASEURL,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTID
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

function App() {
  const dispatch = useDispatch();
  const isMobile = window.innerWidth < 1024;
  const isPlaying = useSelector(state => state.app.isPlaying);
  dispatch({ type: 'MOBILE', payload: isMobile });

  const back_color = isPlaying => {
    if (isPlaying) {
      return 'black';
    } else {
      return '';
    }
  };

  const update = () => {
    firebase.auth().onAuthStateChanged(authUser => {
      //console.log(authUser, 'authUser function');
      if (authUser) {
        lookForUser(authUser.email);
        return firebase
          .auth()
          .currentUser.getIdToken()
          .then(idToken => {
            axios.defaults.headers.common['Authorization'] = idToken;
            sessionStorage.setItem('token', idToken);
          })
          .catch();
      } else {
        sessionStorage.setItem('auth', false);
        dispatch({ type: 'AUTHENTICATION', payload: false });
      }
    });
  };

  const lookForUser = email => {
    axios
      .post('/user/login', {
        email
      }, {timeout: 10000})
      .then(res => {
        sessionStorage.setItem('auth', true);
        dispatch({ type: 'AUTHENTICATION', payload: true });
        dispatch({
          type: 'SET_USER',
          payload: res.data.user
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='App'>
      {update()}
      <BrowserRouter>
        <Layout style={{ minHeight: '100vh' }}>
          {isMobile ? <MenuTop /> : <Sidebar />}
          <Layout>
            <Content
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: back_color(isPlaying)
              }}>
              <Routes />
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
