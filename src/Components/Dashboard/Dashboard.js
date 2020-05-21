import React from 'react';
import { Card, Table , Row, Col, Typography } from 'antd';
import './Dashboard.css';

const { Title } = Typography;
const Dashboard = () => {
  const columns = [
    {
      title: 'Số tài khoản',
      dataIndex: 'acct_no'
    },
    {
      title: 'Loại Tài Khoản',
      dataIndex: 'acct_cate',
      align: 'right',
    },
    {
      title: 'Loại Tiền',
      dataIndex: 'money_cate',
    },
  ];
  
  const data = [
    {
      key: '1',
      acct_no: 'John Brown',
      money: '￥300,000.00',
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      money: '￥1,256,000.00',
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      money: '￥120,000.00',
      address: 'Sidney No. 1 Lake Park',
    },
  ];
  return (
    <div>
    <Row>
      <Title level={3}>DANH SÁCH TÀI KHOẢN</Title>
    </Row>
    <Row>
    <Col>
      <Card title="TÀI KHOẢN THANH TOÁN" bordered={false}>
        <p>Chủ Thẻ:</p>
        <p>Số Tài Khoản:</p>
        <p>Số Dư:</p>
      </Card> 
    </Col>
    </Row>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        title={()=> "TÀI KHOẢN TIẾT KIỆM"}
      />
  </div>
  );
};
export default Dashboard;
