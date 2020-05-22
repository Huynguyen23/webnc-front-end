import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  HomeOutlined,
  ContactsOutlined
} from '@ant-design/icons';

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
      default:
        setKey('1');
    }
  }, []);

  return (
    <Menu
      className="ant-menu"
      mode="inline"
      onClick={handleClick}
      defaultSelectedKeys={['1']}
      selectedKeys={[key]}
    >
      <Menu.Item key="1">
        <Link to="/dashboard">
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

    </Menu>
  );
};

export default MenuLeft;
