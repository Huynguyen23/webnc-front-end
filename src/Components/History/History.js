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
  InteractionFilled,
  CopyFilled,
  IdcardFilled
} from '@ant-design/icons';
import './History.css';
import moment from 'moment';
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
//   id: 4
// nguoi_xoa: 1
// noi_dung: "tra tien de ban"
// noi_dung_xoa: "ok ban"
// so_tien: "2400000"
// stk_nguoi_gui: "3423595061234"
// stk_nguoi_nhan: "4999655041234"
// ten: "Âu Dương Phong"
// tg_tao: "2020-06-22T13:50:36.000Z"
// tg_xoa: "2020-06-22T13:53:00.000Z"
// trang_thai: 2
  const onFinish = param => {
      getReceiveHistoryList({stk_nguoi_nhan:param.stk});
      getPayHistoryList({stk_nguoi_gui:param.stk});
      getDebtHistoryList({stk_nguoi_thanh_toan:param.stk})
  };

  const columns1 = [
    {
      title: 'Người Gửi',
      dataIndex: 'ten',
      sorter: {
        compare: (a, b) => a.ten_nguoi_gui - b.ten_nguoi_gui,
        multiple: 6,
      },
    },
    {
      title: 'Số Tài Khoản',
      dataIndex: 'stk_nguoi_nhan',
      sorter: {
        compare: (a, b) => a.stk_nguoi_nhan - b.stk_nguoi_nhan,
        multiple: 5,
      },
    },
   
    {
      title: 'Nội Dung',
      dataIndex: 'noi_dung',
      sorter: {
        compare: (a, b) => a.noi_dung - b.noi_dung,
        multiple: 3,
      },
    },
    {
      title: 'Số Tiền',
      dataIndex: 'so_tien',
      sorter: {
        compare: (a, b) => a.so_tien_nhan - b.so_tien_nhan,
        multiple: 2,
      },
    },
    {
      title: 'Thời Gian',
      dataIndex: 'tg_tao',
      render:(text, record)=>{
        return moment(record.tg_tao, 'YYYY-MM-DD').calendar();
      },
      sorter: {
        compare: (a, b) => a.thoi_gian_gui - b.thoi_gian_gui,
        multiple: 1,
      },
    },
  ];
  // "id": 2,
  // "id_ngan_hang_gui": 0,
  // "id_ngan_hang_nhan": 0,
  // "phi": "3000",
  // "stk_nguon": "1234567891234",
  // "stk_dich": "4505168721234",
  // "ten_nguoi_gui": "",
  // "ten_nguoi_nhan": "",
  // "noi_dung": "tra luong thang 6",
  // "so_tien_gui": "300000",
  // "so_tien_nhan": "300000",
  // "thoi_gian_gui": "2020-06-17 10:46:27"
  const columns2 = [
    {
      title: 'Người Nhận',
      dataIndex: 'ten_nguoi_nhan',
      sorter: {
        compare: (a, b) => a.ten_nguoi_nhan - b.ten_nguoi_nhan,
        multiple: 6,
      },
    },
    {
      title: 'Số Tài Khoản',
      dataIndex: 'stk_nguoi_nhan',
      sorter: {
        compare: (a, b) => a.stk_nguoi_nhan - b.stk_nguoi_nhan,
        multiple: 5,
      },
    },
   
    {
      title: 'Nội Dung',
      dataIndex: 'noi_dung',
      sorter: {
        compare: (a, b) => a.noi_dung - b.noi_dung,
        multiple: 3,
      },
    },
    {
      title: 'Số Tiền',
      dataIndex: 'so_tien_nhan',
      sorter: {
        compare: (a, b) => a.so_tien_nhan - b.so_tien_nhan,
        multiple: 2,
      },
    },
    {
      title: 'Thời Gian',
      dataIndex: 'thoi_gian_gui',
      render:(text, record)=>{
        return moment(record.thoi_gian_gui, 'YYYY-MM-DD').calendar();
      },
      sorter: {
        compare: (a, b) => a.thoi_gian_gui - b.thoi_gian_gui,
        multiple: 1,
      },
    },
  ];
  // "id": 2,
  // "thoi_gian": "2020-06-17 16:51:44",
  // "stk_nguon": "3423595061234",
  // "stk_dich": "1234567891234",
  // "ten_nguoi_nhan": "Nguyễn Văn A",
  // "ten_nguoi_gui": "Đồ Văn Án",
  // "noi_dung": "da thanh toan",
  // "so_tien": "200000"
  const columns3 = [
    {
      title: 'Người Nhận',
      dataIndex: 'ten_nguoi_nhan',
      sorter: {
        compare: (a, b) => a.ten_nguoi_nhan - b.ten_nguoi_nhan,
        multiple: 6,
      },
    },
    {
      title: 'Số Tài Khoản',
      dataIndex: 'stk_dich',
      sorter: {
        compare: (a, b) => a.stk_nguoi_nhan - b.stk_nguoi_nhan,
        multiple: 5,
      },
    },
   
    {
      title: 'Nội Dung',
      dataIndex: 'noi_dung',
      sorter: {
        compare: (a, b) => a.noi_dung - b.noi_dung,
        multiple: 3,
      },
    },
    {
      title: 'Số Tiền',
      dataIndex: 'so_tien',
      sorter: {
        compare: (a, b) => a.so_tien - b.so_tien,
        multiple: 2,
      },
    },
    {
      title: 'Thời Gian',
      dataIndex: 'thoi_gian',
      render:(text, record)=>{
        return moment(record.thoi_gian, 'YYYY-MM-DD').calendar();
      },
      sorter: {
        compare: (a, b) => a.thoi_gian_gui - b.thoi_gian_gui,
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
      <Table columns={columns1} dataSource={receiveHistoryList} onChange={onChange} />
      </TabPane>
      <TabPane tab="GIAO DỊCH CHUYỂN KHOẢN" key="2">
      <Table columns={columns2} dataSource={payHistoryList} onChange={onChange} />
      </TabPane>
      <TabPane tab="GIAO DỊCH THANH TOÁN NHẮC NỢ" key="3">
      <Table columns={columns3} dataSource={debtHistoryList} onChange={onChange} />
      </TabPane>
    </Tabs>
  </div>
    </Content>
  );
};