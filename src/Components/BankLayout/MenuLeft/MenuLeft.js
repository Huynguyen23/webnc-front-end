import React, { useState, useEffect } from 'react';
import { Menu, Typography } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  ContactsOutlined
} from '@ant-design/icons';
import './MenuLeft.css';

const { Title } = Typography;
const MenuLeft = () => {
  const [key, setKey] = useState(1);

  const handleClick = e => {
    setKey(e.key);
  };
  useEffect(() => {
    switch (window.location.pathname) {
      case '/receiver-list':
        setKey('2');
        break;
        case '/transfer':
        setKey('3');
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
      <Menu.Item key="0">
        <span style={{fontSize:15, color:'#006600', paddingLeft:0}}>CHỨC NĂNG HỖ TRỢ</span>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/">
          <HomeOutlined />
          <span>Danh sách tài khoản</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/receiver-list">
        <ContactsOutlined />
          <span>Danh sách người nhận</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/transfer">
        <ContactsOutlined />
          <span>Chuyển khoản</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default MenuLeft;
