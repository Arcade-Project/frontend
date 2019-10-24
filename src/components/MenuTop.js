import React from 'react'
import {Menu, Layout, Icon} from 'antd'
import {Link} from 'react-router-dom'
import AvatarWithLevel from './AvatarWithLevel';
import {useSelector} from 'react-redux'
const {Header} = Layout;
const { SubMenu } = Menu;

export default function MenuTop() { 
  const getColor = useSelector(state => state.user.user.color);
  const getNickName = useSelector(state => state.user.user.nickname);
  const getLevel = useSelector(state => state.user.user.level);
  const auth = useSelector(state => state.auth.isAuthenticated)

  const IconSize = { fontSize: 24 };

  const renderUser = () => {
    if (auth){
      return(<Link to="/profile">
      <AvatarWithLevel
        level={getLevel}
        nickname={getNickName}
        color={getColor}
      />
      </Link>)
    }else{
      return (<Link to="/login">
      <Icon type='user-add' style={IconSize} />
      <span>Login</span>
      </Link>)
    }
  }

    return (
        <Layout style={{background: 'black', maxHeight: '10vh'}}>
        <Header >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ lineHeight: '10vh' }}
      >
      <Menu.Item key={0} style={{height: '100%'}}>
      {renderUser()}
      </Menu.Item>
        <Menu.Item key='1'>
        <Link to="/">
          <Icon type='home' style={IconSize} />
          <span>Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='2'>
        <Link to="/scoreboard">
          <Icon type='ordered-list' style={IconSize} />
          <span>Scoreboards</span>
          </Link>
        </Menu.Item>
        <SubMenu
          key='sub1'
          title={
            <span>
              <Icon type='user' style={IconSize} />
              <span>Players</span>
            </span>
          }>
          
          <Menu.Item key='3'>
          <Link to="/players/Top">
            <Icon type='crown' />
            Top
            </Link>
          </Menu.Item>
          <Menu.Item key='4'>
          <Link to="/players/Active">
            <Icon type='fire' />
            Active
            </Link>
          </Menu.Item>
          <Menu.Item key='5'>
          <Link to="/players/Friends">
            <Icon type='smile' />
            Friends</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='6'>
        <Link to="/notifications">
          <Icon type='notification' style={IconSize} />
          <span>Notifications</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
      </Layout>
    )
}
