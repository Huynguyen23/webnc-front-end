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
  Input
} from 'antd';
import {
  InteractionFilled,
  CopyFilled,
} from '@ant-design/icons';
import Swal from 'sweetalert2';
import './InterBankTransfer.css';
import { getUserInfo } from '../../Reducers/Actions/Users';
import {getOTP} from '../../Reducers/Actions/Bank';
import {OTPModal} from './OTPModal';
const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export const InterBankTransfer = props => {
  const {data, getReceiverList} = props;
  const [isShow, setIsShow] = useState(true);
  const [OTP, setOTP] = useState(false);
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
    
    setValue(param);
    getOTP({stk_thanh_toan: info.stkThanhToan}); 
    setOTP(!OTP);
  };

  const btnClearHandler = () => {
    form.resetFields()
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
      dataIndex: 'ten',
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
          <Form.Item name="ten_nguoi_gui" label="TÊN NGƯỜI GỬI" initialValue={info.ten}>
            <Input readOnly/>
          </Form.Item>
          <Form.Item name="stk_nguoi_nhan" initialValue ='' label="TÀI KHOẢN NGƯỜI NHẬN" required={{message:"Không được để trống"}}>
            <Input onBlur={onChange}/>
          </Form.Item>
          <Form.Item name="ten" label="TÊN NGƯỜI NHẬN" initialValue =''> 
            <Input />
          </Form.Item>
          <Form.Item name="so_tien_gui" initialValue ='' label="SỐ TIỀN GỬI">
            <Input />
          </Form.Item>
          <Form.Item name="noi_dung" initialValue ='' label="NỘI DUNG CHUYỂN TIỀN">
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
            </Button>
              {OTP && (
                <OTPModal
                  show={OTP}
                  clear={btnClearHandler}
                  handleCancel={() => setOTP(false)}
                  value={value}
                />
              )}
            <Button style={{marginLeft: 20,backgroundColor:"#C0C0C0",color:'#000000',borderRadius:4, border:"#C0C0C0"}} type="primary" onClick={btnClearHandler}>
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