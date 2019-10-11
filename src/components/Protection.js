import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { Spin } from 'antd';

export default function Protection(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [isProtected, setIsProtected] = useState(true);

  useEffect(() => {
    try{
      const idToken = sessionStorage.getItem('token');
      axios
        .post('/user/check_login', {
          token: idToken
        })
        .then(res => {
          console.log(res)
          if (res.data.verified) {
            setIsProtected(false);
          }
          setIsLoading(false);
        })
        .catch(error =>  setIsLoading(false));
    }catch(err){
      console.log(err, 'useEffect Protection')
      setIsLoading(false);
    }
  }, []);
console.log('isLoading', isLoading)

  if (isLoading) {
    return (
      <Spin
        size='large'
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      />
    );
  } else {
    console.log('isProtected', isProtected)
    if (isProtected) {
      return <Redirect to='/login' />;
    } else {
      return <React.Fragment> {props.children}</React.Fragment>;
    }
  }
}
