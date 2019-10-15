import React, { useState, useEffect } from 'react';
import {
  Typography,
  Progress,
  Card,
  List,
  Avatar,
  Divider,
  Button
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import firebase from 'firebase';
import { Redirect, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Profile() {
  const calculateLevel = experience => Math.floor(experience / 50);
  const percentToNextLevel = experience => (experience / 50 - calculateLevel(experience)) * 100;
  const {user, app, profile} = useSelector(state=>state);
  const {pending, areFriends} = profile;
  const isMobile = app.isMobile;
  const dispatch = useDispatch();
  const { id } = useParams()
  const [redirectHome, setRedirectHome] = useState(false);
  const [selfProfile] = useState(!id);

  useEffect(()=>{
    if(selfProfile){
      axios.post('/user/profile', {id})
    .then(res => console.log(res))
    .catch(err => console.log(err, 'error fetch profile'));
    }
  },[id,selfProfile]);

  dispatch({ type: 'PLAYING', payload: false });

  const calcWidth = () => {
    if (isMobile) {
      return '80vw';
    } else {
      return '20vw';
    }
  };

  const data = [
    {
      title: 'User Name',
      icon: 'user',
      info: user.nickname
    },
    {
      title: 'Email',
      icon: 'mail',
      info: user.email
    },
    {
      title: 'Birthday',
      icon: 'calendar',
      info: moment(user.age).format('D/MM/YYYY')
    },
    {
      title: 'Phone',
      icon: 'phone',
      info: user.phone
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
    axios.post('/user/addFriend', {myid: user.id, friend: id});
  }
  const removeFriend = () => {
    axios.post('/user/removeFriend', {myid: user.id, friend: id});
  }

  const friendSystem = () => {
    if (areFriends) {
      return (
        <Button icon='user-delete' onClick={removeFriend()}>
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
          <Button icon='user-add' onClick={addFriend()}>
            Add Friend
          </Button>
        );
      }
    }
  };

  const myProfileButtons = (
    <div>
      <Button icon='poweroff' onClick={() => logOut()}>
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
            {user.name}
          </Typography.Title>
          <Progress
            percent={percentToNextLevel(user.experience)}
            type='circle'
            format={() => user.level}></Progress>
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
