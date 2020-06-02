import React, { useState } from 'react';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Form, Input, Button } from 'antd';
import OtpInput from 'react-otp-input';
import Swal from 'sweetalert2';

import './OTP.css';

const { Content } = Layout;

const OTP = () => {
  const [OTP, setOTP] = useState("");
  return (
    <Layout className="site-layout">
      <Content>
        <Row>
          <Col className="col-login" span={24} style={{ display: 'flex' }}>
            <Form className="login-form" name="basic" >
              <div style={{ textAlign: 'center', marginBottom: 50 }}>
                <img alt="" src="extalk_logo.png" style={{ width: '150px' }} />

                <h3
                  style={{
                    fontWeight: 'bold',
                    marginBottom: 10,
                    color: 'rgba(0, 0, 0, 0.8)'
                  }}
                >
                  Nhập mã xác nhận
                </h3>
              </div>
              
               <OtpInput
                onChange={otp => setOTP(otp)}
                numInputs={6}
                value ={OTP}
                inputStyle="inputStyle" 
                separator={<span>-</span>}
              />
             
              <Form.Item>
          
              </Form.Item>
              <Form.Item>
                <Button
                  className="custom-button"
                  type="primary"
                  htmlType="submit"
                
                  style={{ float: 'right', margin: 0 }}
                >
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

export default OTP;
