import React, { useState } from 'react';
import { SecurityScanFilled } from '@ant-design/icons';
import { Layout, Row, Col, Form, Input, Button } from 'antd';
import {OTPModal} from './OTPModal';
import {ChangePassModal} from './ChangePassModal';
import './ForgotPass.css';
import { Redirect } from 'react-router-dom';

const { Content } = Layout;

const ForgotPass = () => {
  const [OTP, setOTP] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [stkValue, setStkValue] = useState('');
  const [isClosed, setIsClosed] = useState(false);
  const [isChangePassClosed, setIsChangePassClosed] = useState(false);
  const [form] = Form.useForm();

 
  const onFinish = async param => {
     setStkValue(param.stk);
      setOTP(!OTP);
      if (isClosed){
        setIsChangePassClosed(!isChangePassClosed);
      }
  };

  return (
    <Layout className="site-layout">
      <Content>
        <Row>
          <Col className="col-login" span={24} style={{ display: 'flex' }}>
            <Form form={form} className="login-form" name="basic" onFinish={onFinish}>
              <div style={{ textAlign: 'center', marginBottom: 50 }}>
                <img alt="" src="sblogo.png" style={{ width: '150px' }} />
                <h3
                  style={{
                    fontWeight: 'bold',
                    marginBottom: 10,
                    color: 'rgba(0, 0, 0, 0.8)'
                  }}
                >
                  QUÊN MẬT KHẨU
                </h3>
                <p>Nhập vào số tài khoản <br/> chúng tôi sẽ làm mới mã pin của bạn</p>
              </div>
              <Form.Item
                name="stk"
                rules={[{ required: true, message: 'Nhập Số Tài Khoản Để Làm Mới Mã Pin' }]}
              >
                <Input prefix={<SecurityScanFilled />}  placeholder="Số Tài Khoản"/>
              </Form.Item>
              <Form.Item>
                <Button
                  className="custom-button"
                  type="primary"
                  htmlType="submit"
                  style={{ width:'100%'}}
                >
                  {redirect ?
                    <Redirect to="/login"/>
                    : null 
                  }
                  NHẬN MÃ XÁC THỰC
                </Button>
                {OTP && (
                  <OTPModal
                    show={OTP}
                    isClosed={setIsClosed}
                    handleCancel={() => setOTP(false)}
                    value={stkValue}
                    setIsChangePassClosed={setIsChangePassClosed}
                  />
                )}
               {isChangePassClosed && (
                <ChangePassModal
                  show={isChangePassClosed}
                  handleCancel={() => setIsChangePassClosed(false)}
                  value={stkValue}
                  setRedirect={setRedirect}
                />
              )}
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default ForgotPass;
