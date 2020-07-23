import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

import {
  HomeOutlined,
  ContactsOutlined,
  BankFilled,
  HistoryOutlined,
  ControlOutlined,
  ApartmentOutlined
} from '@ant-design/icons';
import './MenuLeft.css';
import {RemindIcon, TransfrerIcon, CreateAcctIcon, RechargeIcon, EmployeeIcon} from './icons';
const { SubMenu } = Menu;
const MenuLeft = props => {
  const role = JSON.parse(localStorage.getItem('tokens')).role;
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
      case '/create-acct':
      setKey('6');
      break;
      case '/pay-money':
      setKey('7');
      break;
      case '/employee-management':
        setKey('9');
        break;
      case '/interbank-transfer':
        setKey('g1');
        break;
      case '/bank-transfer':
        setKey('g2');
        break;
      default:
        setKey('1');
    }
  }, []);

  const Menu0=()=>{
    return(
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
      <Menu.Item key="5">
        <Link to="/debt-reminder">
        <RemindIcon />
          {collapsed ? "" : <span style={{marginLeft:10}} >Quản Lí Nhắc Nợ</span>}
        </Link>
      </Menu.Item>
      {collapsed ?  <Menu.Item><TransfrerIcon/></Menu.Item> :
        <Menu.ItemGroup title={<span><TransfrerIcon /><span style={{marginLeft:8, color: '#006600'}}>Chuyển Khoản</span></span>}>
          <Menu.Item key="g1">
            <Link to="/interbank-transfer">
              <BankFilled style={{marginLeft:15}}/>
              <span>Nội Bộ</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="g2">
            <Link to="/bank-transfer">
              <ApartmentOutlined style={{marginLeft:15}}/>
              <span>Liên Ngân Hàng</span>
            </Link>
          </Menu.Item>
        </Menu.ItemGroup>
      }
       <Menu.Item key="8">
        <Link to="/history">
        <HistoryOutlined />
          {collapsed ? "" : <span>Lịch Sử</span>}
        </Link>
      </Menu.Item>
      {/* <Menu.Item key="9">
        <Link to="/employee-management">
        <EmployeeIcon />
        {collapsed ? "" : <span style={{marginLeft:10}}>Quản Lí Nhân Viên</span>}
        </Link>
      </Menu.Item>
      <Menu.Item key="10">
        <Link to="/report">
        <ControlOutlined />
        {collapsed ? "" : <span >Quản Lí Giao Dịch</span>}
        </Link>
      </Menu.Item> */}
      </Menu>
    );
  };
  const Menu1=()=>{
    return(
    <Menu
    className="menu-style"
      mode="inline"
      onClick={handleClick}
      defaultSelectedKeys={['1']}
      selectedKeys={[key]}
    >
      <Menu.Item>
       {collapsed ? "" : <span style={{fontSize:15, color:'#006600', paddingLeft:0}}>GIAO DỊCH VIÊN</span>}
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/">
          <HomeOutlined />
          <span>Danh Sách Tài Khoản</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="6">
        <Link to="/create-acct">
        <CreateAcctIcon />
        {collapsed ? "" : <span style={{marginLeft:10}} >Tạo Tài Khoản</span>}
        </Link>
      </Menu.Item>
      <Menu.Item key="7">
        <Link to="/pay-money">
          <RechargeIcon />
          {collapsed ? "" : <span style={{marginLeft:10}} >Nạp Tiền</span>}
        </Link>
      </Menu.Item>
      <Menu.Item key="8">
        <Link to="/history">
        <HistoryOutlined />
          {collapsed ? "" : <span>Lịch Sử</span>}
        </Link>
      </Menu.Item>
      </Menu>
    );
  };
  const Menu2=()=>{
    return(
      <Menu
      className="menu-style"
        mode="inline"
        onClick={handleClick}
        defaultSelectedKeys={['1']}
        selectedKeys={[key]}
      >
      <Menu.Item>
      {collapsed ? "" : <span style={{fontSize:15, color:'#006600', paddingLeft:0}}>QUẢN TRỊ VIÊN</span>}
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/">
          <HomeOutlined />
          <span>Danh Sách Tài Khoản</span>
        </Link>
      </Menu.Item>
      <Menu.Item key="9">
        <Link to="/employee-management">
        <EmployeeIcon />
        {collapsed ? "" : <span style={{marginLeft:10}}>Quản Lí Nhân Viên</span>}
        </Link>
      </Menu.Item>
      <Menu.Item key="10">
        <Link to="/report">
        <ControlOutlined />
        {collapsed ? "" : <span >Quản Lí Giao Dịch</span>}
        </Link>
      </Menu.Item>
      </Menu>
    );
  };
  return (
    role === 0 ? Menu0(): (role === 1 ? Menu1() : Menu2())
  );
};

export default MenuLeft;
