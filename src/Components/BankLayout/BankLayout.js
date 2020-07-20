/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
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
import { useAuth,useSocket } from '../Routes/Context';
import { Redirect, Link } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const BankLayout = props => {
  const { Child } = props;
  const info = JSON.parse(localStorage.getItem('tokens'));
  const [type, setType] = useState(0);
  const [response, setResponse] = useState();
  const [list, setList] =useState([]);
  const [count, setCount] = useState(0);
  const socket = useSocket();
  const { setAuthTokens } = useAuth();

  const setTokens = data => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };
  const logOut = () => {
    setAuthTokens(false);
    localStorage.removeItem('tokens');
  };

  const onClick =(item)=>{
    console.log(item);
    setCount(count-1);
    const newList = list.filter(i=> i.key !== item.key);
    setList(newList);
    return <Redirect to="/history"/>
  }
  useEffect(() => {
    if (socket) {
      socket.emit("stkTT", JSON.parse(localStorage.getItem("tokens")).stkThanhToan);
      // socket.on("notification", data => {
      //   console.log(data);
      // });
      socket.on('debt', data =>{ // co nguoi nhac no minh
        console.log('debt: co nguoi nhac no minh', data);
        setResponse(data);
        setCount(count+1);
        setType(1);
      });

      socket.on('deleteDebt0', data =>{ // no tu huy nhac no cua no rồi
        console.log('debt: nguoi ta tu huy nhac no cua nguoi ta: ',data);
        setCount(count+1);
        setResponse(data);
        setType(2);
      });

      socket.on('deleteDebt1', data =>{ // nó dám hủy nhắc nợ của mình !!!
        console.log('nguoi ta huy nhac no cua minh: ',data);
        setCount(count+1);
        setResponse(data);
        setType(3);
      });

      socket.on('payDebt', data=>{ // bạn hiền đã thanh toán nhắc nợ cho mình r nè
        console.log('co nguoi thanh toan no cho ban: ', data);
        info.soDuHienTai = parseInt(info.soDuHienTai) + parseInt(data.so_tien_gui);
        setTokens(info);
        setCount(count+1);
        setResponse(data);
        setType(4);
      });

      socket.on('receiveMoney', data=>{ // co nguoi chuyen tien cho minh
        console.log('co nguoi chuyen tien: ', data);
        info.soDuHienTai = parseInt(info.soDuHienTai) + parseInt(data.so_tien_gui);
        setTokens(info);
        setCount(count+1);
        setResponse(data);
        setType(5);
      });

      socket.on('receiveMoneyEmployee', data=>{ // tự nạp tiền vào tài khoản bằng nhân viên của ngân hàng
        console.log('ngan hang da nap tien cho ban: ', data);
        info.soDuHienTai = parseInt(info.soDuHienTai) + parseInt(data.so_tien_gui);
        setTokens(info);
        setCount(count+1);
        setResponse(data);
        setType(6);
      });
      socket.on('notification', data=>{ // thông báo khi ko online
        console.log('notification: ', data);
        setCount(count+1);
      });
    }
    
  },[socket]);
  const menu = (
    <Menu>
      <Menu.Item style={{fontWeight:'bold'}}><Link to="/change-password">Đổi mật khẩu</Link></Menu.Item>
      <Menu.Item style={{fontWeight:'bold'}} onClick={logOut}>Đăng xuất</Menu.Item>
    </Menu>
  );
  useEffect(()=>{
    let tempList = list;
  
    switch (type) {
      // case 0:
      //   tempList.push(<Menu.Item key={tempList.lenght} style={{fontWeight:'bold'}} onClick={onClick}><Link to="/history"></Link></Menu.Item>);
      //   break;
      case 1:
        tempList.push(<Menu.Item key={tempList.lenght} style={{fontWeight:'bold'}} onClick={onClick}><Link to="/history">Bạn nhận được 1 nhắn nợ từ {response.ten_nguoi_xoa}</Link></Menu.Item>);
        break;
      case 2:
        tempList.push(<Menu.Item key={tempList.length + 1} style={{fontWeight:'bold'}} onClick={onClick}><Link to="/history">{response.ten_nguoi_xoa} hủy nhắc nợ đã gửi cho bạn trước đó.</Link></Menu.Item>);
        break;
      case 3:
        tempList.push(<Menu.Item key={tempList.length + 1} style={{fontWeight:'bold'}} onClick={onClick}><Link to="/history">{response.stk_nguoi_gui} đã hủy nhắc nợ của bạn.</Link></Menu.Item>);
        break;
      case 4:
        tempList.push(<Menu.Item key={tempList.length + 1} style={{fontWeight:'bold'}} onClick={onClick}><Link to="/">{response.ten_nguoi_xoa} đã thanh toán nhắc nợ của bạn.</Link></Menu.Item>);
        break;
      case 5:
        tempList.push(<Menu.Item key={tempList.length + 1} style={{fontWeight:'bold'}} onClick={onClick}><Link to="/">{response.ten_nguoi_gui} đã chuyển tiền cho bạn.</Link></Menu.Item>);
        break;
      case 6:
        tempList.push(<Menu.Item key={tempList.length + 1} style={{fontWeight:'bold'}} onClick={onClick}>Ngân hàng đã chuyển tiền cho bạn.<Link to="/">{response.stk_nguoi_gui} đã chuyển tiền cho bạn.</Link></Menu.Item>);
        break;
      default:
        tempList.push(<Menu.Item key={0} style={{fontWeight:'bold'}} onClick={onClick}><Link to="/" >Bạn không có thông báo mới</Link></Menu.Item>);
        break;
    }

    if (tempList.length > 1){
      console.log("tempList", tempList);
      tempList = tempList.filter(i=> i.key !== "0");
      setCount(count -1 );
    }
    setList(tempList);
  }, [type]);

  const menuNoti = (
    <Menu>
     {list}
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
            <Badge className="ant-badge" count={count} style={{marginTop:24, fontWeight:'bold',marginRight:20 }}>
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
