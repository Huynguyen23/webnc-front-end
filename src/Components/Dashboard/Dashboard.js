import React,{useState, useEffect} from 'react';
import { Card, Table , Row, Col, Typography } from 'antd';
import { BookFilled } from '@ant-design/icons';
import { getInfo } from '../../Reducers/Actions/Home';
import moment from 'moment';
import './Dashboard.css';

const { Title } = Typography;
const Dashboard = () => {
  const info = JSON.parse(localStorage.getItem('tokens'));
  const [dataAcct, setDataAcct] = useState([]);
  
  useEffect(()=>{
    getInfo( info.stkThanhToan, setDataAcct);
  }, [info.stkThanhToan]);
  console.log('dataAcct',dataAcct);
  const columns = [
    {
      title: 'Số tài khoản',
      dataIndex: 'stk_tiet_kiem'
    },
    {
      title: 'Số Dư Tiết Kiệm (VND)',
      dataIndex: 'so_du_tiet_kiem',
      align: 'center',
      render: (value, row, index) => {
        return Number(value).toLocaleString('vi',{style : 'currency', currency : 'VND'})
      }
    },
    {
      title: 'Chu Kì Gửi (Tháng)',
      dataIndex: 'chu_ki_gui',
    },
    {
      title: 'Ngày Tạo',
      dataIndex: 'ngay_tao',
      render: (value, row, index) => {
        return moment(value).format('DD/MM/YYYY');
      }
    },
    {
      title: 'Lãi Suất(%)',
      dataIndex: 'lai_suat',
    }
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
      <Card title="TÀI KHOẢN THANH TOÁN" bordered={false} style={{fontWeight:'bold', fontSize:15}}>
        <p>Chủ Thẻ: {info.ten}</p>
        <p>Số Tài Khoản: {info.stkThanhToan}</p>
        <p>Số Dư: {Number(info.soDuHienTai).toLocaleString('vi',{style: 'currency', currency: 'VND'})}</p>
      </Card> 
    </Col>
    </Row>
      <Table
        columns={columns}
        dataSource={dataAcct}
        rowKey='Id'
        bordered
        title={()=> "TÀI KHOẢN TIẾT KIỆM"}
      />
  </div>
  );
};
export default Dashboard;