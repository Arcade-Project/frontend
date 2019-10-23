import React, {useEffect, useState} from 'react';
import { Typography, Card, List, Avatar, Spin, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Notifications() {
  const dispatch = useDispatch();
  const getUid = useSelector(state=> state.user.uid);
  dispatch({ type: 'PLAYING', payload: false });
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(()=>{
    setLoading(true);
    axios.post('/user/notifications', {uid: getUid})
    .then(res => {
      setNotifications(res.data);
      setLoading(false);
    })
    .catch(err => {
      console.log(err)
      setLoading(false);
    })
  },[getUid]);

  const acceptFriend = (e) => {
    let which = (e.target.getAttribute('uid'));
    console.log(getUid)
    axios.post('/user/acceptFriend', {myid: getUid, friend: which}).then().catch();
  }

  const declineFriend = (e) => {
    let which = (e.target.getAttribute('uid'));
    axios.post('/user/declineFriend', {myid: getUid, friend: which}).then().catch();
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