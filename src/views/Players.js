import React from 'react';
import { Card, List, Avatar, Typography } from 'antd';
import { useDispatch } from 'react-redux';

export default function Players() {
  const dispatch = useDispatch();
  dispatch({ type: 'PLAYING', payload: false });
  const data = [
    {
      title: 'Diego'
    },
    {
      title: 'Mati'
    },
    {
      title: 'Ger'
    },
    {
      title: 'Pablo'
    }
  ];

  return (
    <React.Fragment>
      <Card className='centered-div' style={{ width: '80vw', height: '75vh' }}>
        <Typography.Title level={1} style={{ textAlign: 'center' }}>
          Top Players
        </Typography.Title>
        <List
          itemLayout='horizontal'
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
                }
                title={<a href='https://ant.design'>{item.title}</a>}
                description='Got the highest score on'
              />
            </List.Item>
          )}
        />
      </Card>
    </React.Fragment>
  );
}
