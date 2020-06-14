/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  Layout,
  Row,
  Col,
  Button,
  Typography,
  Form,
  Table,
  Select,
  Collapse,
  Input
} from 'antd';
import {
  SearchOutlined,
  PlusSquareFilled,
  EditFilled,
  IdcardFilled
} from '@ant-design/icons';
import './BankTransfer.css';

const { Content } = Layout;
const { Title } = Typography;

const BankTransfer = () => {
  const [isShow, setIsShow] = useState(true);
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 6 }
  };

  const handleOk = () => {
  
  };
  const onFinish = param => {
    
  };

  const handleDelete = param => {
    
  };
  const onChange = () => {};
  const callback = () => {
    setIsShow(!isShow);
  };
  const columns = [
    {
      title: 'Số Tài Khoản',
      dataIndex: 'acct_no',
      editable: true
    },
    {
      title: 'Tên Gợi Nhớ',
      dataIndex: 'suggest_cd',
      editable: true
    },
    {
      title: 'Điều Chỉnh',
      dataIndex: 'update',
      align: 'center',
      render: (text, record) => (
        <EditFilled
          style={{ verticalAlign: 'center' }}
          onClick={() => {
           
          }}
        />
      )
    },
    {
      title: 'Loại Bỏ',
      dataIndex: 'delete',
      align: 'center'
        
    }
  ];
  return (
    <Content
      style={{
        margin: '20px 16px',
        padding: 20,
        borderRadius: '10px'
      }}
    >
      <Row>
        <Col span={18}>
          <Title level={3} style={{color: '#006633'}}>
          <IdcardFilled  style={{fontSize:30, marginRight: 10, color: '#009900'}}/>
            CHUYỂN KHOẢN
          </Title>
        </Col>
      </Row>
        <Form form={form} {...layout} onFinish={onFinish} name="control-hooks">
        <Form.Item name = "acct_pay" label="Tài Khoản thanh toán nguồn">
          <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Lĩnh vực"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              
          </Select>
          </Form.Item>
          <Form.Item name="acct_receiver_cd" label="Tài Khoản Người Nhận">
            <Input />
          </Form.Item>
          <Form.Item name="receiver_nm" label="Tên Người Nhận">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button style={{backgroundColor:"#006600", borderColor: '#006600'}} type="primary" htmlType="submit" icon={<SearchOutlined />}>
              CHUYỂN TIỀN
            </Button>
          </Form.Item>
        </Form>   
      <Table
        columns={columns}
        onChange={onChange}
        title={()=> "DANH SÁCH NGƯỜI NHẬN"}
      />
    </Content>
  );
};
export default BankTransfer;