/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect }  from 'react';
import {
  Layout,
  Row,
  Col,
  Typography,
  Tabs,
  Table,
  Form,
  Input,
  Button
} from 'antd';
import {
  InteractionFilled
} from '@ant-design/icons';
import moment from 'moment';
import './History.css';

const { Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;
export const History = props => {
  const info = JSON.parse(localStorage.getItem('tokens'));
  const role = info.role;
  const {receiveHistoryList, payHistoryList, debtHistoryList, getReceiveHistoryList, getPayHistoryList, getDebtHistoryList} =props;
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 6 }
  };

  useEffect(()=>{
    if(role !== 1){
      getReceiveHistoryList({stk_nguoi_nhan:info.stkThanhToan});
      getPayHistoryList({stk_nguoi_gui:info.stkThanhToan});
      getDebtHistoryList({stk_nguoi_thanh_toan:info.stkThanhToan})
    }
  }, [getDebtHistoryList, getPayHistoryList, getReceiveHistoryList, info.stkThanhToan, role]);
  const onFinish = param => {
      getReceiveHistoryList({stk_nguoi_nhan:param.stk});
      getPayHistoryList({stk_nguoi_gui:param.stk});
      getDebtHistoryList({stk_nguoi_thanh_toan:param.stk})
  };

  const columns1 = [
    {
      title: 'Người Gửi',
      dataIndex: 'ten_nguoi_gui',
      sorter: {
        compare: (a, b) => a.ten_nguoi_gui.length - b.ten_nguoi_gui.length,
        multiple: 5,
      },
    },
    {
      title: 'Số Tài Khoản',
      dataIndex: 'stk_nguon',
      sorter: {
        compare: (a, b) => a.stk_nguon - b.stk_nguon,
        multiple: 4,
      },
    },
   
    {
      title: 'Nội Dung',
      dataIndex: 'noi_dung',
      sorter: {
        compare: (a, b) => a.noi_dung.length - b.noi_dung.length,
        multiple: 3,
      },
    },
    {
      title: 'Số Tiền',
      dataIndex: 'so_tien_nhan',
      render:(text)=>{
        return new Intl.NumberFormat('vi-CN', {
          style: 'currency',
          currency: 'VND',
        }).format(text);
      },
      sorter: {
        compare: (a, b) => a.so_tien_nhan - b.so_tien_nhan,
        multiple: 2,
      },
    },
    {
      title: 'Thời Gian',
      dataIndex: 'thoi_gian_gui',
      defaultSortOrder: 'descend',
      sorter: {
        compare: (a, b) => moment(a.thoi_gian_gui) - moment(b.thoi_gian_gui),
        multiple: 1,
      },
    },
  ];
  const columns2 = [
    {
      title: 'Người Nhận',
      dataIndex: 'ten_nguoi_nhan',
      sorter: {
        compare: (a, b) => a.ten_nguoi_nhan.length - b.ten_nguoi_nhan.length,
        multiple: 5,
      },
    },
    {
      title: 'Số Tài Khoản',
      dataIndex: 'stk_dich',
      sorter: {
        sortDirections:'ascend',
        compare: (a, b) => a.stk_nguoi_nhan.length - b.stk_nguoi_nhan.length,
        multiple: 4,
      },
    },
   
    {
      title: 'Nội Dung',
      dataIndex: 'noi_dung',
      sorter: {
        compare: (a, b) => a.noi_dung.length - b.noi_dung.length,
        multiple: 3,
      },
    },
    {
      title: 'Số Tiền',
      dataIndex: 'so_tien_nhan',
      render:(text)=>{
        return new Intl.NumberFormat('vi-CN', {
          style: 'currency',
          currency: 'VND',
        }).format(text);
      },
      sorter: {
        compare: (a, b) => a.so_tien_nhan - b.so_tien_nhan,
        multiple: 2,
      },
    },
    {
      title: 'Thời Gian',
      dataIndex: 'thoi_gian_gui',
      defaultSortOrder: 'descend',
      sorter: {
        compare: (a, b) => moment(a.thoi_gian_gui) - moment(b.thoi_gian_gui),
        multiple: 1,
      },
    },
  ];
  const columns3 = [
    {
      title: 'Người Nhận',
      dataIndex: 'ten_nguoi_nhan',
      sorter: {
        compare: (a, b) => a.ten_nguoi_nhan?.length - b.ten_nguoi_nhan?.length,
        multiple: 5,
      },
    },
    {
      title: 'Số Tài Khoản',
      dataIndex: 'stk_dich',
      sorter: {
        compare: (a, b) => a.stk_dich?.length - b.stk_dich?.length,
        multiple: 4,
      },
    },
   
    {
      title: 'Nội Dung',
      dataIndex: 'noi_dung',
      sorter: {
        compare: (a, b) => a.noi_dung.length - b.noi_dung.length,
        multiple: 3,
      },
    },
    {
      title: 'Số Tiền',
      dataIndex: 'so_tien',
      render:(text)=>{
        return new Intl.NumberFormat('vi-CN', {
          style: 'currency',
          currency: 'VND',
        }).format(text);
      },
      sorter: {
        compare: (a, b) => a.so_tien - b.so_tien,
        multiple: 2,
      },
    },
    {
      title: 'Thời Gian',
      dataIndex: 'thoi_gian',
      defaultSortOrder: 'descend',
      sorter: {
        compare: (a, b) => moment(a.thoi_gian) - moment(b.thoi_gian),
        multiple: 1,
      },
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
        <Form form={form} {...layout} onFinish={onFinish} name="control-hooks" style={{display:role === 0 ? 'none' : ''}}>
          <Form.Item name="stk" required={{message:"Không được để trống"}}>
            <Input placeholder="Số Tài Khoản"/>
          </Form.Item>
          <Form.Item>
            <Button style={{backgroundColor:"#006600", border:"#006600"}} type="primary" htmlType="submit" >
              TÌM KIẾM
            </Button>
          </Form.Item>
        </Form>
      <div className="card-container">
    <Tabs type="card">
      <TabPane tab="GIAO DỊCH NHẬN TIỀN" key="1">
      <Table columns={columns1} dataSource={receiveHistoryList} rowKey={i=>i.id} onChange={onChange} />
      </TabPane>
      <TabPane tab="GIAO DỊCH CHUYỂN KHOẢN" key="2">
      <Table columns={columns2} dataSource={payHistoryList} rowKey={i=>i.id} onChange={onChange} />
      </TabPane>
      <TabPane tab="GIAO DỊCH THANH TOÁN NHẮC NỢ" key="3">
      <Table columns={columns3} dataSource={debtHistoryList} rowKey={i=>i.id} onChange={onChange} />
      </TabPane>
    </Tabs>
  </div>
    </Content>
  );
};