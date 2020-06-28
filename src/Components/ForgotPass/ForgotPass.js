import React, { useState } from 'react';
import { SecurityScanFilled } from '@ant-design/icons';
import { Layout, Row, Col, Form, Input, Button } from 'antd';
import { useAuth } from '../Routes/Context';
import Swal from 'sweetalert2';
import {changePass} from '../../Reducers/Actions/Users';
import {OTPModal} from './OTPModal';
import './ForgotPass.css';
import { Redirect } from 'react-router-dom';

const { Content } = Layout;

const ForgotPass = () => {
  const { setAuthTokens } = useAuth();
  const [OTP, setOTP] = useState(false);
  const [redirect, setRedirect] = useState(false);
  let value;
  const [isClosed, setIsClosed] = useState(false);
  const onFinish = param => {
    value = param.stk;
    setOTP(!OTP);
    if (isClosed){
      const newPin = Math.floor(Math.random() * 7);
      changePass({stk_thanh_toan: value, ma_pin:param.ma_pin, ma_pin_moi: newPin}).then(res =>{
        if (res.status > 0){
          localStorage.setItem("new_pin", newPin);
          setRedirect(!redirect);
        } else {
          Swal.fire("Lỗi", "Mã Pin Không Đúng", "error");
      }
      })
    }
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
                    <Redirect to="/change-password"/>
                    : null 
                  }
                  LÀM MỚI
                </Button>
                {OTP && (
                <OTPModal
                  show={OTP}
                  isClosed={setIsClosed}
                  handleCancel={() => setOTP(false)}
                  value={value}
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
