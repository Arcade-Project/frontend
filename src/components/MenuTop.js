import React, {useState, useEffect} from 'react'
import {Menu, Layout, Icon} from 'antd'
import {Link, useLocation} from 'react-router-dom'
import AvatarWithLevel from './AvatarWithLevel';
import {useSelector} from 'react-redux'
const {Header} = Layout;
const { SubMenu } = Menu;

export default function MenuTop() { 
  const getColor = useSelector(state => state.user.color);
  const getNickName = useSelector(state => state.user.nickname);
  const getLevel = useSelector(state => state.user.level);
  const auth = useSelector(state => state.auth.isAuthenticated)


  const where = useLocation();
  const [selected, setSelected] = useState(['home']);

  const IconSize = { fontSize: 24 };

  useEffect(() => {
    switch (where.pathname) {
      case '/':
        setSelected(['home']);
        break;
      case '/scoreboard':
        setSelected(['scoreboard']);
        break;
      case '/notifications':
        setSelected(['notifications']);
        break;
      case '/players/Top':
        setSelected(['top']);
        break;
      case '/players/Active':
        setSelected(['active']);
        break;
      case '/players/Friends':
        setSelected(['friends']);
        break;
      default:
            setSelected(['0']);
            break;
    }
  }, [where]);

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
        <Layout style={{background: '#001529', maxHeight: '10vh'}}>
        <Header >
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        style={{ lineHeight: '10vh' }}
        selectedKeys={selected}>
      <Menu.Item key={0} style={{height: '100%'}}>
      {renderUser()}
      </Menu.Item>
        <Menu.Item key='home'>
        <Link to="/">
          <Icon type='home' style={IconSize} />
          <span>Home</span>
          </Link>
        </Menu.Item>
        <Menu.Item key='scoreboard'>
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
          
          <Menu.Item key='top'>
          <Link to="/players/Top">
            <Icon type='crown' />
            Top
            </Link>
          </Menu.Item>
          <Menu.Item key='active'>
          <Link to="/players/Active">
            <Icon type='fire' />
            Active
            </Link>
          </Menu.Item>
          <Menu.Item key='friends'>
          <Link to="/players/Friends">
            <Icon type='smile' />
            Friends</Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key='notifications'>
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
