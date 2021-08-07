import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Layout,
  Modal, Radio,
  Row,
  Select,
  Space,
  Table, Tag,
  TreeSelect
} from "antd";
import {DeleteOutlined, FileAddTwoTone, PlusOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import styles from './index.less'
import {addDept, deleteDept, queryDept, selectTreeDept, updateDept} from "@/services/system/dept";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
const {Option} =Select;


const Index: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  // @ts-ignore
  const [modalDeptState, setModalDeptState] = useState({});
  const [deptModalTitle, setDeptModalTitle] = useState("");
  const [deptData, setDeptData] = useState();
  const [params] = useState({"name": undefined, "status": undefined,'id':undefined});
  const [queryForm] = Form.useForm();
  // 弹窗form
  const [modalForm] =   Form.useForm();
  const [treeData, setTreeData] = useState();
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
  const columns = [
    {
      align: 'center',
      title: '部门名称',
      dataIndex: 'name',
      key: 'name',

    }, {
      align: 'center',
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',

    }, {
      align: 'center',
      title: '负责人',
      dataIndex: 'leader',
      key: 'leader',

    }, {
      align: 'center',
      title: '联系电话',
      dataIndex: 'mobile',
      key: 'mobile',

    },
    {
      align: 'center',
      title: '部门状态',
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
    {
      align: 'center',
      title: '操作',
      dataIndex: 'cao',
      key: 'cao',
      render: (text: any, record: any, index: any) =>
        <Space>
          <Button type={"link"} icon={<FileAddTwoTone/>} onClick={()=>{
            let r = JSON.parse(JSON.stringify(record))
            if(r.hasOwnProperty('children')){
                delete r.children;

                r.parentId = Number(r.parentId)
            }
            modalForm.setFieldsValue({...r})
            setIsModalVisible(true)
            setDeptModalTitle("编辑部门");
          }
          }>编辑</Button>
          <Button type={"link"} icon={<DeleteOutlined/>}
          onClick={()=>{
             deleteDept(record);
            setTimeout(() => {
              queryDeptData();
            }, 200);
          }
          }
          >删除</Button>
        </Space>
      ,
    },
  ];
  const selectDeptData = async () => {
    const result = await selectTreeDept();
    // @ts-ignore
    setTreeData(result);
  };
  const queryDeptData = async () => {
    const result = await queryDept(params);
    result.forEach((item: { key: any; id: any; })=>{
      item.key = item.id;
    });
    console.log("result",result);
    // @ts-ignore
    setDeptData();
    setDeptData(result);
  };
  useEffect(() => {
    selectDeptData();
    queryDeptData();
  }, [])
  // 查询部门
  const handlequery = () => {
    let queryParam = queryForm.getFieldValue("dept");
    if(queryParam !=null){
     if(queryParam.name !=null){
          params.name =  queryParam.name;
     }
      if(queryParam.status !=null){
          params.status = queryParam.status;
      }
    }
    setTimeout(() => {
      queryDeptData();
    }, 200);
  };

  return (
    <Layout>
      <PageHeaderWrapper title={false} />
      <div style={{ marginTop:30,backgroundColor: '#FFF' }}>
      <Space  style={{ marginTop:40,marginLeft:40 }}>
        <Form  form={queryForm} layout="inline">
            <Form.Item label={"部门名称"} name={['dept', 'name']}>
              <input placeholder={"请输入部门"} className={styles.input}/>
            </Form.Item>
          <Form.Item label={"部门状态"}  name={['dept', 'status']} style={{marginLeft:30}}>
            <Select placeholder={"请选择状态"} style={ {width: 200} }>
              <Option value="true">正常</Option>
              <Option value="false">禁用</Option>
            </Select>
          </Form.Item>
          <Form.Item >
            <Button type={"primary"} onClick={handlequery}>查询</Button>
          </Form.Item>
          <Form.Item >
            <Button onClick={() =>{
              // @ts-ignore
              params.name = '';
              // @ts-ignore
              params.status = '';
              queryForm.resetFields();
              setTimeout(() => {
                queryDeptData();
              }, 200);}} >重置</Button>
          </Form.Item>
        </Form>
      </Space>
      <Row style={{ marginLeft:40,marginTop: 30,marginBottom: 30,marginRight: 40}}>
        <Col span={24}>
          <Space align="center" style={{marginBottom: 10}}>
            <Button type={"primary"}  icon={<PlusOutlined />} ghost onClick={() => {
              setIsModalVisible(true)
              setDeptModalTitle("添加部门");
            }}>添加</Button>
            <Button type={"primary"} icon={<DeleteOutlined />} ghost onClick={() => {
              deleteDept(params);
              setTimeout(() => {
                queryDeptData();
              }, 200);
            }}>删除</Button>
          </Space>
          <Table
            bordered={true}
            pagination={false}
            // @ts-ignore
            columns={columns}
            rowSelection={{...rowSelection}}
            dataSource={deptData}
          />
        </Col>
      </Row>
      </div>
      <Modal title={deptModalTitle} visible={isModalVisible} onOk={() => {
        if(deptModalTitle == '添加部门'){
          // @ts-ignore
          addDept(modalForm.getFieldValue());
        }else{
          // @ts-ignore
          updateDept(modalForm.getFieldValue());
        }

        setIsModalVisible(false)
      }} onCancel={() => {
        modalForm.resetFields();
        setIsModalVisible(false)
      }}>

        <Form form={modalForm} initialValues={modalDeptState} >
            <Form.Item label={"上级部门"} name='value'>
                 <TreeSelect
                    defaultValue={modalForm.getFieldValue("parentId")}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    treeData={treeData}
                    placeholder="选择上级部门"
                    treeDefaultExpandAll
                  />
           </Form.Item>
          <Form.Item label="部门名称:" name='name'>
            <Input />
          </Form.Item>
          <Form.Item label={"部门负责人:"} name='leader'>
            <Input placeholder={"输入负责人"} className={styles.input}/>
          </Form.Item>
          <Form.Item label={"联系电话:"} name='mobile'>
            <Input placeholder={"请输入联系电话"} className={styles.input}/>
          </Form.Item>
          <Form.Item label={"邮箱:"} name="email">
            <Input placeholder={"请输入邮箱"} className={styles.input}/>
          </Form.Item>
          <Form.Item label={"排序:"} name='sort'>
            <InputNumber placeholder={"请输入排序"} min={1} max={1000} defaultValue={1} className={styles.input}/>
          </Form.Item>
          <Form.Item label={"部门状态:"} name='status'>
            <Radio.Group defaultValue={modalForm.getFieldValue("status")}>
              <Radio value={true}>正常</Radio>
              <Radio value={false}>禁止</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};


export default Index;
