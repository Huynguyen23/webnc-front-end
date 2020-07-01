import { Modal, Button, Form, Input } from 'antd';
import Swal from 'sweetalert2';
import React, { useState } from 'react';
import { SecurityScanFilled } from '@ant-design/icons';
import {resetPass} from '../../../Reducers/Actions/Users';
import './ChangePassModal.css';
const ChangePassModal = props => {
  const { show, setRedirect, handleCancel, value } = props;
  const [loading, setLoading] = useState(false);

  const onFinish = param => {
    setLoading(true);
    console.log("value", value)
    if(param.newPin === param.confirmPin){
      resetPass({stk_thanh_toan: value, ma_pin_moi: param.newPin}).then(res =>{
      console.log("res", res);
      if (res.status > 0){
        Swal.fire("Thành Công", "Mã Pin Mới Của Bạn là:"+param.newPin, "success").then(()=>{
          setRedirect(true);
        });
        
      } else {
        Swal.fire("Lỗi", "Mã Pin Không Đúng", "error");
      }
    })
  } else {
    Swal.fire("Lỗi", "Mã Pin Mới và Mã Pin Xác Nhận Không Đúng", "error");
  }
  };
  const [form] = Form.useForm();
  return (
      <Modal
        visible={show}
       
        closable={false}
        style={{borderRadius:5}}
        footer={false}
      >
        <Form form={form} name="basic" onFinish={onFinish}>
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
                <p>Vui lòng nhập mã pin mới <br/> chúng tôi đổi mã pin cho bạn</p>
              </div>
              <Form.Item
                name="newPin"
                rules={[{ required: true, message: 'Nhập Mã Pin Mới' }]}
              >
                <Input.Password prefix={<SecurityScanFilled />}  placeholder="Mã Pin Mới"/>
              </Form.Item>
              <Form.Item
                name="confirmPin"
                rules={[{ required: true, message: 'Nhập Lại Mã Pin Mới' }]}
              >
                <Input.Password prefix={<SecurityScanFilled />}  placeholder="Xác Nhận Lại Mã Pin Mới"/>
              </Form.Item>
              <Form.Item>
                <Button
                  className="custom-button"
                  type="primary"
                  htmlType="submit"
                  style={{ width:'100%'}}
                >
                  ĐỔI MÃ PIN
                </Button>
              </Form.Item>
            </Form>
      </Modal>
  );
};

export default ChangePassModal;
