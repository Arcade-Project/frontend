import React, { useState, useEffect } from 'react';
import { Card, List, Avatar, Typography, Badge } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Players() {
  const dummyData = [
    {
      nickname: 'Diego', level: 1, color: 'black'
    },
    {
      nickname: 'Mati', level: 1, color: 'black'
    },
    {
      nickname: 'Ger', level: 1, color: 'black'
    },
    {
      nickname: 'Pablo', level: 1, color: 'black'
    }
  ];
  const { category } = useParams();
  const [users, setUsers] = useState(dummyData);
  const dispatch = useDispatch();
  const getUid = useSelector(state=>state.profile.profile_user.uid);
  dispatch({ type: 'PLAYING', payload: false });

  useEffect(() => {
    axios.post('/user/players',{category,id: getUid}, {timeout: 10000}).then(res =>
      setUsers(
        res.data.map(user => {
          return { uid: user.uid, nickname: user.nickname, level: user.level, color: user.color };
        })
      )
    );
  }, [category, getUid]);
  

  return (
    <React.Fragment>
      <Card className='centered-div' style={{ width: '80vw' }}>
        <Typography.Title level={1} style={{ textAlign: 'center' }}>
          {category} Players
        </Typography.Title>
        <List
          itemLayout='horizontal'
          dataSource={users}
          style={{maxHeight: '100%', overflow: 'auto'}}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Badge count={item.level}>
                    <Avatar
                      style={{
                        backgroundColor: item.color,
                        verticalAlign: 'middle'
                      }}
                      size='medium'>
                      {item.nickname[0]}
                    </Avatar>
                  </Badge>
                }
                title={<Link to={"/profile/" + item.uid}>{item.nickname}</Link>}
                description='Got the highest score on'
              />
            </List.Item>
          )}
        />
      </Card>
    </React.Fragment>
  );
}
