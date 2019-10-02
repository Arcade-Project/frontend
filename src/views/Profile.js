import React, { useState } from 'react';
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
import { Redirect } from 'react-router-dom';

export default function Profile() {
  //{user = {name: 'DiegoDieh', email:'dieh.diego@gmail.com', experience: 123, age: Date.now(), registerDate: Date.now(), phone: '+5491135418548' }}
  const calculateLevel = experience => Math.floor(experience / 50);
  const percentToNextLevel = experience =>
    (experience / 50 - calculateLevel(experience)) * 100;
  const user = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const [redirectHome, setRedirectHome] = useState(false);
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
    console.log('logout');
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

  if (redirectHome) return <Redirect to='/' />;

  return (
    <React.Fragment>
      <Card className='centered-div' style={{ width: '30vw' }}>
        <div style={{ textAlign: 'center' }}>
          <Typography.Title level={2} style={{ paddingBottom: 35 }}>
            {user.name}
          </Typography.Title>
          <Progress
            percent={percentToNextLevel(user.experience)}
            type='circle'
            format={() => user.level}></Progress>
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
        <Button icon='poweroff' onClick={() => logOut()}>
          Log Out
        </Button>
      </Card>
    </React.Fragment>
  );
}
