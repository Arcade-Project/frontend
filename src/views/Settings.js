import React from 'react';
import { Typography } from 'antd';
import { useDispatch } from 'react-redux';

export default function Settings() {
  const dispatch = useDispatch();
  dispatch({ type: 'PLAYING', payload: false });
  return (
    <React.Fragment>
      <Typography.Title level={1}>Settings</Typography.Title>
    </React.Fragment>
  );
}
