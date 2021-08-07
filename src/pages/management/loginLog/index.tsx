
import {Button, Col, Input, Layout,   Form,Row,  Space, Table} from "antd";
import { EyeOutlined,} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {queryList, removes} from "@/services/system/log";
import {PageHeaderWrapper} from "@ant-design/pro-layout";

const Role: React.FC = () => {
  let  [res,setRes] =  useState({'current':1,'size':10,'total':0,'system':'','ids':''});
  const [logData,setLogData] = useState();
  const [searchForm] = Form.useForm();
  let [params] = useState({'current':1,'size':10,'loginName':'','system':'','ids':''});
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      params.ids = selectedRowKeys;
    },
    onSelect: (record: any, selected: any, selectedRows: any) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
      console.log(selected, selectedRows, changeRows);
    },
  };
  const showModal = () => {
    removes(params);
    setTimeout(()=>{
      params.loginName='';
      params.current=1;
      params.size=10;
      params.system='';
      getQueryList();
    },200);
    getQueryList();
  };
 const getQueryList= async () => {

 // @ts-ignore
   const result = await  queryList(params);
  // @ts-ignore
   for (let i = 0; i < result.records.length; i++) {
     // @ts-ignore
     result.records[i].key = result.records[i].id;
   }
   // @ts-ignore
   setRes(result);
   // @ts-ignore
 setLogData(result.records);
 };
  useEffect(() => {
    console.log(params)
    getQueryList();
  }, []);

  const columns = [
    {
      align:'center',
      title: '日志编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      align:'center',
      title: '登录名称',
      dataIndex: 'loginName',
      key: 'loginName',
    },
    {
      align:'center',
      title: '登录地址',
      dataIndex: 'ip',
      key: 'ip',
    },  {
      align:'center',
      title: '登陆系统',
      dataIndex: 'system',
      key: 'system',
    },
    {
      align:'center',
      title: '浏览器',
      dataIndex: 'browser',
      key: 'browser',
    },
    {
      align:'center',
      title: '登录状态',
      dataIndex: 'loginStatus',
      key: 'loginStatus',
    }
    ,

    {
      align:'center',
      title: '登陆',
      dataIndex: 'station',
      key: 'station',
    }
    ,
    {
      align:'center',
      title: '操作日期',
      dataIndex: 'createTime',
      key: 'createTime',
    },

    {
      align:'center',
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      render: () => (
        <Space align={"center"} style={{width:'200px'}}>
          <Button type={"link"} icon={<EyeOutlined />}>详细</Button>
        </Space>
      ),

    },
  ];

  // @ts-ignore
  // @ts-ignore
  return(

      <Layout  >
        <PageHeaderWrapper title={false} />
        <div style={ {backgroundColor:'#FFF',marginTop:30} }>
          <Form form={searchForm} layout="inline" style={ {marginLeft:40,marginTop:40} }>
            <Form.Item label="登录名称" name="loginName">
              <Input placeholder={"请输入登录名称"}/>
            </Form.Item>
            <Form.Item label="系统名称" name = "system">
              <Input placeholder={"请输入系统名称"}/>
            </Form.Item> <Form.Item>
             <Button type="primary" onClick={()=>{
               params.loginName = searchForm.getFieldValue("loginName");
               params.current=1;
               params.size=10;
               params.system=searchForm.getFieldValue("system");
               getQueryList();
             }}>搜索</Button>
            </Form.Item> <Form.Item>
            <Button onClick={item=>{
              searchForm.resetFields();
              setTimeout(()=>{
                params.loginName='';
                params.current=1;
                params.size=10;
                params.system='';
                getQueryList();
              },200);

            }}>重置</Button>
            </Form.Item>
          </Form>
        <Row style={ {marginLeft:40,marginTop:30 , marginBottom:10} }>
          <Col>
            <Button type={"primary"} ghost onClick={showModal}>删除</Button>
          </Col>
        </Row>
            <Table
              style={ {marginLeft:40,marginBottom:30,marginRight:40} }
              // @ts-ignore
              bordered={true}
              rowSelection={{ ...rowSelection }}
              // @ts-ignore
                   columns={columns}
              dataSource={logData}
            pagination={{
              // @ts-ignore
              pageSize: res.size,
              // @ts-ignore
              total: res.total,
              showSizeChanger: true,
              showQuickJumper: true,
              // @ts-ignore
              current: res.current,
              pageSizeOptions:['5','10','20'],
              onChange:(page:any,pageSize:any)=>{
                params.current = page ;
                params.size = pageSize;
                getQueryList();
              },
            }}
            />
        </div>
      </Layout>

 );
};

export  default Role;
