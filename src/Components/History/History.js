/* eslint-disable react/jsx-props-no-spreading */
import React  from 'react';
import {
  Layout,
  Row,
  Col,
  Typography,
  Tabs,
  Table
} from 'antd';
import {
  InteractionFilled,
  CopyFilled,
  IdcardFilled
} from '@ant-design/icons';
import './History.css';
const { Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;
export const History = props => {
 
  const columns = [
    {
      title: 'Người Gửi',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name - b.name,
        multiple: 4,
      },
    },
    {
      title: 'Số Tài Khoản',
      dataIndex: 'chinese',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 3,
      },
    },
    {
      title: 'Nội Dung',
      dataIndex: 'content',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 2,
      },
    },
    {
      title: 'English Score',
      dataIndex: 'english',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 1,
      },
    },
  ];
  
  const data = [
    {
      key: '1',
      name: 'John Brown',
      chinese: 98,
      math: 60,
      english: 70,
    },
    {
      key: '2',
      name: 'Jim Green',
      chinese: 98,
      math: 66,
      english: 89,
    },
    {
      key: '3',
      name: 'Joe Black',
      chinese: 98,
      math: 90,
      english: 70,
    },
    {
      key: '4',
      name: 'Jim Red',
      chinese: 88,
      math: 99,
      english: 89,
    },
  ];
  
  const onChange = (pagination, filters, sorter, extra)=> {
    console.log('params', pagination, filters, sorter, extra);
  }
 
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
            LỊCH SỬ GIAO DỊCH
          </Title>
        </Col>
      </Row>
      <div className="card-container">
    <Tabs type="card">
      <TabPane tab="GIAO DỊCH NHẬN TIỀN" key="1">
      <Table columns={columns} dataSource={data} onChange={onChange} />
      </TabPane>
      <TabPane tab="GIAO DỊCH CHUYỂN KHOẢN" key="2">
      <Table columns={columns} dataSource={data} onChange={onChange} />
      </TabPane>
      <TabPane tab="GIAO DỊCH THANH TOÁN NHẮC NỢ" key="3">
      <Table columns={columns} dataSource={data} onChange={onChange} />
      </TabPane>
    </Tabs>
  </div>
    </Content>
  );
};