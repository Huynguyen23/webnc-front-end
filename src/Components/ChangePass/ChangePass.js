import React, { useState } from 'react';
import { KeyOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Form, Input, Button } from 'antd';
import { useAuth } from '../Routes/Context';
import OtpInput from 'react-otp-input';
import Swal from 'sweetalert2';
import {changePass} from '../../Reducers/Actions/Users';

import './ChangePass.css';
import { Redirect } from 'react-router-dom';

const { Content } = Layout;

const ChangePass = () => {
  const { setAuthTokens } = useAuth();
  const [redirect, setRedirect] = useState(false);
  const info = JSON.parse(localStorage.getItem('tokens'));
  const onFinish = param => {
    if(param.ma_pin_moi !== param.ma_pin_check){
      Swal.fire("Lỗi", "Mã Pin Mới & Mã Xác Nhận Không Khớp", "error");
    } else {
      changePass({stk_thanh_toan: info.stkThanhToan,ma_pin:param.ma_pin, ma_pin_moi: param.ma_pin_moi}).then(res =>{
        
        if (res.status > 0){
          Swal.fire("Thành Công", "Mã Pin Đã Được Thay Đổi", "success");
          setAuthTokens(false);
          localStorage.removeItem('tokens');
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
                  THAY ĐỔI MÃ PIN
                </h3>
                <p>Nhập mã pin cũ và mã pin mới</p>
              </div>
              <Form.Item
                
                name="ma_pin"
                rules={[{ required: true, message: 'Nhập Mã Pin Cũ!' }]}
              >
                
                <Input.Password prefix={<KeyOutlined />}  placeholder="Mã Pin Cũ"/>
              </Form.Item>
              <Form.Item
                
                name="ma_pin_moi"
                rules={[{ required: true, message: 'Nhập Mã Pin Mới!' }]}
              >
                
                <Input.Password prefix={<KeyOutlined />}  placeholder="Mã Pin Mới"/>
              </Form.Item>
              <Form.Item
                
                name="ma_pin_check"
                rules={[{ required: true, message: 'Nhập Lại Mã Pin Mới!' }]}
              >
                
                <Input.Password prefix={<KeyOutlined />}  placeholder="Mã Xác Nhận"/>
              </Form.Item>
              <Form.Item>
                <Button
                  className="custom-button"
                  type="primary"
                  htmlType="submit"
                  style={{ width:'100%'}}
                >
                  {redirect ? <Redirect to="/login"/>: null }
                  ĐỔI MÃ PIN
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
