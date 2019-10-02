import React from 'react';
import { Form, Icon, Input, Button, Checkbox, Alert } from 'antd';
import firebase from 'firebase';
import { connect } from 'react-redux';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error_msg: '',
      redirectProfile: false
    };
  }

  handleSubmit = e => {
    const that = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        firebase
          .auth()
          .signInWithEmailAndPassword(values.email, values.password)
          .then(userCred => {
            axios
              .post('/user/login', {
                email: userCred.user.email
              })
              .then(res => {
                localStorage.setItem('auth', true);
                that.props.dispatch({ type: 'AUTHENTICATION', payload: true });
                that.props.dispatch({
                  type: 'SET_USER',
                  payload: res.data.user
                });
              })
              .catch(err => console.log(err));

            firebase
              .auth()
              .currentUser.getIdToken(/* forceRefresh */ true)
              .then(function(idToken) {
                // Send token to your backend via HTTPS
                // ...
                // axios.defaults.headers.common['Authorization'] = idToken;
              })
              .catch(function(error) {
                // Handle error
              });
          })
          .catch(function(error) {
            // Handle Errors here.
            console.log(error.code, 'error code');
            console.log(error.message, 'error message');
            // ...
            localStorage.setItem('auth', false);
            that.props.dispatch({ type: 'AUTHENTICATION', payload: false });
            that.setState({ error_msg: error.message });
            that.props.dispatch({
              type: 'ERROR_MESSAGE',
              payload: error.message
            });
          });
        //console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.state.redirectProfile) return <Redirect to="/profile" />
    return (
      <React.Fragment>
        {this.state.error_msg && (
          <Alert
            message={this.state.error_msg}
            banner
            closable
            type='error'
            showIcon
          />
        )}
        <Form onSubmit={this.handleSubmit} className='login-form centered-div'>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your email!' }]
            })(
              <Input
                prefix={
                  <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                placeholder='email'
                autoComplete='email'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                prefix={
                  <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type='password'
                placeholder='Password'
                autoComplete='current-password'
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className='login-form-forgot' href='/'>
              Forgot password
            </a>
            <Button
              type='primary'
              htmlType='submit'
              className='login-form-button'>
              Log in
            </Button>
            Or <a href='/register'>register now!</a>
          </Form.Item>
        </Form>
      </React.Fragment>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default connect()(WrappedNormalLoginForm);
