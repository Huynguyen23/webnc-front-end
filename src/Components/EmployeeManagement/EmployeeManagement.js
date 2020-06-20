import React, { useState } from 'react';
import { Table ,Layout, Input, Collapse, Row, Button, Form, Col, DatePicker, Modal, Typography } from 'antd';
import { useMediaQuery } from 'react-responsive';
import moment from 'moment';
import {AddEmployeeModal} from './AddEmployeeModal';
import { WindowsFilled, DeleteFilled, PlusSquareFilled, SearchOutlined, ClearOutlined, EditFilled } from '@ant-design/icons';
import './EmployeeManagement.css';

const { Title } = Typography;
const { Content } = Layout;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

const EmployeeManagement = () => {
  const [data, setData] = useState({});
  const info = JSON.parse(localStorage.getItem('tokens'));
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isDelShow, setIsDelShow] = useState(false);
  const [values, setValues] = useState(false);
  const [form] = Form.useForm();
  const isSmallScreen = useMediaQuery({ query: '(max-width: 700px)' });

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: !isSmallScreen ? 14 : 24 }
  };

  const onChange =()=>{

  };

  const handleOk =()=>{

  };

  const onFinish = param => {
  };

  const onReset = () => {
    form.resetFields();
    setLoading(true);
  };

  const callback = () => {
    setIsShow(!isShow);
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
    },
    {
      title: 'Cập Nhật',
      dataIndex: 'update',
      align: 'center',
      render: (text, record) => (
        <EditFilled
          onClick={() => {
            setValues(record);
            setVisible(true);
          }}
        />
      )
    },
    {
      title: 'Xóa',
      dataIndex: 'delete',
      render: (text, record) =>
        data.length >= 1 ? (
          <Modal
          title="Thông Báo"
          status="warning"
          visible={isDelShow}
          onOk={handleOk}
          onCancel={()=>setIsDelShow(false)}
        >
          <p>Nhân viên sẽ bị xóa. Bạn chắc chứ ?</p>
          <DeleteFilled />
        </Modal>
        ) : null
    }
  ];
  
  return (
    <Content
        className="site-layout-background"
        style={{
          padding: 20,
          borderRadius: 10
        }}
      >
        {visible && (
          <AddEmployeeModal
            show={visible}
            handleCancel={() => setVisible(false)}
            values={values}
            onReset={onReset}
          />
        )}
        <Row>
          <Col span={18}>
            <Title level={3}>
              <WindowsFilled /> QUẢN LÍ NHÂN VIÊN
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
        <Row>

        <Collapse defaultActiveKey={['1']} onChange={callback} bordered={false}>
          <Panel header="BỘ LỌC" key="1" className="form1">
            <Form
              form={form}
              {...layout}
              name="control-hooks"
              onFinish={onFinish}
            >
              <Form.Item name="taikhoan" label="Mã Nhân Viên">
                <Input size="large"/>
              </Form.Item>
              <Form.Item name="ten" label="Tên Nhân Viên">
                <Input size="large" />
              </Form.Item>
              <Form.Item name="ngay_sinh" label="Ngày Sinh">
                <RangePicker
                  size="large"
                  picker="date"
                  style={{ width: '110%' }}
                  placeholder={['Từ Ngày', 'Đến Ngày']}
                  allowEmpty={[true, true]}
                />
              </Form.Item>
              <Form.Item name="ngay_tao" label="Ngày Tạo">
                <RangePicker
                  size="large"
                  picker="date"
                  style={{ width: '110%' }}
                  placeholder={['Từ Ngày', 'Đến Ngày']}
                  allowEmpty={[true, true]}
                />
              </Form.Item>
              <Form.Item>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<SearchOutlined />}
                    style={{ width: '48%', marginRight: 0, background: '#006600', borderColor: '#006600' }}
                  >
                    TÌM KIẾM
                  </Button>
                  <Button
                    htmlType="button"
                    onClick={onReset}
                    icon={<ClearOutlined />}
                    style={{ width: '48%' }}
                  >
                    LÀM MỚI
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </Panel>
          
        </Collapse>
        </Row>
        <Table
          columns={columns}
          onChange={onChange}
          loading={loading}
          rowKey={i => i.id}
          scroll={{ x: true }}
        />
      </Content>
  );
};
export default EmployeeManagement;
