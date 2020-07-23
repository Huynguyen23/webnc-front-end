import React, { useState, useEffect} from 'react';
import { Table ,Layout, Input, Collapse, Row, Button, Form, Col, DatePicker, Typography } from 'antd';
import { useMediaQuery } from 'react-responsive';
import moment from 'moment';
import {AddEmployeeModal} from './AddEmployeeModal';
import { WindowsFilled, DeleteFilled, PlusSquareFilled, SearchOutlined, ClearOutlined,TrophyOutlined, EditFilled, RiseOutlined } from '@ant-design/icons';
import './EmployeeManagement.css';
import Swal from 'sweetalert2';

const { Title } = Typography;
const { Content } = Layout;
const { Panel } = Collapse;
const { RangePicker } = DatePicker;

export const EmployeeManagement = props => {
  const {employeeList, getEmployeeList, addEmployee, updateEmployee, promoteEmployee, deleteEmployee} = props;
  const info = JSON.parse(localStorage.getItem('tokens'));
  const [isShow, setIsShow] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState(false);
  const [form] = Form.useForm();
  const isSmallScreen = useMediaQuery({ query: '(max-width: 700px)' });

  const layout = {
    labelCol: { span: 24 },
    wrapperCol: { span: !isSmallScreen ? 14 : 24 }
  };

  useEffect(()=>{
    setLoading(true);
    getEmployeeList().then(res=>{
      setLoading(false);
      if(res.status > 0){
        setData(res.list);
      }
      console.log("aaaa", res);
    });
    
  },[getEmployeeList]);

  const onChange =()=>{

  };
  const onRefresh =()=>{
    setLoading(true);
    getEmployeeList().then(res=>{
      setLoading(false);
      setData(res.list);
    });
  };

  const handleDelete = param =>{
    Swal.fire({
      title: 'Bạn chắc chứ?',
      text: "Nhân viên này sẽ bị xóa khỏi hệ thống!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'OK, hãy xóa nó!'
    }).then((result) => {
      if (result.value) {
        deleteEmployee({tai_khoan: param}).then(res=>{
          if(res.status > 0){
            Swal.fire(
              'Đã Xóa!',
              'Nhân viên đã được xóa.',
              'success'
            );
            onRefresh();
          }else{
            Swal.fire(
              'Lỗi',
              'Xảy ra lỗi không mong muốn',
              'error'
            )
          }
        })
       
      }
    })
  };

  const onFinish = param => {
    let temp = employeeList.slice();
    console.log("temp0", temp)
    if(param.tai_khoan) {
      temp = temp.filter(i=>i.tai_khoan.includes(param.tai_khoan));
      console.log("temp1", temp)
    }
    if (param.ten) {
      temp = temp.filter(i=>i.tai_khoan.includes(param.ten));
      console.log("temp2", temp)
    }
    if (param.ngay_sinh && param.ngay_sinh[0]) {
      temp = temp.filter(i=>moment(i.ngay_sinh) >= moment(param.ngay_sinh[0]));
      console.log("temp3", temp)
    }
    if (param.ngay_sinh && param.ngay_sinh[1]) {
      temp = temp.filter(i=>moment(i.ngay_sinh) <= moment(param.ngay_sinh[1]));
      console.log("temp4", temp)
    }
    if (param.ngay_tao && param.ngay_tao[0]) {
      temp = temp.filter(i=>moment(i.ngay_tao) >= moment(param.ngay_tao[0]));
      console.log("temp5", temp)
    }
    if (param.ngay_tao && param.ngay_tao[1]) {
      temp = temp.filter(i=>moment(i.ngay_tao) <= moment(param.ngay_tao[1]));
      console.log("temp6", temp)
    }
    setData(temp);
  };

  const onReset = () => {
    form.resetFields();
    setLoading(true);
    getEmployeeList().then(res=>{
      setLoading(false);
      setData(res.list);
    });
  };

  const callback = () => {
    setIsShow(!isShow);
  };

  const columns = [
    {
      title: 'Thăng Cấp',
      dataIndex: 'rank',
      align:'center',
      render: (text, record) => (
        record.cap_bac > 2 ? <RiseOutlined
          onClick={() => {
            promoteEmployee({tai_khoan:record.tai_khoan, so_bac:1});
          }}
        />
        :
        <TrophyOutlined />
      )
    },
    {
      title: 'Mã Nhân Viên',
      dataIndex: 'tai_khoan'
    },
    {
      title: 'Tên Nhân Viên',
      dataIndex: 'ten',
    },
    {
      title: 'Ngày Sinh',
      dataIndex: 'ngay_sinh',
      render: (text, record) => {
        return moment(record.ngay_sinh).format("YYYY-MM-DD");
      }
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
      render: (text, record) => {
        return moment(record.ngay_tao).format("YYYY-MM-DD");
      }
    },
    {
      title: 'Cấp Bậc',
      dataIndex: 'cap_bac'
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
      align:'center',
      render: (text, record) =>
      employeeList.length >= 1 ? (
        <DeleteFilled
          style={{color:'#FF0000'}}
          onClick={()=>handleDelete(record.tai_khoan)}
        />
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
            addEmployee={addEmployee}
            updateEmployee={updateEmployee}
            handleCancel={() => setVisible(false)}
            values={values}
            onReset={onRefresh}
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
              <Form.Item name="tai_khoan" label="Mã Nhân Viên">
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
          dataSource={data}
          onChange={onChange}
          loading={loading}
          rowKey={i => i.id}
          scroll={{ x: true }}
        />
      </Content>
  );
};
