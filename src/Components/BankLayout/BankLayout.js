import React, { useState, useEffect, Fragment } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Layout, Menu, Dropdown,Badge, notification, Row, Col } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellFilled,
  CaretDownOutlined
} from '@ant-design/icons';
import './BankLayout.css';
import { MenuLeft } from './MenuLeft';
import { useAuth } from '../Routes/Context';
import { Redirect, Link } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const BankLayout = props => {
  const { Child } = props;
  const info = JSON.parse(localStorage.getItem('tokens'));
  const [type, setType] = useState();
  const { setAuthTokens } = useAuth();
  const logOut = () => {
    setAuthTokens(false);
    localStorage.removeItem('tokens');
  };

  const menu = (
    <Menu>
      <Menu.Item style={{fontWeight:'bold'}}><Link to="/change-password">Đổi mật khẩu</Link></Menu.Item>
      <Menu.Item style={{fontWeight:'bold'}} onClick={logOut}>Đăng xuất</Menu.Item>
    </Menu>
  );
  const MenuList =()=>{
    const list = [];
  
    switch (type) {
      case 0:
        list.push(<Menu.Item style={{fontWeight:'bold'}}><Link to="/">{} đã chuyển tiền cho bạn.</Link></Menu.Item>);
        break;
      case 1:
        list.push(<Menu.Item style={{fontWeight:'bold'}}><Link to="/">Ngân hàng đã chuyển tiền cho bạn.</Link></Menu.Item>);
        break;
      case 2:
        list.push(<Menu.Item style={{fontWeight:'bold'}}><Link to="/">Bạn nhận được 1 nhắn nợ từ {}</Link></Menu.Item>);
        break;
      case 3:
    list.push(<Menu.Item style={{fontWeight:'bold'}}><Link to="/">{} đã hủy nhắc nợ của bạn.</Link></Menu.Item>);
        break;
      case 4:
    list.push(<Menu.Item style={{fontWeight:'bold'}}><Link to="/">{} hủy nhắc nợ đã gửi cho bạn trước đó.</Link></Menu.Item>);
        break;
      case 5:
    list.push(<Menu.Item style={{fontWeight:'bold'}}><Link to="/">{} đã thanh toán nhắc nợ của bạn.</Link></Menu.Item>);
        break;
      default:
        list.push(<Menu.Item style={{fontWeight:'bold'}}><Link to="/">Bạn Không có thông báo mới</Link></Menu.Item>);
        break;
    }
    return list;
  };

  const menuNoti = (
    <Menu>
     {MenuList()}
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
      <Row >
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
   
          <Col span={10}>
          {/* <div className="logo" /> */}
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: toggle,
              style: { float: 'left' }
            }
          )}
          </Col>
          <Col span={ collapsed ? 12: 10}>
            <div style={{float:'right'}}>
            <Badge className="ant-badge" count={5} style={{marginTop:24, fontWeight:'bold',marginRight:20 }}>
              <Dropdown overlay={menuNoti}>
                <BellFilled style={{marginTop:24,fontSize:20}}/>
              </Dropdown>
            </Badge>
        
            <Dropdown overlay={menu}>
              <span
                style={{fontSize:16, fontWeight:'bold', marginLeft:20}}
              >
                {info.ten || ' '}
                <CaretDownOutlined/>
              </span>
            
            </Dropdown>
            </div>
          </Col>
          </Row>
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
