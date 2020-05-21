import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
  UserOutlined,
  MailOutlined,
  // UploadOutlined,
  ScheduleFilled,
  HomeOutlined,
  TeamOutlined,
  NodeIndexOutlined,
  AuditOutlined,
  SnippetsOutlined,
  ProfileOutlined
} from '@ant-design/icons';

const MenuLeft = () => {
  const [key, setKey] = useState(1);

  const handleClick = e => {
    setKey(e.key);
  };
  useEffect(() => {
    switch (window.location.pathname) {
      case '/company-management':
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
        <Link to="/">
          <HomeOutlined />
          <span>Dashboard</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default MenuLeft;
