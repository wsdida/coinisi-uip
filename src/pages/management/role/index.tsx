import {Button, Col, Form, Input, Layout, Modal, Radio, Row, Select, Space,  Table, Tag, TreeSelect} from "antd";
import { EyeOutlined, PlusOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {deleteRole, insertRole, queryList, updateRole, updateRoleMenu} from "@/services/system/role";
import styles from "@/pages/management/menu/index.less";
import {selectTreeMenu} from "@/services/system/menu";
import {PageHeaderWrapper} from "@ant-design/pro-layout";

const {Option} = Select;


const Role: React.FC = () => {
  const [hiddenValue, setHiddenValue] = useState(false);

  const [selectMenu, setSelectMenu] = useState();
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [params] = React.useState({"name": '', "identification": '', "status": '',"id":'',"menuIds": '',"sort": ''});
  const [menuTitle, setMenuTitle] = useState();
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
  let [roleData,setRoleData] = useState({
    "id": undefined,
    "name": undefined,
    "sort": undefined,
    "status": undefined,
    "deleted": undefined,
    "gmtCreate": undefined,
    "gmtModified": undefined,
    "identification": undefined,
    "menuIds": undefined,
  });
  const [searchForm] = Form.useForm();
  const [form] = Form.useForm();
  const fetchData = async () => {
    const results = await queryList(params);
    // @ts-ignore
    for (let i = 0; i < results.length; i++) {
       results[i].key = results[i].id;
    };
    console.log("re",results);
    // @ts-ignore
    setData(results);
  };
  const updateData = async () => {
    await updateRole(params);
    params.name = '';
    params.status = '';
    params.identification = '';
    const result = await queryList(params);
    setData([]);

    // @ts-ignore
    setData(result);
  };
  const selectTreeMenuData = async () => {
    const treeMenu = await selectTreeMenu();
    // @ts-ignore
    setSelectMenu(treeMenu);
  };

  useEffect(() => {
    fetchData();
    updateData();
    selectTreeMenuData();
  }, []);
  const handleOk = () => {
    const formdata = form.getFieldValue("role");
    if(menuTitle =="添加角色"){

      insertRole(formdata);
      setTimeout(() => {
        fetchData();
      }, 200);

    }else{
      if(formdata.status != null){
        roleData.status = formdata.status;
      }
      if( formdata.name !=null){
        roleData.name = formdata.name;
      }
      if( formdata.identification !=null){
        roleData.identification = formdata.identification;
      }
      if( formdata.sort !=null){
        roleData.sort = formdata.sort;
      }
      if( formdata.menuIds !=null){
        roleData.menuIds = formdata.menuIds.toString();
      }
      updateRoleMenu(roleData);

    }

    setConfirmLoading(true);
    setTimeout(() => {
      fetchData();
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };
  const columns = [
    {
      align:'center',
      title: 'id',
      dataIndex: 'id',
      hidden: true,
      key: 'id',

    },{
      align:'center',
      title: '角色名称',
      dataIndex: 'name',

    },
    {
      align:'center',
      title: '角色标识',
      dataIndex: 'identification',

    }, {
      align:'center',
      title: '角色排序',
      dataIndex: 'sort',

    },
    {
      align:'center',
      title: '角色状态',
      dataIndex: 'status',

      render:(text: any, record: any) =>(
        <Space>
          {
            record.status?<Tag color="success"> 正常</Tag>:<Tag color="default">禁用</Tag>
          }
        </Space>

      )
    },
    {
      align:'center',
      title: '创建时间',
      dataIndex: 'gmtCreate',

    },
    {
      align:'center',
      title: '操作',
      dataIndex: 'address',

      render: (text:any, record:any) => (
        <Space align={"center"} >
          <Button type={"link"} icon={<EyeOutlined/>} onClick={()=>{
            setVisible(true);
            // @ts-ignore
            form.resetFields();
            setRoleData(record);
            setHiddenValue(true);
            // @ts-ignore
            setMenuTitle("编辑角色");
          }
          }>编辑</Button>
          <Button type={"link"} icon={<EyeOutlined/>} onClick={()=>{
            deleteRole(record);
            setTimeout(() => {
              fetchData();
            }, 200);

          }
          }>删除</Button>
        </Space>
      ),

    },
  ];

  // @ts-ignore
  return (

    <Layout>
      <PageHeaderWrapper title={false} />
      <div style={{marginTop: 30,backgroundColor: '#FFF'}}>
      <Form form={searchForm} layout={"inline"} style={{marginTop: 40,marginLeft: 40}}>
        <Form.Item name={['role', 'name']} label={"角色名称:"}>
          <Input type={"primary"} placeholder={"请输入角色名称"} style={{width: '230px'}}/>
        </Form.Item>
        <Form.Item name={['role', 'identification']} label={"角色标识:"}>
          <Input type={"primary"} placeholder={"请输入角色标识"} style={{width: '230px'}}/>
        </Form.Item>
        <Form.Item name={['role', 'status']} label={"角色状态:"}>
          <Select defaultValue="all" style={{width: '150px'}} onChange={item => {
            console.log(item)
          }}>
            <Option value={"all"}>全部</Option>
            <Option value={"true"}>正常</Option>
            <Option value={"false"}>停用</Option>
          </Select>
        </Form.Item>
        <Form.Item name={['role', 'name']}>
          <Button type={'primary'} onClick={item => {
            if(searchForm.getFieldValue("role")!=undefined){
              if(searchForm.getFieldValue("role").name == null){
                params.name = '';
              }else{
                params.name = searchForm.getFieldValue("role").name;
              }
              if(searchForm.getFieldValue("role").identification == null){
                params.identification = '';
              }else{
                params.identification = searchForm.getFieldValue("role").identification;
              }
              if(searchForm.getFieldValue("role").status == null|| searchForm.getFieldValue("role").status =='all'){
                params.status = '';
              }else if(searchForm.getFieldValue("role").status =='false'){
                // @ts-ignore
                params.status = 0;
              }else if(searchForm.getFieldValue("role").status == 'true'){
                // @ts-ignore
                params.status = 1;
              }
            }
            setTimeout(() => {
              fetchData();
            }, 200);

          }}>查询</Button>

        </Form.Item>
        <Form.Item name={['role', 'name']}>
          <Button onClick={()=>{
            params.name = '';
            params.status = '';
            params.identification = '';
            setTimeout(() => {
              fetchData();
            }, 200);
          }}>重置</Button>
        </Form.Item>
      </Form>

      <Row style={{marginTop: 30,marginLeft: 40}}>
        <Col>
          <Button type={"primary"}  icon={<PlusOutlined />} ghost onClick={()=>{
            setVisible(true);
            form.resetFields();
            setHiddenValue(false);
            // @ts-ignore
            setMenuTitle("添加角色");
          }}>添加</Button>
        </Col>
      </Row>

      <Table
        style={{marginTop: 10,marginRight: 40,marginLeft: 40,marginBottom: 30}}
        pagination={false} bordered={true} rowSelection={{...rowSelection}}
             // @ts-ignore
             columns={columns} dataSource={data}/>
      </div>
      <Modal
        title={menuTitle}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item name={['role', 'menuIds']} hidden={true}>
            <Input defaultValue={hiddenValue ? roleData.menuIds:undefined}  />
          </Form.Item>
          <Form.Item name={['role', 'name']} label={"角色名称:"}>
            <Input defaultValue={hiddenValue ? roleData.name:undefined}  />
          </Form.Item >
          <Form.Item name={['role', 'identification']} label={"角色标识:"}>
            <Input defaultValue={hiddenValue ?roleData.identification:undefined} />
          </Form.Item>
          <Form.Item name={['role', 'sort']} label={"角色排序:"}>
            <Input defaultValue={hiddenValue ?roleData.sort:undefined} />
          </Form.Item>
          <Form.Item name={['role', 'status']} label={"角色状态:"}>
            <Radio.Group defaultValue={roleData.status}>
              <Radio value={true}>正常</Radio>
              <Radio value={false}>禁止</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item name={['role', 'menuIds']}>
            <TreeSelect
             className={styles.input}
               defaultValue={roleData.menuIds}
              treeData={selectMenu}
              placeholder="请选择部门"
             allowClear
             maxTagCount={3}
             multiple
             treeDefaultExpandAll
             onChange={item => {
                console.log(item)
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>

  );
};

export default Role;
