/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import {
  Layout,
  Row,
  Col,
  Button,
  Typography,
  Form,
  Result,
  Input,
  Card
} from 'antd';
import {
  InteractionFilled,
} from '@ant-design/icons';
import './PayMoney.css';
const { Content } = Layout;
const { Title,Text } = Typography;

export const PayMoney = props => {
  const [payInfo, setPayInfo] = useState({});
  const [isShow, setIsShow] =useState(false);
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 6 }
  };

  const onFinish = param => {
    setIsShow(!isShow);
    console.log(param);
    setPayInfo(param);
  };

  const result = () => {
    
    return (
      <Card style={{width:'35%', marginLeft:260}}>
        <Result
          status="success"
          title="THÔNG TIN NẠP TIỀN"
          subTitle={payInfo.ten_goi_nho}
          extra={[
            <Button type="primary" key="accept">
              Xác Nhận
            </Button>,
            <Button key="cancel">Hủy</Button>,
          ]}
        >
          <div>
            <Text
              strong
              style={{
                fontSize: 16,
              }}
            >
              <span>Số Tài Khoản:</span>{payInfo.stk_thanh_toan}
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