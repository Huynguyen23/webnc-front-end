/* eslint-disable react/jsx-props-no-spreading */
import { Modal, Button, Form, Input, Select } from 'antd';
import { AppstoreAddOutlined, EditFilled } from '@ant-design/icons';
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import './AddReceiverModal.css';

const { Option } = Select;
const AddReceiverModal = props => {
  const { show, handleCancel, handleOk, values, addReceiver, updateReceiver, banklist } = props;
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 8 }
  };

  const onFill = param => {
    form.setFieldsValue({
      id: param.id,
      name: param.name,
      code: param.code
    });
  };

  useEffect(() => {
    onFill(values);
  });

  const onUpdate = () => {
    form
      .validateFields()
      .then(v => {
        setLoading(true);
        form.resetFields();
        updateReceiver(v).then(res => {
          setLoading(false);
          if (res) {
            handleCancel();
            handleOk();
          } else {
            Swal.fire('Lỗi', 'Lĩnh vực đã tồn tại', 'error');
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
        form.resetFields();
        addReceiver(v).then(res => {
          if (res) {
            handleCancel();
            handleOk();
          } else {
            Swal.fire('Lỗi', 'Lĩnh vực đã tồn tại', 'error');
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
          name="control-hooks"
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
            <Input />
          </Form.Item>
          <Form.Item
            name="name"
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
              // defaultValue={0}
            >
              {/* {[
                ...banklist?.map(i => (
                  <Option key={i.id} value={i.id}>
                    {i.name}
                  </Option>
                )),
                <Option key={null} value={null}>
                  Khác
                </Option>
              ]} */}
          </Select>
          
          </Form.Item>
        </Form>
      </Modal>
  );
};

export default AddReceiverModal;
