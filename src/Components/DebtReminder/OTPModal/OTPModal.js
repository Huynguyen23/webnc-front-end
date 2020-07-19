import { Modal, Button, Form } from 'antd';
import Swal from 'sweetalert2';
import OTPInput, { ResendOTP } from '../../../lib';
import React, { useState } from 'react';
import { useAuth } from '../../Routes/Context';
import { getOTP, verify } from '../../../Reducers/Actions/Bank';
import './OTPModal.css';
const OTPModal = props => {
  const { show, handleCancel, payDebt, values } = props;
  const info = JSON.parse(localStorage.getItem('tokens'));
  const [loading, setLoading] = useState(false);
  const [OTP, setOTP] = useState("");
  const { setAuthTokens } = useAuth();

  const setTokens = data => {
    localStorage.setItem('tokens', JSON.stringify(data));
    setAuthTokens(data);
  };

  const onFinish = param => {
    setLoading(true);
    verify({stk_thanh_toan: info.stkThanhToan, ma_otp: OTP}).then(res =>{
     if(res.status > 0){
        payDebt({
          id : values.id,
          stk_nguoi_gui: values.stk_nguoi_nhan,
          ten_nguoi_gui: values.ten,
          noi_dung_xoa: "hoan tat"
        }).then(res=>{
          if(res.status > 0){
            Swal.fire('Thông Báo', 'Đã Thanh Toán Nợ Thành Công', "success").then(res=>{
              info.soDuHienTai -= values.so_tien;
              setTokens(info);
            });
          } else {
            Swal.fire('Lỗi', 'Bạn Không Đủ Tiền', "error");
          }
          handleCancel();
        });
     } else {
      Swal.fire('Lỗi', 'Mã OTP Sai Rồi!!!', "error");
      setLoading(false);
      setOTP("");
     }
    })
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
        <ResendOTP onResendClick={() => getOTP({stk_thanh_toan: info.stkThanhToan})}/>
      </Modal>
  );
};

export default OTPModal;
