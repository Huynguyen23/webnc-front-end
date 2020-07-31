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
  Collapse,
  Popconfirm,
  Input
} from 'antd';
import {
  SearchOutlined,
  PlusSquareFilled,
  EditFilled,
  DeleteFilled,
  IdcardFilled
} from '@ant-design/icons';
import { AddReceiverModal } from './AddReceiverModal';
import './ReceiverList.css';
import Swal from 'sweetalert2';

const { Content } = Layout;
const { Title } = Typography;
const { Panel } = Collapse;

export const ReceiverList = props => {
  const {data, getReceiverList, addReceiver, deleteReceiver, updateReceiver} = props;
  const [isShow, setIsShow] = useState(true);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({});
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 6 }
  };
  const info = JSON.parse(localStorage.getItem('tokens'));
  useEffect(() => {
    setLoading(true);
    getReceiverList({stk_nguoi_gui:info.stkThanhToan}).finally(() => {
      setLoading(false);
    });
  }, [getReceiverList, info.stkThanhToan]);

  const onFinish = param => {
    param.stk_nguoi_gui = info.stkThanhToan;
    getReceiverList(param).finally(() => {
      setLoading(false);
    });
  };

  const handleDelete = record => {
    const param ={
      stk_nguoi_gui: info.stkThanhToan,
      stk_nguoi_nhan: record.stk_nguoi_nhan
    }
    deleteReceiver(param).then( res=>{
        if(res.status > 0){
          Swal.fire('Thành Công', 'Đã Xóa Thành Công', 'success');
        } else {
          Swal.fire('Lỗi', 'Đã Xảy Ra Lỗi Không Mong Muốn', 'error');
        }
    }).finally(() => {
      setLoading(false);
      
    });
    
  };
  const onChange = () => {};
  const callback = () => {
    setIsShow(!isShow);
  };
  const columns = [
    {
      title: 'Số Tài Khoản',
      dataIndex: 'stk_nguoi_nhan',
      editable: true
    },
    {
      title: 'Tên Gợi Nhớ',
      dataIndex: 'ten_goi_nho',
      editable: true
    },
    {
      title: 'Ngân Hàng',
      dataIndex: 'ten',
      align: 'center',
      editable: true
    },
    {
      title: 'Điều Chỉnh',
      dataIndex: 'update',
      align: 'center',
      render: (text, record) => (
        <EditFilled
          style={{ verticalAlign: 'center' }}
          onClick={() => {
            console.log("ngan hang", record);
            setValues(record);
            setVisible(true);
          }}
        />
      )
    },
    {
      title: 'Loại Bỏ',
      dataIndex: 'delete',
      align: 'center',
      render: (text, record) =>
      data.length >= 1 ? (
        <Popconfirm
          title="Bạn thật sự muốn xóa?"
          onConfirm={() => handleDelete(record)}
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
      <Row>
        <Col span={18}>
          <Title level={3} style={{color: '#006633'}}>
          <IdcardFilled  style={{fontSize:30, marginRight: 10, color: '#009900'}}/>
            THÔNG TIN NGƯỜI NHẬN
          </Title>
        </Col>
        {visible && (
          <AddReceiverModal
            show={visible}
            handleCancel={() => setVisible(false)}
            addReceiver= {addReceiver}
            updateReceiver={updateReceiver}
            values={values}
          />
        )}
        <Col span={6}>
          <Row gutter={10}>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                style={{ background: '#006600', borderColor: '#006600' }}
                icon={<PlusSquareFilled />}
                onClick={() => {
                  setValues(false);
                  setVisible(true);
                }}
              >
               
                THÊM
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Collapse defaultActiveKey={['1']} onChange={callback} bordered={false}>
        <Panel header="BỘ LỌC" key="1" className="form1">
          <Form form={form} {...layout} onFinish={onFinish} name="control-hooks">
            <Form.Item name="stk_nguoi_nhan" label="Tài Khoản Người Nhận">
              <Input />
            </Form.Item>
            <Form.Item name="ten_goi_nho" label="Tên Người Nhận">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button style={{backgroundColor:"#006600", background: '#006633', borderColor:'#006633'}} type="primary" htmlType="submit" icon={<SearchOutlined />}>
                TÌM KIẾM
              </Button>
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
      <Table
        columns={columns}
        onChange={onChange}
        dataSource={data}
        loading={loading}
        rowKey='stk_nguoi_nhan'
        title={()=> "DANH SÁCH NGƯỜI NHẬN"}
      />
    </Content>
  );
};