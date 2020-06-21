/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import { Modal, Button, Form, Input, Select } from 'antd';
import { AppstoreAddOutlined, EditFilled } from '@ant-design/icons';
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import './JobModal.css';

const { Option } = Select;
const JobModal = props => {
  const {
    dropdownData,
    show,
    handleCancel,
    handleOk,
    values,
    addJob,
    updateJob
  } = props;
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
  };

  const onFill = param => {
    console.log('param', param);
    form.setFieldsValue({
      id: param.id,
      name: param.name,
      code: param.code,
      field: param.fieldId
    });
  };

  useEffect(() => {
    onFill(values);
  });
  console.log(dropdownData);
  const dropdownList = [];
  dropdownData.forEach(e => {
    dropdownList.push(
      <Option key={e.fieldId} value={e.fieldId}>
        {e.fieldName}
      </Option>
    );
  });

  const onUpdate = () => {
    form
      .validateFields()
      .then(v => {
        setLoading(true);
        updateJob(v).then(res => {
          setLoading(false);
          if (res) {
            setLoading(false);
            form.resetFields();
            handleCancel();
            handleOk();
          } else {
            Swal.fire('Lỗi', 'Nghề nghiệp đã tồn tại', 'error');
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
        addJob(v).then(res => {
          if (res) {
            setLoading(false);
            form.resetFields();
            handleCancel();
            handleOk();
          } else {
            Swal.fire('Lỗi', '', 'error');
          }
        });
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };
  useEffect(() => {
    return () => {
      form.resetFields();
    };
  });
  return (
    <Modal
      getContainer={false}
      visible={show}
      title={
        !values ? (
          <span>
            <AppstoreAddOutlined /> THÊM NGHỀ NGHIỆP
          </span>
        ) : (
          <span>
            <EditFilled /> CẬP NHẬT NGHỀ NGHIỆP
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
            style={{ background: '#f55d3e', borderColor: '#f55d3e' }}
            loading={loading}
            onClick={onUpdate}
          >
            CẬP NHẬT
          </Button>
        ) : (
          <Button
            formTarget={form}
            htmlType="submit"
            key="btn2"
            type="primary"
            style={{ background: '#f55d3e', borderColor: '#f55d3e' }}
            loading={loading}
            onClick={onOk}
          >
            THÊM
          </Button>
        )
      ]}
    >
      <Form {...layout} form={form} name="control-hooks">
        <Form.Item name="id" style={{ height: 0, display: 'none' }}>
          <Input />
        </Form.Item>
        <Form.Item
          name="name"
          label="Tên Nghề Nghiệp"
          rules={[
            { required: true, message: 'Vui lòng nhập tên nghề nghiệp!!!' }
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="code"
          label="Mã Nghề Nghiệp"
          rules={[
            { required: true, message: 'Vui lòng nhập mã nghề nghiệp!!!' }
          ]}
        >
          <Input disabled={!!values} />
        </Form.Item>
        <Form.Item name="field" label="Lĩnh Vực">
          <Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Lĩnh vực"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {dropdownList}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default JobModal;
