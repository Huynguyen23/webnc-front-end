/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {Form, Table, DatePicker, Col, Button ,Typography, Row, Layout, Select } from 'antd';
import{IdcardFilled, BookFilled} from '@ant-design/icons';
import moment from 'moment';
import {getReportList, getBankList} from '../../Reducers/Actions/Report';
import Swal from 'sweetalert2';
import './ReportManagement.css';
const { Content } = Layout;
const { Title } = Typography;

const ReportManagement = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [bankList, setBankList] = useState([]); 
  const [reportList, setReportList] = useState([]);
  const [form] = Form.useForm();
  
  useEffect(()=>{
    setLoading(true);
    getReportList().then(res=>{
      setReportList(res.list);
      setData(res.list);
      setLoading(false);
    });
    getBankList().then(res=>{
      setBankList(res.list);
    })
  }, []);

  useEffect(()=>{
    let t = 0;
    data.forEach(element => {
      t += Number(element.so_tien); 
    });
    setTotal(t);
    let temp = data.slice();
    temp = temp.map(i => ({...i, ten_ngan_hang: bankList.find(t=>t.id === i.id_ngan_hang_doi_tac).ten}))
    console.log("temp", temp)
    //setData(temp);
    setReportList(temp);
  }, [bankList]);
  const onChange = () => {
    
  };

  const onFinish = (param) => {
    setReportList(data);
    if (param.start_date && param.end_date && (param.start_date > param.end_date)) {
      Swal.fire("Thông báo", "Ngày bắt đầu và ngày kết thúc không hợp lệ", "warning");
      return;
    } 
    if (param.start_date && !param.end_date) {
      const start_date = moment(param.start_date).format('DD/MM/YYYY');
      setReportList(reportList.filter(i=>moment(i.thoi_gian).format('DD/MM/YYYY') >= start_date));
      return;
    }
    if (!param.start_date && param.end_date) {
      const end_date = moment(param.end_date).format('DD/MM/YYYY');
      setReportList(reportList.filter(i=>moment(i.thoi_gian).format('DD/MM/YYYY') <= end_date));
    }
    if (param.start_date && param.end_date) {
      const start_date = moment(param.start_date).format('DD/MM/YYYY');
      const end_date = moment(param.end_date).format('DD/MM/YYYY');
      setReportList(reportList.filter(i=>moment(i.thoi_gian).format('DD/MM/YYYY') >= start_date && moment(i.thoi_gian).format('DD/MM/YYYY') <= end_date));
    }
    if (param.bank !== 'all') {
      setReportList(reportList.filter(i=>i.id_ngan_hang_doi_tac === param.bank));
    }
  };

  const columns = [
    {
      title: 'Tài Khoản Đối Tác',
      dataIndex: 'stk_doi_tac'
    },
    {
      title: 'Tài Khoản Nội Bộ',
      dataIndex: 'stk_noi_bo',
    },
    {
      title: 'Tên Đối Tác',
      dataIndex: 'ten_doi_tac',
    },
    {
      title: 'Ngân Hàng Đối Tác',
      dataIndex: 'ten_ngan_hang',
    },
    {
      title: 'Số Tiền Giao Dịch',
      dataIndex: 'so_tien'
    },
    {
      title: 'Nội Dung',
      dataIndex: 'noi_dung',
    },
    {
      title: 'Ngày Giao Dịch',
      dataIndex: 'thoi_gian',
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
      <Col span={4}>
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
        <Form.Item name="bank" initialValue="all">
          <Select style={{ width: 200}} onChange={onChange}>
            {bankList ? bankList.map(item => (
                <Select.Option key={item.id} value={item.id}>
                  {item.ten}
                </Select.Option>
              ))
            : null }
              <Select.Option key="all" value="all">
                  Tất cả
                </Select.Option>
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
      {/* <Col span={18}></Col>
      <Col span={6}>
    <div className="site-card-border-less-wrapper">
        <Card title="Tổng Số Tiền Đã Giao Dịch" bordered={false} style={{ width: 300 }}>
          <p style={{fontSize:20, color: '#3f8600'}}>Ngân hàng đã giao dịch: 
            {total.toLocaleString('vi', {
              style: 'currency',
              currency: 'VND',
            })}
          </p>
        </Card>
      </div>
      </Col> */}
      <Col span={16}></Col>
      <Col span={8}>
        <p style={{fontSize:17, color: '#006600', marginTop:50,  marginBottom: -20}}><span style={{color:"#006633", fontWeight:'bolder', fontSize:18}}>TỔNG SỐ TIỀN ĐÃ GIAO DỊCH: </span> 
            {total.toLocaleString('vi', {
              style: 'currency',
              currency: 'VND',
            })}
        </p>
      </Col>
    </Row>
    {/* <div className="site-statistic-demo-card">
      
    <Row gutter={16}>
    <Col span={16}></Col>
      <Col span={4}>
        <Card style={{marginTop:50}}>
          <Statistic
            title="Trong tuần này"
            value={11.28}
            precision={2}
            valueStyle={{ color: '#3f8600' }}
            prefix={<ArrowUpOutlined />}
            suffix="%"
          />
        </Card>
      </Col>
    </Row>
  </div> */}
    <Table
      columns={columns}
      onChange={onChange}
      dataSource={reportList}
      loading={loading}
      rowKey={i => i.id}
      scroll={{ x: true }}
      style={{marginTop:40}}
    />
  </Content>
  );
};

export default ReportManagement;