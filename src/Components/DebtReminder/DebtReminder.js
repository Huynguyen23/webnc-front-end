/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import {
  Layout,
  Row,
  Col,
  Button,
  Typography,
  Form,
  Table,
  Popconfirm,
  Space,
  Tabs,
  Input
} from 'antd';
import {
  SearchOutlined,
  PlusSquareFilled,
  FireFilled,
  AppleOutlined, 
  AndroidOutlined,
  DeleteFilled,
  IdcardFilled
} from '@ant-design/icons';
import {AddDebtReminderModal} from './AddDebtReminderModal';
import './DebtReminder.css';
import {OTPModal} from './OTPModal';
import moment from 'moment';
import Swal from 'sweetalert2';
import Highlighter from 'react-highlight-words';

const { Content } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

export const DebtReminder = props => {
  const info = JSON.parse(localStorage.getItem('tokens'));
  const {data, data1, payDebt, addReminder, deleteReminder, getSendList, getReceiveList} = props;
  const [isModal, setIsModal] = useState(false);
  const [isOk, setIsOk] = useState(false);
  const [OTP, setOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 6 }
  };
  useEffect(()=>{
    setLoading(true);
    getSendList({stk_nguoi_gui:info.stkThanhToan}).finally(()=>{
      setLoading(false);
    });
    getReceiveList({stk_nguoi_nhan:info.stkThanhToan}).finally(()=>{
      setLoading(false);
    });;
  },[getSendList, getReceiveList, info.stkThanhToan]);
//////////////////////////////////////////

  let searchInput = '';
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm Kiếm
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Làm Mới
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select());
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

  /////////////////////////////////////
  const onTabClick = (key, e)=>{

  };

  const search =()=>{
    getSendList({stk_nguoi_gui:info.stkThanhToan}).finally(()=>{
      setLoading(false);
    });
    
    Swal.fire("Thành Công", "Đã Thêm Nhắc Nợ", "success");
  };

  const handleDelete = param => {
    console.log("param", param);
    setLoading(true);
    deleteReminder(param).then(res=>{
      if(res.status > 0){
        getSendList({stk_nguoi_gui:info.stkThanhToan}).finally(()=>{
          setLoading(false);
        });
        Swal.fire("Thành Công", "Đã Xóa Nhắc Nợ", "success");
      } else {
        Swal.fire("Lỗi", "Xảy Ra Lỗi Không Mong Muốn", "error");
      }
      setLoading(false);
    });
  };
  const onChange = () => {};
  const columns = [
    {
      title: 'Số Tài Khoản',
      dataIndex: 'stk_nguoi_nhan',
      editable: true,
      ...getColumnSearchProps('stk_nguoi_nhan'),
    },
    {
      title: 'Người Được Nhắc Nợ',
      dataIndex: 'ten',
      editable: true,
      ...getColumnSearchProps('ten'),
    },
    {
      title: 'Số Tiền',
      dataIndex: 'so_tien',
      editable: true,
      ...getColumnSearchProps('so_tien'),
    },
    {
      title: 'Nội Dung Nhắc Nợ',
      dataIndex: 'noi_dung',
      editable: true,
      ...getColumnSearchProps('noi_dung'),
    },
    {
      title: 'Tạo Lúc',
      dataIndex: 'tg_tao',
      render: (text, record) =>{
        return moment(record.tg_tao, 'YYYY-MM-DD').calendar();
      }
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'trang_thai',
      render: (text, record) =>{
        return record.trang_thai === 0 ? <span>Chưa Thanh Toán</span> : <span>Đã Thanh Toán</span>
      }
    },
    {
      title: 'Loại Bỏ',
      dataIndex: 'delete',
      align: 'center',
      render: (text, record) =>
      data.length >= 1 ? (
        <Popconfirm
          title="Bạn thật sự muốn xóa?"
          onConfirm={() => {const param = {id:record.id,nguoi_xoa:0,noi_dung_xoa: record.noi_dung}; handleDelete(param)}}
          okText="Xóa"
          cancelText="Hủy"
        >
          <DeleteFilled style={{color:'#FF0000'}}/>
        </Popconfirm>
      ) : null
    }
  ];

  const columns1 = [
    {
      title: 'Thanh Toán',
      dataIndex: 'chose',
      align: 'center',
      render: (text, record) => (
        <FireFilled
          style={{ verticalAlign: 'center', color:'#00CD00' }}
          onClick={() => {
            setValues(record);
            setOTP(!OTP);
            if (isOk) {
              payDebt({
                id : record.id,
                stk_nguoi_gui: record.stk_nguoi_nhan,
                ten_nguoi_gui: record.ten,
                noi_dung_xoa: "hoan tat"
              });
            }
          }}
        />
      )
    },
    {
      title: 'Số Tài Khoản',
      dataIndex: 'stk_nguoi_nhan',
      editable: true,
      ...getColumnSearchProps('stk_nguoi_nhan'),
    },
    {
      title: 'Tên Người Nhắc Nợ',
      dataIndex: 'ten',
      editable: true,
      ...getColumnSearchProps('ten'),
    },
    {
      title: 'Số Tiền',
      dataIndex: 'so_tien',
      editable: true,
      ...getColumnSearchProps('so_tien'),
    },
    {
      title: 'Nội Dung Nhắc Nợ',
      dataIndex: 'noi_dung',
      editable: true,
      ...getColumnSearchProps('noi_dung'),
    },
    {
      title: 'Đã Nhắc Lúc',
      dataIndex: 'tg_tao',
      render: (text, record) =>{
        return moment(record.tg_tao, 'YYYY-MM-DD').calendar();
      }
    },
    {
      title: 'Trạng Thái',
      dataIndex: 'trang_thai',
      render: (text, record) =>{
        return record.trang_thai === 0 ? <span>Chưa Thanh Toán</span> : <span>Đã Thanh Toán</span>
      }
    },
    {
      title: 'Loại Bỏ',
      dataIndex: 'delete',
      align: 'center',
      render: (text, record) =>
      data1.length >= 1 ? (
        <Popconfirm
          title="Bạn thật sự muốn xóa?"
          onConfirm={() => {const param = {id:record.id,nguoi_xoa:1,noi_dung_xoa: record.noi_dung}; handleDelete(param)}}
          okText="Xóa"
          cancelText="Hủy"
        >
          <DeleteFilled style={{color:'#FF0000'}}/>
        </Popconfirm>
      ) : null
    }
  ];
  return (
    <Content
      style={{
        margin: '20px 16px',
        padding: 20,
        borderRadius: '10px'
      }}
    >
      {isModal && (
        <AddDebtReminderModal
          show={isModal}
          values={values}
          search={search}
          addReminder={addReminder}
          handleCancel={() => setIsModal(!isModal)}
        />
      )}

      {OTP && (
        <OTPModal
          show={OTP}
          handleCancel={() => setOTP(false)}
          setIsOk={setIsOk}
        />
      )}
      <Row>
        <Col span={18}>
          <Title level={3} style={{color: '#006633'}}>
          <IdcardFilled  style={{fontSize:30, marginRight: 10, color: '#009900'}}/>
            DANH SÁCH NỢ CHƯA THANH TOÁN
          </Title>
        </Col>
        <Col span={6}>
          <Row gutter={10}>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                style={{ background: '#006600', borderColor: '#006600' }}
                icon={<PlusSquareFilled />}
                onClick={() => {
                  setIsModal(!isModal);
                }}
              >
                THÊM
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Tabs defaultActiveKey="1" onTabClick={onTabClick}>
        <TabPane
          tab={
            <span>
              <AppleOutlined />
              DANH SÁCH ĐÃ TẠO
            </span>
          }
          key="1"
        >
          <Table
            columns={columns}
            onChange={onChange}
            loading={loading}
            rowKey={i => i.stk_nguoi_nhan}
            dataSource={data}
          />
        </TabPane>
        <TabPane
          tab={
            <span>
              <AndroidOutlined />
              DANH SÁCH ĐÃ NHẬN
            </span>
          }
          key="2"
        >
          <Table
            columns={columns1}
            rowKey={i => i.id}
            onChange={onChange}
            loading={loading}
            dataSource={data1}
          />
        </TabPane>
      </Tabs>,
     
    </Content>
  );
};
