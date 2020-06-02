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
  Collapse,
  Input
} from 'antd';
import {
  SearchOutlined,
  PlusSquareFilled,
  EditFilled,
  IdcardFilled
} from '@ant-design/icons';
import './DebtReminder.css';

const { Content } = Layout;
const { Title } = Typography;
const { Panel } = Collapse;

const DebtReminder = () => {
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
            DANH SÁCH NỢ CHƯA THANH TOÁN
          </Title>
        </Col>
        <Col span={6}>
          <Row gutter={10}>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                style={{ background: '#f55d3e', borderColor: '#f55d3e' }}
                icon={<PlusSquareFilled />}
                onClick={() => {
                  
                }}
              >
                THÊM
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Collapse defaultActiveKey={['1']} onChange={callback} bordered={false}>
        <Panel header="BỘ LỌC" key="1" className="form1">
          <Form form={form} {...layout} onFinish={onFinish} name="control-hooks">
            <Form.Item name="acct_receiver_cd" label="Tài Khoản Người Nhận">
              <Input />
            </Form.Item>
            <Form.Item name="receiver_nm" label="Tên Người Nhận">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button style={{backgroundColor:"#006600", background: '#006633', borderColor:'#006633'}} type="primary" htmlType="submit" icon={<SearchOutlined />}>
                TÌM KIẾM
              </Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
      <Table
        columns={columns}
        onChange={onChange}
        title={()=> "DANH SÁCH NGƯỜI NHẬN"}
      />
    </Content>
  );
};
export default DebtReminder;