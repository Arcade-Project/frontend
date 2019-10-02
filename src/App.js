import React from 'react';
import './App.css';
import { Layout } from 'antd';
import { BrowserRouter } from 'react-router-dom';
import Routes from './components/Routes';
import Sidebar from './components/Sidebar';
import firebase from 'firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux';
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

  const update = () => {
    firebase.auth().onAuthStateChanged(authUser => {
      // console.log(authUser, 'authUser function')
      if (authUser) {
       lookForUser(authUser.email)
        return firebase
          .auth()
          .currentUser.getIdToken()
          .then(idToken => {
            axios.defaults.headers.common['Authorization'] = idToken;
            localStorage.setItem('token', idToken);
          })
          .catch();
      }
    });
  };

  const lookForUser = (email) => {
    axios
      .post('/user/login', {
        email
      })
      .then(res => {
        localStorage.setItem('auth', true);
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
          <Sidebar />
          <Layout>
            <Content style={{ margin: '0' }}>
              <button
                onClick={() =>
                  axios.post('/user/test', { text: 'i am testing' })
                }>
                TEST
              </button>
              <button onClick={() => localStorage.clear()}>LOGOUT</button>
              <Routes />
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
