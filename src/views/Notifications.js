import React, {useEffect, useState} from 'react';
import { Typography, Card, List, Avatar, Spin, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Notifications() {
  const dispatch = useDispatch();
  const user = useSelector(state=> state.user)
  dispatch({ type: 'PLAYING', payload: false });
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(()=>{
    setLoading(true);
    axios.post('/user/notifications', {uid: user.uid})
    .then(res => {
      setNotifications(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.log(err)
      setLoading(false);
    })
  },[user]);

  const data = [
    {
      nickname: 'Diego Pronesti',
    },
    {
      nickname: 'Matias Pagano',
    },
    {
      nickname: 'Ant Design nickname 3',
    },
    {
      nickname: 'Ant Design Title 4',
    },
  ];

  const acceptFriend = (e) => {
    let which = (e.target.getAttribute('uid'));
    console.log(user.uid)
    axios.post('/user/acceptFriend', {myid: user.uid, friend: which}).then().catch();
  }

  const declineFriend = (e) => {
    let which = (e.target.getAttribute('uid'));
    axios.post('/user/declineFriend', {myid: user.uid, friend: which}).then().catch();
  }



  if (loading) return <Spin size="large" />
  return (
    <React.Fragment>
    <Card style={{width: '60vw', height: '80vh'}}>
      <Typography.Title level={1}>Notifications</Typography.Title>
      <List
      itemLayout="horizontal"
      dataSource={notifications}
      renderItem={item => (
        <List.Item actions={[<Button key="accept" onClick={acceptFriend} uid={item.uid}>Accept</Button>, <Button key="decline" onClick={declineFriend}>Decline</Button>]}>
          <List.Item.Meta
            avatar={<Avatar icon='user-add' />}
            title={<Link to={`profile/${item.uid}`}>{item.nickname}</Link>}
            description="Quiere ser tu amigo"
          />
        </List.Item>
      )}
    />
    </Card>
      
    </React.Fragment>
  );
}
