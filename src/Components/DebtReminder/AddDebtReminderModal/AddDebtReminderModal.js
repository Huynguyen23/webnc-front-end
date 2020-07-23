import { Modal, Button, Form, Input } from 'antd';
import { AppstoreAddOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2';
import { getUserInfo } from '../../../Reducers/Actions/Users';
import React, { useState} from 'react';
import './AddDebtReminderModal.css';

const AddDebtReminderModal = props => {
  const info = JSON.parse(localStorage.getItem('tokens'));
  const { show, handleCancel, search, values, addReminder } = props;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 8 }
  };

  const onBlur =()=>{
    getUserInfo({stk_thanh_toan:form.getFieldValue('stk_nguoi_nhan')}, form.setFieldsValue)
  };

  const onOk = () => {
    form
      .validateFields()
      .then(v => {
        console.log("v", v);
        setLoading(true);
        const param = v;
        param.stk_nguoi_gui =  info.stkThanhToan;
        delete param.ten;
        form.resetFields();
        addReminder(param).then(res => {
          setLoading(false);
          if (res.status > 0) {
            search();
            handleCancel();
          } else {
            Swal.fire('Lỗi', res.msg, 'error');
          }
        });
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
      <Modal
        visible={show}
        title={
          <span style={{fontWeight:'bolder', fontSize:20, color: '#FFFFFF'}}>
            <AppstoreAddOutlined /> THÊM NHẮC NỢ
          </span>
          
        }
        onCancel={handleCancel}
        footer={
            <Button
              formTarget={form}
              htmlType="submit"
              key="btn2"
              type="primary"
              loading={loading}
              onClick={onOk}
              style={{ background: '#006600', borderColor: '#006600' }}
            >
              THÊM
            </Button>
        }
       
      >
        <Form
          form={form}
          {...layout}
          name="control-hooks2"
          wrapperCol={{ span: 12 }}
        >
          <Form.Item
            name="stk_nguoi_nhan"
            label="Số Tài Khoản"
            rules={[{ required: true }, { type: 'string' }]}
            style={{fontWeight:'bold'}}
          >
            <Input onBlur={onBlur} style={{color:'#666666'}}/>
          </Form.Item>
          <Form.Item
            name="ten"
            label="Tên Gợi Nhớ"
            rules={[{ required: true }, { type: 'string' }]}
          >
            <Input disabled/>
          </Form.Item>
          <Form.Item
            name="so_tien"
            label="Số Tiền"
            rules={[{ required: true }, { type: 'string' }]}
            
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="noi_dung"
            label="Nội Dung"
            rules={[{ required: true }, { type: 'string' }]}
           
          >
            <Input />
          </Form.Item>

        </Form>
      </Modal>
  );
};

export default AddDebtReminderModal;
