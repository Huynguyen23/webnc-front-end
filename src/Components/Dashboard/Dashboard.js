import React from 'react';
import { Card, Table , Row, Col, Typography } from 'antd';
import { BookFilled } from '@ant-design/icons';
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
      align: 'center',
    },
    {
      title: 'Loại Tiền',
      dataIndex: 'money_cate',
    },
  ];
  
  const data = [
  ];
  return (
    <div>
    <Row>
      <Col>  
        <Title level={3} style={{color: '#006633'}}>
          <BookFilled style={{fontSize:30, marginRight: 10, color: '#009900'}}/>
          DANH SÁCH TÀI KHOẢN
        </Title>
      </Col>
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
