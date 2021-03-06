import styles from './index.less';
import React, {useEffect, useState} from "react";
import {
  Button,
  Col,
  Form,
  Input,
  Layout,
  message,
  Modal, Radio,
  Row,
  Space,
  Table, Tag,
  Tree,
  TreeSelect
} from "antd";
import {DeleteOutlined, DownOutlined, PlusOutlined} from "@ant-design/icons";
import { selectTreeDept} from "@/services/system/dept";
import {addUser, deleteUser, queryUser, updateUser} from "@/services/system/user";
import {selectRole} from "@/services/system/role";
import {updateUserRole} from "@/services/system/userRole";
import { PageHeaderWrapper } from '@ant-design/pro-layout';
// @ts-ignore
const onClick = ({ key }) => {
  message.info(`Click on item ${key}`);
};

const User: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = React.useState("");
  const [treeData,setTreeData] =  React.useState();
  let [params] = React.useState({'deptId':"", 'username': "", 'mobile': '','status': "",'current':'','size':''});
  const [modalForm] = Form.useForm();
  const [userData,setUserData] = useState();
  const [roleData,setRoleData] = useState();
  const [selectRoleDatas,setSelectRoleDatas] = React.useState();
   let  [res] =  useState({'current':0,'total':0,'size':0,'pages':0});
  const [searchForm] = Form.useForm();
  const [radioState,setRadioState] = useState(false);
  const [sexState,setSexState] = useState(false);
  const selectRoleData = async  () =>{

    const  result = await  selectRole(params);
    // @ts-ignore
    setRoleData(result);
  }
  const selectRoleDatad = async  () =>{
    const  result = await  selectRole(params);
    let a = JSON.parse(JSON.stringify(result));
    let d = [];
    for(var i = 0; i < a.length; i++){
      d.push(a[i].value);
    }

    // @ts-ignore
    setSelectRoleDatas(d);
  }

  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      params.deptId =selectedRowKeys;
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record: any, selected: any, selectedRows: any) => {

      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
  // @ts-ignore
  const columns = [
    {
      hidden: true,
      align: 'center',
      title: '??????',
      dataIndex: 'id',
      key: 'id',
    },
    {
      align: 'center',
      title: '?????????',
      dataIndex: 'username',
      key: 'username',
    },
    {
      align: 'center',
      title: '??????',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      align: 'center',
      title: '??????',
      dataIndex: 'gender',
      key: 'gender',
      render:(text: any, record: any) =>(
        <Space>
          {
            record.gender?<Tag color="success"> ???</Tag>:<Tag color="default">???</Tag>
          }
        </Space>

      )
    },
    {
      align: 'center',
      title: '??????',
      dataIndex: 'deptId',
      key: 'deptId',
    },
    {
      align: 'center',
      title: '?????????',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      align: 'center',
      title: '??????',
      dataIndex: 'email',
      key: 'email',
    },
    {
      align: 'center',
      title: '??????',
      dataIndex: 'avatar',
      ket: 'avatar',
      render:(record:any)=>(<img src={record} style={{width:20,height:20}}/>)
    },
    {
      align: 'center',
      title: '??????',
      dataIndex: 'name',
      key: 'name',
    },
    {
      align: 'center',
      title: '??????',
      dataIndex: 'status',
      key: 'status',
      render:(text: any, record: any) =>(
        <Space>
          {
            record.status?<Tag color="success"> ??????</Tag>:<Tag color="default">??????</Tag>
          }
        </Space>

      )
    },
    {
      align: 'center',
      title: '????????????',
      dataIndex: 'gmtCreate',
      key: 'gmtCreate',
    },
    {
      align: 'center',
      title: '??????',
      key: 'ca',
      dataIndex: 'ca',
      render: (text: any,record:any) => (
        <Space size="middle">
          <Button type={"link"} onClick={
            ()=>{
              console.log(record.gender)
              console.log(record.status)
              setSexState(record.gender);
              setRadioState(record.status);
              modalForm.resetFields();
              modalForm.setFieldsValue( record);
              setVisible(true)
              setModalTitle("????????????");

            }
          }>??????</Button>
          <Button type={"link"} onClick={()=>{
            params.deptId = record.id
            // @ts-ignore
            selectRoleDatad();
            setVisibleModal(true);
          }}>????????????</Button>
          <Button type={"link"} onClick={()=>{
            deleteUser(record.id)
            queryUserData();
          }
          }>??????</Button>
        </Space>
      ),
    }
  ];
  const selectDeptData = async () => {
    const result = await selectTreeDept();
    let r = JSON.parse(JSON.stringify(result).replace(/value/g,"key"));
    setTreeData(r);
  };
  const queryUserData = async  () =>{
    const  data = await  queryUser(params);
    // @ts-ignore
   res.current = data.current;
    // @ts-ignore
   res.pages = data.pages;
   // @ts-ignore
    res.total = data.total;
    // @ts-ignore
   res.size = data.size;
    // @ts-ignore
    data.records.forEach((item: { key: any; id: any; }) =>{
     item.key= item.id;
    });
    // @ts-ignore
    setUserData(data.records);
  }

  useEffect(() => {
    queryUserData();
    selectDeptData();
    selectRoleData();
  }, [])
  return(
    <Layout>
      <PageHeaderWrapper title={false} />

      <Row gutter={[30,20]}  align={'top'} className={styles.body} style={{ marginTop:30,marginRight:4 }} >
        <Col  span={4}  style={ {marginTop: -0 } }>
          <Tree
            showLine
            switcherIcon={<DownOutlined />}
            treeData={treeData}
            onSelect={function (selectedKeys) {
              // @ts-ignore
              params.deptId = selectedKeys;
              queryUserData();
            }}
          />
        </Col>
        <Col span={20} className={styles.col} >
          <Row style={ {marginLeft: 15} }>
            <Col>
              <Space style={{ marginLeft: 12 ,marginTop: 20}} size={20}>
                <Form form={searchForm} layout="inline">
                  <Form.Item label="?????????:" name="username">
                  <Input style={{marginLeft:'10px'}} id={"userId"}  placeholder={"??????????????????"}/>
                  </Form.Item>
                <Form.Item label="????????????:" name="mobile" style={ {marginLeft:20} }>
                  <Input style={{marginLeft:'6px'}} id={"userId"}  placeholder={"?????????????????????"}/>
                </Form.Item>
                  <Form.Item label="??????:" name="status" style={ {marginLeft:20} }>
                  <Input style={{marginLeft:'1px'}} id={"userId"}  placeholder={"???????????????"}/>
                  </Form.Item>
                  <Form.Item >
                  <Button  type="primary" onClick={()=>{
                    // @ts-ignore
                    let searchData = searchForm.getFieldValue();
                    // @ts-ignore
                    if(searchData != null) {
                      if (searchData.username!=null) {
                        params.username = searchData.username6
                      } else {
                        params.username = ''
                      }
                      if (searchData.mobile!=null) {
                        params.mobile = searchData.mobile;
                      } else {
                        params.mobile = ''
                      }
                      if (searchData.status!=null) {
                        params.status = searchData.status;
                      } else {
                        params.status = ''
                      }
                    }
                    queryUserData();

                  }} >??????</Button>
                  </Form.Item>
                  <Form.Item>
                  <Button   type="default" onClick={()=>{
                    searchForm.resetFields();
                    params.status = '';
                    params.deptId = '';
                    params.mobile = '';
                    params.username = '';
                    queryUserData();
                  }}>??????</Button>
                  </Form.Item>
                </Form>

              </Space>
            </Col>

          </Row>
          <Row>
            <Col>

              <Space style={{ marginTop: 20, marginLeft: 24,}}>
                <Button type={"primary"}
                        ghost
                        color=''
                         icon={<PlusOutlined />}
                        onClick={() =>{

                  modalForm.resetFields();
                  setModalTitle("????????????");
                  setVisible(true)}}>??????</Button>
                <Button
                  type={"primary"}
                        ghost
                        icon={<DeleteOutlined />} onClick={()=>{
                  deleteUser(params.deptId);
                  setTimeout(function () {
                    params.status = '';
                    params.deptId = '';
                    params.mobile = '';
                    params.username = '';
                    queryUserData();
                  }, 200);

                }}>??????</Button>


              </Space>
            </Col>
          </Row>
          <Table
            pagination={
              {
              pageSize: res.size,
              total: res.total,
                showSizeChanger: true,
              showQuickJumper: true,
              current: res.current,
                pageSizeOptions:['3','10','20'],
                onChange:(page:any,pageSize:any)=>{
                 params.current = page ;
                 params.size = pageSize;
                  queryUserData();
                },
            }}
            style={ {marginLeft:25,marginRight:25,marginTop:8} }
            bordered={true} rowSelection={{
              ...rowSelection }}
            // @ts-ignore
                 columns={columns} dataSource={userData} />
        </Col>5
      </Row>
      <Modal
        title="????????????"
        centered
        visible={visibleModal}
        onOk={() =>{
          // @ts-ignore
          setVisibleModal(false)
          params.status = '';
          params.deptId = '';
          params.mobile = '';
          params.username = '';
          queryUserData();

        }}
        onCancel={() => setVisibleModal(false)}>

        <TreeSelect
          className={styles.input}
          value={selectRoleDatas}
          treeData={roleData}
          placeholder="????????????"
          allowClear
          maxTagCount={3}
          multiple
          treeDefaultExpandAll
          onChange={item => {
            // @ts-ignore
            setSelectRoleDatas(item);
            params.status = item.toString();
            updateUserRole(params)
          }}
        />
      </Modal>

      <Modal
        title={modalTitle}
        centered
        visible={visible}
        onOk={() =>{
          if(modalTitle=="????????????"){
            // @ts-ignore
            addUser(modalForm.getFieldValue());
          }else{
            // @ts-ignore
            updateUser(modalForm.getFieldValue())
          }
          setVisible(false)
        }}
        onCancel={() => setVisible(false)}

      >
        <Form form={modalForm} >
            <Form.Item label="?????????:" name="username">
              <Input />
            </Form.Item>
          <Form.Item label="??????:" name="nickname">
            <Input />
          </Form.Item>
          <Form.Item label="??????:" name="gender">
            <Radio.Group defaultValue={sexState}>
              <Radio value={true}>???</Radio>
              <Radio value={false}>???</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="??????:" name="password">
            <Input.Password placeholder="input password"/>
          </Form.Item>
          <Form.Item label="??????:" name="deptId">
            <Input />
          </Form.Item>
          <Form.Item label="?????????:" name="mobile">
            <Input />
          </Form.Item>
          <Form.Item label="??????:" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="??????:" name="avatar">
            <img src={modalForm.getFieldValue("avatar")} style={{width:50,height:50}}/>
          </Form.Item>
          <Form.Item label="??????:" name="status">
            <Radio.Group defaultValue={radioState}>
              <Radio value={true}>??????</Radio>
              <Radio value={false}>??????</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>

    </Layout>
 );
};

export  default User;
