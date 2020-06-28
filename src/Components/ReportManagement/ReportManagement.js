import React, { useState } from 'react';
import {Form, Table, DatePicker, Card, Col, Button ,Typography, Row, Layout, Select } from 'antd';
import{IdcardFilled, BookFilled} from '@ant-design/icons';
import moment from 'moment';
import {addUser} from '../../Reducers/Actions/Users';
import Swal from 'sweetalert2';
import './ReportManagement.css';
const { Content } = Layout;
const { Title } = Typography;
const { Option } = Select;
const ReportManagement = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  
  const onChange = () => {
    
  };
  const onFinish = (param) => {
    console.log("param", moment(param.ngay_sinh).format("YYYY-MM-DD"));
    param.ngay_sinh = moment(param.ngay_sinh).format("YYYY-MM-DD");
    addUser(param).then(res=>{
      if(res.status < 0){
        console.log("aaa1", res);
        Swal.fire('Lỗi', res.msg, 'error');
      } else {
        console.log("aaa2", res);
        Swal.fire('Chúc Mừng', res.msg, 'success');
      }
      
    });
  };

  const columns = [
    {
      title: 'Mã Nhân Viên',
      dataIndex: 'taikhoan'
    },
    {
      title: 'Tên Nhân Viên',
      dataIndex: 'ten',
    },
    {
      title: 'Ngày Sinh',
      dataIndex: 'ngay_sinh',
    },
    {
      title: 'Địa Chỉ',
      dataIndex: 'dia_chi',
      
    },
    {
      title: 'Số CMND',
      dataIndex: 'cmnd',
    },
    {
      title: 'Ngày Tạo',
      dataIndex: 'ngay_tao',
      render: (value, row, index) => {
        return moment(value).format('DD/MM/YYYY');
      }
    }
  ]
  return (
    <Content
      style={{
        margin: '20px 16px',
        padding: 20,
        borderRadius: '10px'
      }}
    >
    <Row>
      <Col span={18} style={{}}>
        <Title level={3} style={{color: '#006633'}}>
          <IdcardFilled  style={{fontSize:30, marginRight: 10, color: '#009900'}}/>
          QUẢN LÍ GIAO DỊCH
        </Title>
      </Col>
    </Row>
    <Row>
      <Col span={6}>
      </Col>
      <Col>
        <Form 
          style={{textAlign:'center'}}
          name="customized_form_controls"
          layout="inline"
          onFinish={onFinish}
        >

        <Form.Item name="start_date">
            <DatePicker placeholder='Từ Ngày' onChange={onChange} style={{float:'left'}}/>
        </Form.Item>
        <Form.Item name="end_date">
            <DatePicker placeholder='Đến Ngày' onChange={onChange} style={{float:'left'}}/>
        </Form.Item>
        <Form.Item name="end_date">
          <Select defaultValue="all" style={{ width: 120}} allowClear>
            <Option value="lucy">Tất Cả</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{height:'90%', borderRadius: 4,background: '#006600', borderColor: '#006600' }}>
            <BookFilled />
            THỐNG KÊ
          </Button>
        </Form.Item>
      </Form>
    </Col>
    </Row>
    <Row>
      <Col span={18}></Col>
      <Col span={6}>
    <div className="site-card-border-less-wrapper">
        <Card title="Tổng Số Tiền Đã Giao Dịch" bordered={false} style={{ width: 300 }}>
          <p>Card content</p>
        </Card>
      </div>
      </Col>
    </Row>
    <Table
      columns={columns}
      onChange={onChange}
      loading={loading}
      rowKey={i => i.id}
      scroll={{ x: true }}
      style={{marginTop:40}}
    />
  </Content>
  );
};
export default ReportManagement;