import { Modal, Button, Form } from 'antd';
import Swal from 'sweetalert2';
import OTPInput, { ResendOTP } from '../../../lib';
import React, { useState, useEffect } from 'react';
import { getOTP, verify } from '../../../Reducers/Actions/Bank';
import './OTPModal.css';
const OTPModal = props => {
  const { show,setIsChangePassClosed, handleCancel, isClosed, value } = props;
  const [loading, setLoading] = useState(false);
  const [OTP, setOTP] = useState("");

  useEffect(()=>{
    getOTP({stk_thanh_toan: value});
  },[show, value]);
  const onFinish = param => {
    setLoading(true);
    verify({stk_thanh_toan: value, ma_otp: OTP}).then(res =>{
     if(res.status > 0){
          Swal.fire('Thông Báo', 'Xác thực email thành công', "success").then(()=>{
            isClosed(true);
            setIsChangePassClosed(true);
            handleCancel();
          });
         
        } else {
          Swal.fire('Lỗi', 'Mã OTP Sai Rồi!!!', "error");
          setLoading(false);
          setOTP("");
        }
      
     }
    )
  };
  const [form] = Form.useForm();
  return (
      <Modal
        visible={show}
        width='358px'
        closable={false}
        style={{borderRadius:5}}
        footer={[
            <Button
              formTarget={form}
              htmlType="submit"
              key="btn1"
              type="primary"
              onClick={handleCancel}
              style={{height:'50%', backgroundColor:"#C0C0C0",color:'#000000',borderRadius:4, border:"#C0C0C0"}}
            >
              QUAY LẠI
            </Button>,
            <Button
              formTarget={form}
              htmlType="submit"
              key="btn2"
              type="primary"
              loading={loading}
              onClick={onFinish}
              style={{height:'20%', background: '#006600', borderColor: '#006600', borderRadius:5 }}
            >
              XÁC THỰC
            </Button> 
        ]}
      >
        <h3 style={{textAlign:'center', fontWeight:'bolder', color:'#006600'}}>MÃ XÁC THỰC</h3>
        <p style={{textAlign:'center'}}>Vui lòng kiểm tra email và nhập mã xác thực</p>
        <OTPInput
          value={OTP}
          onChange={setOTP}
          autoFocus
          OTPLength={6}
          otpType="number"
          disabled={false}
        />
        <ResendOTP onResendClick={() => getOTP({stk_thanh_toan: value})}/>
      </Modal>
  );
};

export default OTPModal;
