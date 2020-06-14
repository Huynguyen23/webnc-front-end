/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-props-no-spreading */
import { Modal, Button, Form, Input, Select } from 'antd';
import { AppstoreAddOutlined, EditFilled } from '@ant-design/icons';
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import { getBankList } from '../../../Reducers/Actions/Bank';
import './AddDebtReminderModal.css';

const { Option } = Select;
const AddDebtReminderModal = props => {
  const info = JSON.parse(localStorage.getItem('tokens'));
  const { show, handleCancel, handleOk, values, addReceiver, updateReceiver } = props;
  const [loading, setLoading] = useState(false);
  const [banklist, setBankList] = useState([]);
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 8 }
  };

  const onFill = param => {
    console.log("param", param)
    form.setFieldsValue({
      id: param.id,
      stk_nguoi_nhan: param.stk_nguoi_nhan,
      ten_goi_nho:param.ten_goi_nho,
      id_ngan_hang: param.id_ngan_hang
    });
  };

  useEffect(() => {
    onFill(values);
    getBankList(setBankList);
  },[getBankList]);

  const onUpdate = () => {
    form
      .validateFields()
      .then(v => {
        setLoading(true);
        form.resetFields();
        const param = {
          stk_nguoi_gui: info.stkThanhToan,
          stk_nguoi_nhan: v.stk_nguoi_nhan,
          ten:v.ten_goi_nho
        };
        
        updateReceiver(param).then(res => {
          setLoading(false);
          if (res.status > 0) {
            console.log('r', res);
            handleCancel();
            handleOk();
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
        console.log("v", v);
        setLoading(true);
        const param = v;
        param.stk_nguoi_gui =  info.stkThanhToan;
        form.resetFields();
        addReceiver(param).then(res => {
          setLoading(false);
          if (res.status > 0) {
            console.log('r', res);
            handleCancel();
            handleOk();
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
          !values ? (
            <span style={{fontWeight:'bolder', fontSize:20, color: '#FFFFFF'}}>
              <AppstoreAddOutlined /> THÊM NGƯỜI NHẬN
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
          <Form.Item name="id" style={{ height: 0 }}>
            <Input hidden />
          </Form.Item>
          <Form.Item
            name="stk_nguoi_nhan"
            label="Số Tài Khoản"
            rules={[{ required: true }, { type: 'string' }]}
            style={{fontWeight:'bold'}}
          >
            <Input disabled={!!values} style={{color:'#666666'}}/>
          </Form.Item>
          <Form.Item
            name="ten_goi_nho"
            label="Tên Gợi Nhớ"
            rules={[{ required: true }, { type: 'string' }]}
            style={{fontWeight:'bold'}}
          >
            <Input />
          </Form.Item>
          <Form.Item
          name="id_ngan_hang"
          label="Ngân Hàng"
          style={{fontWeight:'bold'}}
          >
          <Select
              showSearch
              allowClear
              placeholder="Ngân Hàng"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              defaultValue='0'
            >
               {[
                ...banklist?.map(i => (
                  <Option key={i.id} value={i.id}>
                    {i.ten}
                  </Option>
                )),
                <Option key={null} value={null}>
                  Khác
                </Option>
              ]}
          </Select>
          
          </Form.Item>
        </Form>
      </Modal>
  );
};

export default AddDebtReminderModal;
