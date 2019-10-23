import React, { useState, useEffect } from 'react';
import {
  Typography,
  Progress,
  Card,
  List,
  Avatar,
  Divider,
  Button,
  Spin
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import firebase from 'firebase';
import { Redirect, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  const calculateLevel = experience => Math.floor(experience / 50);
  const percentToNextLevel = experience =>
    (experience / 50 - calculateLevel(experience)) * 100;
  const { user, app, profile } = useSelector(state => state);
  const { pending, areFriends, visited, profile_user } = profile;
  const redux_user = profile_user;
  const isMobile = app.isMobile;
  const dispatch = useDispatch();
  const { id } = useParams();
  const [redirectHome, setRedirectHome] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selfProfile] = useState(!id);

  useEffect(() => {
   if(id){
      dispatch({
        type: 'PROFILE_USER',
        payload: visited.filter(profile => profile.uid === id)
      });
      setLoading(false);
      console.log(2)
    } else {
      setLoading(true);
      console.log(3);
      axios
        .post('/user/profile', { id })
        .then(res => {
          dispatch({ type: 'PROFILE_USER', payload: res.data});
          setLoading(false);
          dispatch({ type: 'ADD_VISITED_PROFILE', payload: res.data}); //loop infinito
        })
        .catch(err => console.log(err, 'error fetch profile'));
    }
   }else{
     console.log(4)
     dispatch({type: 'PROFILE_USER', payload: user});
     setLoading(false);
   }
  }, [id, visited, user, dispatch]);

  //dispatch({ type: 'PLAYING', payload: false });

  const calcWidth = () => {
    if (isMobile) {
      return '80vw';
    } else {
      return '20vw';
    }
  };

  if (loading) return <Spin size='large' />;

  const data = [
    {
      title: 'User Name',
      icon: 'user',
      info: redux_user.nickname
    },
    {
      title: 'Email',
      icon: 'mail',
      info: redux_user.email
    },
    {
      title: 'Birthday',
      icon: 'calendar',
      info: moment(redux_user.age).format('D/MM/YYYY')
    },
    {
      title: 'Phone',
      icon: 'phone',
      info: redux_user.phone
    }
  ];

  const logOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        // Sign-out successful.
        dispatch({ type: 'AUTHENTICATION', payload: false });
        sessionStorage.clear();
        setRedirectHome(true);
      })
      .catch(function(error) {
        // An error happened.
        console.log(error, 'error logout');
      });
  };

  const addFriend = () => {
    axios.post('/user/addFriend', { myid: user.uid, friend: id }).then(res=> {if(res.data.done)dispatch({type:'PENDING', payload: true})});
  };
  const removeFriend = () => {
    axios.post('/user/removeFriend', { myid: user.uid, friend: id }).then(res=>{if(res.data.done)dispatch({type:'FRIENDS', payload: false})});
  };

  const friendSystem = () => {
    if (areFriends) {
      return (
        <Button icon='user-delete' onClick={removeFriend}>
          Remove Friend
        </Button>
      );
    } else {
      if (pending) {
        return (
          <Button icon='loading' disabled>
            Pending
          </Button>
        );
      } else {
        return (
          <Button icon='user-add' onClick={addFriend}>
            Add Friend
          </Button>
        );
      }
    }
  };

  const myProfileButtons = (
    <div>
      <Button icon='poweroff' onClick={logOut}>
        Log Out
      </Button>
    </div>
  );

  if (redirectHome) return <Redirect to='/' />;
  
  return (
    <React.Fragment>
      <Card
        className='centered-div'
        style={{ width: calcWidth(), height: '80vh', color: 'yellow' }}>
        <div style={{ textAlign: 'center' }}>
          <Typography.Title level={2} style={{ paddingBottom: 35 }}>
            {redux_user.name}
          </Typography.Title>
          <Progress
            percent={percentToNextLevel(user.experience)}
            type='circle'
            format={() => redux_user.level}></Progress>
        </div>
        <div style={{ marginTop: 15, textAlign: 'center' }}>
          {!selfProfile && friendSystem()}
        </div>

        <Divider />
        <List
          itemLayout='horizontal'
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar icon={item.icon} />}
                title={item.title}
                description={item.info}
              />
            </List.Item>
          )}
        />
        <Divider />
        {selfProfile && myProfileButtons}
      </Card>
    </React.Fragment>
  );
}
