import React, { useState, useEffect, Fragment } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Layout, Menu, Dropdown,Badge } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellFilled,
  CaretDownOutlined
} from '@ant-design/icons';
import './BankLayout.css';
import { MenuLeft } from './MenuLeft';
import { useAuth } from '../Routes/Context';

const { Header, Sider, Content } = Layout;

const BankLayout = props => {
  const { Child } = props;
  const info = JSON.parse(localStorage.getItem('tokens'));

  const { setAuthTokens } = useAuth();
  const logOut = () => {
    setAuthTokens(false);
    localStorage.removeItem('tokens');
  };
  const menu = (
    <Menu >
      <Menu.Item style={{fontWeight:'bold'}}>Đổi mật khẩu</Menu.Item>
      <Menu.Item style={{fontWeight:'bold'}} onClick={logOut}>Đăng xuất</Menu.Item>
    </Menu>
  );

  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });
  const [collapsed, setCollapsed] = useState(!isSmallScreen);
  const toggle = () => {
    setCollapsed(!collapsed);

  };

  return (
    <Layout className="body-layout">
      <Header style={{width:'100%'}}>
        <div style={{ display: 'flex', backgroundColor:'#FFFFFF'}} onClick={toggle}>
          <img
            id="sm-logo"
            className="logo1"
            src="/smartbanking.png"
            alt="logo"
            style={{
              objectFit: 'cover',
              objectPosition: '0 0',
              width: collapsed ? 64 : 170,
              marginRight: collapsed ? 6 : 20,
              marginLeft:10,
              height:70,
              transition: 'width 0.2s'
            }}
          />
        </div>
          {/* <div className="logo" /> */}
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle,
              style: { float: 'left' }
            }
          )}
          <Fragment style={{float:'right'}}>
          {collapsed ?
            <Badge className="ant-badge" count={5} style={{marginTop:24, fontWeight:'bold' }}>
              <BellFilled style={{marginTop:24,fontSize:20, float:'right'}}/>
            </Badge>
            :
            <Badge className="ant-badge1" count={5} style={{marginTop:24, fontWeight:'bold' }}>
              <BellFilled style={{marginTop:24,fontSize:20, float:'right'}}/>
            </Badge>
          }
            <Dropdown overlay={menu}>
              <span
                style={{fontSize:16, fontWeight:'bold' }}
              >
                {info.ten || ' '}
                <CaretDownOutlined/>
              </span>
            
            </Dropdown>
           
            </Fragment>
        </Header>
      <Layout className="site-layout">
      <Sider
        className="sider"
        trigger={null}
        collapsible
        collapsed={collapsed || isSmallScreen}
      >
        {/* <div style={{ display: 'flex' }} onClick={toggle}>
          <img
            id="sm-logo"
            className="logo1"
            src="/extalk_logo.png"
            alt="logo extalk"
            style={{
              objectFit: 'cover',
              objectPosition: '0 0',
              width: collapsed ? 58 : 140,
              height: 60,
              transition: 'width 0.2s'
            }}
          />
        </div> */}

        <MenuLeft collapsed={collapsed}/>
      </Sider>
       {/* <Header
          className="site-layout-background"
          style={{ padding: 0, textAlign: 'right', position: 'fixed', zIndex: 1, width: '100%' }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle,
              style: { float: 'left' }
            }
          )}

           <LoginOutlined style={{  float:'right', }} onClick={logOut} />
          <Dropdown overlay={menu}>
            <span
              style={{  marginRight: '40px', fontSize:16, fontWeight:'bold' }}
            >
              {info.ten || ' '}
              <CaretDownOutlined/>
            </span>
          
          </Dropdown>
        </Header> */}
        
        <Content
          className="site-layout-background"
          style={{
            margin: 10,
            padding: 24,
            marginTop: 10
          }}
        >
          {Child}
        </Content>
      </Layout>
    </Layout>
  );
};

export default BankLayout;
