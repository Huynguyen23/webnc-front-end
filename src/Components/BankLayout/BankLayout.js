import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Layout, Menu, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  CaretDownOutlined
} from '@ant-design/icons';
import './BankLayout.css';
import { MenuLeft } from './MenuLeft';
import { useAuth } from '../Routes/Context';

const { Header, Sider } = Layout;

const BankLayout = props => {
  const { Child } = props;
  const { setAuthTokens } = useAuth();
  const logOut = () => {
    setAuthTokens(false);
    localStorage.removeItem('tokens');
  };
  const menu = (
    <Menu >
      <Menu.Item style={{fontWeight:'bold'}}>Hồ sơ</Menu.Item>
      <Menu.Item style={{fontWeight:'bold'}} onClick={logOut}>Đăng xuất</Menu.Item>
    </Menu>
  );

  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });
  const [collapsed, setCollapsed] = useState(isSmallScreen);
  const toggle = () => {
    setCollapsed(!collapsed);

  };

  return (
    <Layout className="body-layout">
      <Sider
        className="sider"
        trigger={null}
        collapsible
        collapsed={collapsed || isSmallScreen}
      >
        <div style={{ display: 'flex' }} onClick={toggle}>
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
        </div>

        <MenuLeft collapsed={collapsed}/>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, textAlign: 'right' }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle,
              style: { float: 'left' }
            }
          )}

          {/* <LoginOutlined style={{  float:'right', }} onClick={logOut} /> */}
          <Dropdown overlay={menu}>
            <span
              style={{  marginRight: '40px', fontSize:16, fontWeight:'bold' }}
            >
              Xin chào
              <CaretDownOutlined/>
            </span>
          
          </Dropdown>
        </Header>

        <div
          className="site-layout-background"
          style={{
            margin: 24,
            padding: 24
          }}
        >
          {Child}
        </div>
      </Layout>
    </Layout>
  );
};

export default BankLayout;
