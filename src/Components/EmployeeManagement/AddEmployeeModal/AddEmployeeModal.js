/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import { Modal, Button, Form, Input, DatePicker } from 'antd';
import { AppstoreAddOutlined, EditFilled } from '@ant-design/icons';
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './AddEmployeeModal.css';

const AddEmployeeModal = props => {
  const info = JSON.parse(localStorage.getItem('tokens'));
  const { show, handleCancel, values, addEmployee, updateEmployee } = props;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 8 }
  };

  const onFill = param => {
    console.log("param", param)
    
    form.setFieldsValue({
      id: param.id,
      cap_bac: param.cap_bac,
      cmnd: param.cmnd,
      dia_chi: param.dia_chi,
      he_so_luong: param.he_so_luong,
      ngay_sinh: moment(param.ngay_sinh),
      ngay_tao: moment(param.ngay_tao),
      tai_khoan: param.tai_khoan,
      ten: param.ten
    });
  };

  useEffect(() => {
    onFill(values);
  },[]);

  const onUpdate = () => {
    form
      .validateFields()
      .then(v => {
        setLoading(true);
        const param = v;
        param.ngay_sinh = moment(param.ngay_sinh).format("YYYY-MM-DD");
        updateEmployee(param).then(res => {
          setLoading(false);
          if (res.status > 0) {
            form.resetFields();
            Swal.fire('Thành công', 'Cập nhật thông tin thành công', 'success');
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

  const onOk = () => {
    form
      .validateFields()
      .then(v => {
        setLoading(true);
        const param = v;
        param.ngay_sinh = moment(param.ngay_sinh).format("YYYY-MM-DD");
        form.resetFields();
        addEmployee(v).then(res => {
          setLoading(false);
          if (res.status > 0) {
            Swal.fire('Đã Tạo Thành Công' , 'Tài Khoản:' + res.tai_khoan+'<br/>Mật Khẩu:'+ res.mat_khau, 'success');
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
const layoutUpdate =(
      <>
        <Form.Item name="id" style={{ height: 0 }}>
          <Input hidden />
        </Form.Item>
        <Form.Item
          name="tai_khoan"
          label="Mã Nhân Viên"
          rules={[{ required: true }, { type: 'string' }]}
          style={{fontWeight:'bold'}}
        >
          <Input disabled={!!values} style={{color:'#666666'}}/>
        </Form.Item>
      </>
);
  return (
      <Modal
        visible={show}
        title={
          !values ? (
            <span style={{fontWeight:'bolder', fontSize:20, color: '#FFFFFF'}}>
              <AppstoreAddOutlined /> THÊM NHÂN VIÊN
            </span>
          ) : (
            <span style={{fontWeight:'bolder', fontSize:20, color: '#FFFFFF'}}>
              <EditFilled /> CẬP NHẬT THÔNG TIN
            </span>
          )
        }
        onCancel={handleCancel}
        footer={[
          values ? (
            <Button
              formTarget={form}
              htmlType="submit"
              key="btn1"
              type="primary"
              loading={loading}
              onClick={onUpdate}
              style={{ background: '#006600', borderColor: '#006600' }}
            >
              CẬP NHẬT
            </Button>
          ) : (
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
          )
        ]}
      >
        <Form
          form={form}
          {...layout}
          name="control-hooks2"
          wrapperCol={{ span: 12 }}
        >
          {!!values ?  layoutUpdate : null}
          <Form.Item
            name="ten"
            hasFeedback
            label="Tên Nhân Viên"
            rules={[{ required: true }, { type: 'string' }]}
            style={{fontWeight:'bold'}}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dia_chi"
            label="Địa Chỉ"
            hasFeedback
            rules={[{ required: true }, { type: 'string' }]}
            style={{fontWeight:'bold'}}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="ngay_sinh"
            hasFeedback
            label="Ngày Sinh"
            rules={[{ required: true, message: 'Vui Lòng Chọn Ngày Sinh'}]}
          >
            <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" placeholder="Chọn Ngày"/>
          </Form.Item>
          <Form.Item
            name="cmnd"
            label="Số CMND"
            hasFeedback
            rules={[{ required: true }, { type: 'string' }]}
            style={{fontWeight:'bold'}}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
  );
};

export default AddEmployeeModal;
