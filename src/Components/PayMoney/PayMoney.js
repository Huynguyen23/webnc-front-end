/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  Layout,
  Row,
  Col,
  Button,
  Typography,
  Form,
  Select,
  Result,
  Input,
  Card
} from 'antd';
import {
  InteractionFilled,
  CopyFilled,
  IdcardFilled
} from '@ant-design/icons';
import './PayMoney.css';
import { getUserInfo } from '../../Reducers/Actions/Users';
import {getOTP, sendMoney} from '../../Reducers/Actions/Bank';
import { Redirect, Route, BrowserRouter as Router } from 'react-router-dom';
const { Content } = Layout;
const { Title,Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export const PayMoney = props => {
  const [payInfo, setPayInfo] = useState({});
  const [isShow, setIsShow] =useState(false);
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 6 }
  };
  
  const handleOk = () => {
    sendMoney({stk_nguoi_nhan: payInfo.stk_nguoi_nhan, so_tien_gui: payInfo.so_tien_gui}).then(res=>{
      console.log("res", res)
    })
  };
  const onFinish = param => {
    setIsShow(!isShow);
    console.log(param);
    setPayInfo(param);
  };

  const handleDelete = param => {
    
  };
  
  const result = () => {
    
    return (
      <Card style={{width:'35%', marginLeft:260}}>
        <Result
          status="success"
          title="THÔNG TIN NẠP TIỀN"
          subTitle={payInfo.ten_goi_nho}
          extra={[
            <Button type="primary" key="accept" onClick={handleOk}>
              Xác Nhận
            </Button>,
            <Button key="cancel" onClick={()=> setIsShow(false)}>Hủy</Button>,
          ]}
        >
          <div>
            <Text
              strong
              style={{
                fontSize: 16,
              }}
            >
              <span>Số Tài Khoản:</span>{payInfo.stk_nguoi_nhan}
            </Text>
            <br/>
            <Text 
            strong
            style={{
              fontSize: 16,
            }}
            >
                Số Tiền:{payInfo.so_tien_gui}
            </Text>
          </div>
        </Result>
      </Card>
    );
  };
  
  return (
    <Content
      style={{
        margin: '20px 16px',
        padding: 20,
        borderRadius: '10px'
      }}
    >
      {isShow ? result() :
      <div>
        <Row>
          <Col span={18}>
            <Title level={3} style={{color: '#006633'}}>
            <InteractionFilled style={{fontSize:30, marginRight: 10, color: '#009900'}}/>
              NẠP TIỀN 
            </Title>
          </Col>
        </Row>
        <Form form={form} {...layout} onFinish={onFinish} name="control-hooks">
          <Form.Item name="stk_nguoi_nhan" label="SỐ TÀI KHOẢN" required={{message:"Không được để trống"}}>
            <Input />
          </Form.Item>
          <Form.Item name="so_tien_gui" label="SỐ TIỀN GỬI">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button style={{backgroundColor:"#006600", border:"#006600"}} type="primary" htmlType="submit" >
              NẠP
            </Button>
          </Form.Item>
        </Form>
      </div>
      }  

    </Content>
  );
};