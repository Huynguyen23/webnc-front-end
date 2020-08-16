import React, { useState } from 'react';
import { Layout, Row, Col, Form, Button } from 'antd';
import OtpInput from 'react-otp-input';
import {verify} from '../../Reducers/Actions/Bank';

import './OTP.css';
import { Redirect } from 'react-router-dom';

const { Content } = Layout;

const OTP = () => {
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
    <Layout className="site-layout">
      <Content>
        <Row>
          <Col className="col-login" span={24} style={{ display: 'flex' }}>
            <Form className="login-form" name="basic" onFinish={onFinish}>
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
                  {redirect ? <Redirect to="/interbank-transfer"/>: null }
                  Xác Nhận
                </Button>
                <Button
                className="custom-button"
                  type="primary"
                  htmlType="submit"
                  style={{backgroundColor:'#DDDDDD',color:'#000000', float: 'right', marginRight: 20 }}
                >
          
                  Gửi Lại
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
