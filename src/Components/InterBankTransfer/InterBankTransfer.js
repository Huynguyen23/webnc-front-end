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
  InteractionFilled,
  CopyFilled,
  IdcardFilled
} from '@ant-design/icons';
import './InterBankTransfer.css';
import { getUserInfo } from '../../Reducers/Actions/Users';
import {getOTP} from '../../Reducers/Actions/Bank';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export const InterBankTransfer = props => {
  const {data, getReceiverList} = props;
  const [isShow, setIsShow] = useState(true);
  const [toOTP, setToOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState({});
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 6 }
  };
  const info = JSON.parse(localStorage.getItem('tokens'));
  useEffect(() => {
    setLoading(true);
    getReceiverList({stk_nguoi_gui:info.stkThanhToan}).finally(() => {
      setLoading(false);
    });
  }, [getReceiverList, info.stkThanhToan]);
  const handleOk = () => {
  
  };
  const onFinish = param => {
    
    console.log("param", param);
    getOTP({stk_thanh_toan: info.stkThanhToan}); 
    setToOTP(!toOTP);
  };

  const handleDelete = param => {
    
  };
  const onChange = () => {getUserInfo({stk_thanh_toan:form.getFieldValue('stk_nguoi_nhan')}, form.setFieldsValue)};
  
  const callback = () => {
    setIsShow(!isShow);
  };
  const columns = [
    {
      title: 'Chọn',
      width:'2%',
      align: 'center',
      render: (text, record) => (
        <CopyFilled
          style={{ verticalAlign: 'center' }}
          onClick={() => {
            record.ten = record.ten_goi_nho;
           form.setFieldsValue(record)
          }}
        />
      )
    },
    {
      title: 'Số Tài Khoản',
      dataIndex: 'stk_nguoi_nhan',
      align: 'center',
      editable: true
    },
    {
      title: 'Tên Gợi Nhớ',
      align: 'center',
      dataIndex: 'ten_goi_nho',
      editable: true
    },
    {
      title: 'Ngân Hàng',
      dataIndex: 'id_ngan_hang',
      align: 'center',
      editable: true
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
          <InteractionFilled style={{fontSize:30, marginRight: 10, color: '#009900'}}/>
            CHUYỂN KHOẢN NỘI BỘ
          </Title>
        </Col>
      </Row>
        <Form form={form} {...layout} onFinish={onFinish} name="control-hooks">
        <Form.Item name="stk_nguoi_gui" label='TÀI KHOẢN THANH TOÁN NGUỒN' initialValue={info.stkThanhToan}>
          <Input readOnly />
          </Form.Item>
          <Form.Item name="stk_nguoi_nhan" label="TÀI KHOẢN NGƯỜI NHẬN" required={{message:"Không được để trống"}}>
            <Input onBlur={onChange}/>
          </Form.Item>
          <Form.Item name="ten" label="TÊN NGƯỜI NHẬN">
            <Input />
          </Form.Item>
          <Form.Item name="so_tien_gui" label="SỐ TIỀN GỬI">
            <Input />
          </Form.Item>
          <Form.Item name="noi_dung" label="NỘI DUNG CHUYỂN TIỀN">
            <TextArea />
          </Form.Item>
          <Form.Item name="phi" label="PHÍ GIAO DỊCH" initialValue = "0">
          <Select>
            <Option value="0" >Người Gửi Thanh Toán</Option>
            <Option value="1">Người Chuyển Thanh Toán</Option>
          </Select>
          </Form.Item>
          <Form.Item>
            <Button style={{backgroundColor:"#006600", border:"#006600"}} type="primary" htmlType="submit" >
              THANH TOÁN
              {toOTP ? <Redirect to="/otp" /> : null}
            </Button>

            <Button style={{marginLeft: 20,backgroundColor:"#C0C0C0",color:'#000000',borderRadius:4, border:"#C0C0C0"}} type="primary" onClick={()=>form.resetFields()}>
              LÀM MỚI
            </Button>
          </Form.Item>
        </Form>   
        <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        rowKey='stk_nguoi_nhan'
        title={()=> "DANH SÁCH NGƯỜI NHẬN"}
      />
    </Content>
  );
};