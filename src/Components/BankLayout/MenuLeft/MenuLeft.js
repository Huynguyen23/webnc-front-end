import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import {
  HomeOutlined,
  ContactsOutlined,
  SendOutlined,
  ApartmentOutlined
} from '@ant-design/icons';
import './MenuLeft.css';

const { SubMenu } = Menu;
const MenuLeft = props => {
  const {collapsed} =props;
  const [key, setKey] = useState(1);
  const handleClick = e => {
    setKey(e.key);
  };
    
  useEffect(() => {
    switch (window.location.pathname) {
      case '/receiver-list':
        setKey('2');
        break;
      case '/otp':
        setKey('3');
        break;
        
      case '/debt-reminder':
        setKey('5');
        break;
      case '/bank-transfer':
        setKey('g1');
        break;
      case '/interbank-transfer':
        setKey('g2');
        break;
      default:
        setKey('1');
    }
  }, []);

  return (
    <Menu
    className="menu-style"
      mode="inline"
      onClick={handleClick}
      defaultSelectedKeys={['1']}
      selectedKeys={[key]}
    >
      <Menu.Item>   
      {collapsed ? "" : <span style={{fontSize:15, color:'#006600', paddingLeft:0}}>CHỨC NĂNG HỖ TRỢ</span>}
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/">
          <HomeOutlined />
          <span>Danh Sách Tài Khoản</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/receiver-list">
        <ContactsOutlined />
          <span>Danh Sách Người Nhận</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/otp">
        <ContactsOutlined />
          <span>OTP</span>
        </Link>
      </Menu.Item>
      {/* <Menu.Item key="3">
        <Link to="/transfer">
        <ContactsOutlined />
          <span>Chuyển khoản</span>
        </Link><SendOutlined />
      </Menu.Item> */}
      <Menu.Item key="5">
        <Link to="/debt-reminder">
        <ContactsOutlined />
          <span>Quản Lí Nhắc Nợ</span>
        </Link>
      </Menu.Item>
      {collapsed ?  <Menu.Item><ContactsOutlined/></Menu.Item> :
        <Menu.ItemGroup title={<span><SendOutlined style={{marginRight:10}}/><span>Chuyển Khoản</span></span>}>
          <Menu.Item key="g1">
            <Link to="/bank-transfer">
              <ContactsOutlined />
              <span>Nội Bộ</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="g2">
            <Link to="/interbank-transfer">
              <ApartmentOutlined />
              <span>Liên Ngân Hàng</span>
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>


      }
    </Menu>
  );
};

export default MenuLeft;
