
import {Button, Col, Form, Input, Layout, Modal, Radio, Row, Select, Space,  Table, Tag} from "antd";
import {DeleteOutlined, EyeOutlined, PlusOutlined} from "@ant-design/icons";
import React, {useEffect} from "react";
import { Link } from 'umi';
import {addDict, deleteDict, queryDict, updateDict} from "@/services/system/dict";
import {PageHeaderWrapper} from "@ant-design/pro-layout";

const { Option } = Select;


const Role: React.FC = () => {
  const [modalSwitch,setModalSwitch] = React.useState(false);
  let [params] = React.useState({ 'name': '', 'status': '', 'code': '',id:'' });
  const [visible, setVisible] = React.useState(false);
  const [modalTitle,setModalTitle] = React.useState("");
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [dictData,setDictData] = React.useState();
  const [searchForm] =Form.useForm();
  const [modalForm] = Form.useForm();
  const showModal = () => {
    modalForm.resetFields();
    setModalTitle("添加字典")
    setVisible(true);
  };
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      params.id = selectedRowKeys;
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record: any, selected: any, selectedRows: any) => {

      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
  const queryDictData = async () => {
    // @ts-ignore
    const result = await queryDict(params);
    // @ts-ignore
    for (let i = 0; i < result.length; i++) {
      // @ts-ignore
      result[i].key =result[i].id;
    }
    console.log(result);
    // @ts-ignore
    setDictData(result);
  };
  useEffect(() => {
    queryDictData();
  }, []);
  const handleOk = () => {
    if(modalTitle == "添加字典"){
      addDict(modalForm.getFieldsValue())
    }else{
      updateDict(modalForm.getFieldsValue())
    }
    queryDictData();
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 200);
  };
  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  const columns = [
    {
      align: 'center',
      title: '字典编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      align: 'center',
      title: '字典名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      align: 'center',
      title: '字典类型',
      dataIndex: 'code',
      key: 'code',
    },  {
      align: 'center',
      title: '备注',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      align: 'center',
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render:(text: any, record: any) =>(
        <Space>
          {
            record.status?<Tag color="success"> 正常</Tag>:<Tag color="default">禁用</Tag>
          }
        </Space>

      )
    },
    {
      align: 'center',
      title: '创建时间',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate',
    },
    ,
    {
      align: 'center',
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      render: (text:any, record:any) => (
        <Space align={"center"} style={{width:'200px'}}>
          <Button type={"link"} icon={<EyeOutlined /> } onClick={()=>{
          setVisible(true);
          setModalSwitch(record.status);
          modalForm.setFieldsValue(record);
            setModalTitle("编辑字典")
          }
          }>编辑</Button>
          <Button type={"link"} icon={<EyeOutlined />} onClick={()=>{
          // @ts-ignore
            deleteDict(record);
            queryDictData();
          }
          }>删除</Button>
      <Button type={"link"} icon={<EyeOutlined />}> <Link  to={{pathname:'/admin/dictItem', state: { dictCode: record.code }}}>   列表</Link></Button>
        </Space>
      ),

    },
  ];

  return(

      <Layout  >
        <PageHeaderWrapper title={false} />
        <div style={{backgroundColor: '#FFF' , marginTop:30} }>

          <Form layout="inline"  form={searchForm} style={ {marginTop:40,marginLeft:45} }>
            <Form.Item name="name" label="字典名称">
              <Input type={"primary"} placeholder={"请输入字典名称"} />
            </Form.Item>
            <Form.Item name="code" label="字典类型" style={ {marginLeft: 20} }>
              <Input type={"primary"} placeholder={"请输入字典类型"} />
            </Form.Item>
            <Form.Item name="status" label="字典状态" style={ {marginLeft: 20} }>
              <Select  style={{width: '230px'}} onChange={item =>{console.log(item)}} >
                <Option value="true">正常</Option>
                <Option value="false">禁用</Option>

              </Select>
            </Form.Item>
            <Form.Item name="names" >
              <Button type={"primary"}  onClick={()=>{
                const form = searchForm.getFieldsValue();
                params = form
                queryDictData();
              }
              } >搜索</Button>
            </Form.Item>
            <Form.Item name="clean" >
              <Button type={"primary"} ghost onClick={item =>{
                searchForm.resetFields();
                queryDictData();
              }} >重置</Button>
            </Form.Item>

          </Form>
        <Row  style={ {marginLeft:45,marginTop: 25} }>
          <Col>
            <Button type={"primary"}  icon={<PlusOutlined />} ghost onClick={showModal}>添加</Button>
          </Col>
          <Col style={{ marginLeft:15}}>
            <Button type={"primary"}  icon={<DeleteOutlined />} ghost   onClick={()=>{
              // @ts-ignore
              deleteDict(params);
              setTimeout(() => {
                setVisible(false);
                setConfirmLoading(false);
                queryDictData();
              }, 200);

            }}>删除</Button>
          </Col>
        </Row>

            <Table style={ {marginLeft:45,marginRight: 45,marginTop: 10} } pagination={false} align={"center"} bordered={true}
                   rowSelection={{ ...rowSelection }}
              // @ts-ignore
                   columns={columns} dataSource={dictData} />

        </div>
        <Modal
          title={modalTitle}
          visible={visible}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <Form form={modalForm}>
            <Form.Item name ="id" label="字典编号">
              <Input placeholder={"请输入字典编号"} />
            </Form.Item>
            <Form.Item name ="name" label="字典名称">
              <Input placeholder={"请输入字典名称"} />
            </Form.Item>
            <Form.Item name ="code" label="字典类型">
              <Input placeholder={"请输入字典类型"} />
            </Form.Item>
            <Form.Item name ="remark" label="备注">
              <Input.TextArea placeholder={"请输入备注"} />
            </Form.Item>
            <Form.Item name ="status" label="状态">
              <Radio.Group defaultValue={modalSwitch}>
                <Radio value={true}>正常</Radio>
                <Radio value={false}>禁止</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </Layout>

 );
};

export  default Role;
