import React, { useState } from 'react';
import { MailOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Form, Input, Button } from 'antd';
import OtpInput from 'react-otp-input';
import Swal from 'sweetalert2';
import {verify} from '../../Reducers/Actions/Bank';

import './ChangePass.css';
import { Redirect } from 'react-router-dom';

const { Content } = Layout;

const ChangePass = () => {
  const [OTP, setOTP] = useState("");
  const [redirect, setRedirect] = useState(false);
  const info = JSON.parse(localStorage.getItem('tokens'));
  const onFinish = param => {
    verify({stk_thanh_toan: info.stkThanhToan, ma_otp: OTP}).then(res =>{
     if(res.status > 0){
      setRedirect(!redirect);
     }
    })
  };
  return (
    <Layout className="site-layout" >
      <Content>
        <Row>
          <Col className="col-login" span={24} style={{ display: 'flex' }}>
            <Form className="login-form" name="basic" onFinish={onFinish}>
              <div style={{ textAlign: 'center', marginBottom: 50 }}>
                <img alt="" src="sblogo.png" style={{ width: '150px' }} />

                <h3
                  style={{
                    fontWeight: 'bold',
                    marginBottom: 10,
                    color: 'rgba(0, 0, 0, 0.8)'
                  }}
                >
                  ĐỔI MẬT KHẨU
                </h3>
              </div>
              <Form.Item
                
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                
                <Input prefix={<MailOutlined />}  placeholder="Email"/>
              </Form.Item>
              <Form.Item>
                <Button
                  className="custom-button"
                  type="primary"
                  htmlType="submit"
                
                  style={{ width:'100%'}}
                >
                  {redirect ? <Redirect to="/interbank-transfer"/>: null }
                  Xác Nhận
                </Button>
              
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ChangePass;
