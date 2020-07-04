/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {Form, Input, DatePicker, Col, Button ,Typography,Row, Layout } from 'antd';
import{IdcardFilled, ClearOutlined, PlusSquareFilled} from '@ant-design/icons';
import moment from 'moment';
import {addUser} from '../../Reducers/Actions/Users';
import Swal from 'sweetalert2';
import './CreateAcct.css';
const FormItem = Form.Item;
const { Content } = Layout;
const { Title } = Typography;
const CreateAcct = () => {
  
  const [form] = Form.useForm();
  const formItemLayout = {
    labelCol: {
      xs: { span: 12 },
      sm: { span: 8},
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  };
  const onFinish = (param) => {
    console.log("param", moment(param.ngay_sinh).format("YYYY-MM-DD"));
    param.ngay_sinh = moment(param.ngay_sinh).format("YYYY-MM-DD");
    addUser(param).then(res=>{
      if(res.status < 0){
        Swal.fire('Lỗi', res.msg, 'error');
      } else {
        Swal.fire('Chúc Mừng', res.msg, 'success');
      }
      
    });
  };

  return (
    <Content
      style={{
        margin: '20px 16px',
        padding: 20,
        borderRadius: '10px'
      }}
    >
    <Row >
      <Col span={18}>
        <Title level={3} style={{color: '#006633'}}>
        <IdcardFilled  style={{fontSize:30, marginRight: 10, color: '#009900'}}/>
          TẠO TÀI KHOẢN CHO KHÁCH HÀNG
        </Title>
      </Col>
    </Row>
    <Row >
    <Form onFinish={onFinish} >
    <FormItem
      {...formItemLayout}
      label="Email"
      hasFeedback
      rules={[{ required: true, message: 'Vui Lòng Nhập Email'}]}
      name="email"
    >
      <Input placeholder="Nhập vào email" id="error" />
    </FormItem>

    <FormItem
      {...formItemLayout}
      label="Họ Và Tên"
      hasFeedback
      name="ten"
      rules={[{ required: true, message: 'Vui Lòng Nhập Họ Và Tên'}]}
    >
      <Input placeholder="Họ và tên" id="success" />
    </FormItem>

    <FormItem
      {...formItemLayout}
      name="ngay_sinh"
      hasFeedback
      label="Ngày Sinh"
      rules={[{ required: true, message: 'Vui Lòng Chọn Ngày Sinh'}]}
    >
      <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" placeholder="Chọn Ngày"/>
    </FormItem>

    <FormItem
      {...formItemLayout}
      label="Địa Chỉ"
      hasFeedback
      rules={[{ required: true, message: 'Vui Lòng Nhập Địa Chỉ'}]}
      name="dia_chi"
    >
      <Input placeholder="Địa Chỉ" id="success" />
    </FormItem>

    <FormItem
      {...formItemLayout}
      hasFeedback
      label="Số CMND"
      name="cmnd"
      rules={[{ required: true, message: 'Vui Lòng Nhập Số CMND'}]}
    >
      <Input placeholder="CMND/Thẻ Căn Cước" id="error" />
    </FormItem>
    
    <FormItem
      {...formItemLayout}
      hasFeedback
      label="Số Điện Thoại"
      rules={[{ required: true, message: 'Vui Lòng Nhập Số Điện Thoại'}]}
      name="so_dien_thoai"
    >
      <Input placeholder="Số Điện Thoại" />
    </FormItem>
    <FormItem style={{textAlign:'center'}}>
      <Button style={{backgroundColor:"#006600", background: '#006633', borderColor:'#006633'}} type="primary" htmlType="submit" icon={<PlusSquareFilled />}>
        TẠO        
      </Button>
      <Button style={{marginLeft:10,backgroundColor:"#EEEEEE",color:'#444444', borderColor:'#EEEEEE'}} type="primary" htmlType="submit" icon={<ClearOutlined />}>
       LÀM MỚI
      </Button>
    </FormItem>
  </Form>
  </Row>
  </Content>
  );
};
export default CreateAcct;