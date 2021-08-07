
import {Button, Col, Form, Input, Layout, Row,  Table} from "antd";
import React, {useEffect, useState} from "react";
import {queryOperaLogList, removeOperaLog} from "@/services/system/operaLog";
import {PageHeaderWrapper} from "@ant-design/pro-layout";



const Role: React.FC = () => {
  const [checkStrictly] = React.useState(true);
  const [searchForm] = Form.useForm();
  const [params]  = useState<SYSTEM.OperaLog>({
    ids: "",
    businessType: "",
    deptName: "",
    errorMsg: "",
    id: "",
    jsonResult: "",
    key: "",
    method: "",
    operIp: "",
    operLocation: "",
    operParam: "",
    operTime: '',
    operUrl: "",
    operName: "",
    operatorType: "",
    requestMethod: "",
    status: "",
    title: "",
    current: "1",
    size:"10"});
  const [pages,setPages] = useState({
    current:'',
    total:'',
    size:''
  });
  // @ts-ignore
  const rowSelection = {
    onChange: (selectedRowKeys: any, selectedRows: any) => {
      params.ids = selectedRowKeys;
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    onSelect: (record: any, selected: any, selectedRows: any) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected: any, selectedRows: any, changeRows: any) => {
      console.log(selected, selectedRows, changeRows);
    },

    const [operaLogData,setOperaLogData] = useState<SYSTEM.OperaLog>();
    const getOperaLog = async () => {
      // @ts-ignore
      const result = await queryOperaLogList(params);
      // @ts-ignore
      setPages(result);
      const operaLog: SYSTEM.OperaLog[] = result.records;  };
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < operaLog.length; i++) {
      operaLog[i].key =operaLog[i].id;
    }
    // @ts-ignore
    setOperaLogData(operaLog);
  };
  useEffect(()=>{
    params.size = String(10);
    params.current = String(1);
    getOperaLog();
  },[])
  const columns = [
    {
      align:'center',
      title: '日志编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      align:'center',
      title: '模块标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      align:'center',
      title: '操作类型',
      dataIndex: 'businessType',
      key: 'businessType',
    },  {
      align:'center',
      title: '请求方式',
      dataIndex: 'method',
      key: 'method',
    },
    {
      align:'center',
      title: '操作状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      align:'center',
      title: '操作人员',
      dataIndex: 'operName',
      key: 'opername',
    }
    ,
    {
      align:'center',
      title: '主机',
      dataIndex: 'deptName',
      key: 'deptName',
    }
    ,
    {
      align:'center',
      title: '操作地点',
      dataIndex: 'operLocation',
      key: 'operLocation',
    }
    ,
    {
      align:'center',
      title: '操作日期',
      dataIndex: 'operTime',
      key: 'operTime',
    },


  ];


  return(
<Layout>
  <PageHeaderWrapper title={false} />
        <div  style = { {marginTop:30,backgroundColor: '#FFF'} }>
          <Form form={searchForm} layout="inline" style={ {marginLeft:40,marginTop:40} }>
            <Form.Item label="系统模块名称" name="title">
              <Input type={"primary"} placeholder={"请输入系统模块"}/>
            </Form.Item>
            <Form.Item label="操作人员" name="operName">
              <Col><Input type={"primary"} placeholder={"请输入操作人员"} /></Col>
            </Form.Item>
            <Form.Item>
             <Button type="primary" ghost onClick={()=>{
               const searchData = searchForm.getFieldsValue();
               params.current = '1';
               params.size = '10';
               params.title = searchData.title;
               params.operName = searchData.operName;
               setTimeout(()=>{
                 getOperaLog();
               },200)
             }
             }>搜索</Button>
            </Form.Item> <Form.Item>
            <Button onClick={() =>{
              params.current = '1';
              params.size = '10';
              setTimeout(()=>{
                getOperaLog();
              },200)
            }}>重置</Button>
            </Form.Item>
          </Form>
        <Row style={{ marginTop:20,marginLeft:40,marginBottom:10 }}>
          <Col>
            <Button type="primary" ghost onClick={()=>{
              removeOperaLog(params);
              params.current = '1';
              params.size = '10';
              setTimeout(()=>{
                getOperaLog();
              },200)
            }}>删除</Button>
          </Col>
        </Row>
            <Table
              style={{ marginLeft:40,marginRight:40,marginBottom:30}}
              // @ts-ignore
              bordered={true}
              rowSelection={{ ...rowSelection, checkStrictly }}
              pagination={{
                // @ts-ignore
                pageSize: pages.size,
                // @ts-ignore
                total: pages.total,
                showSizeChanger: true,
                showQuickJumper: true,
                // @ts-ignore
                current: pages.current,
                pageSizeOptions:['5','10','20'],
                onChange:(page: any,pageSize: any)=>{
                  params.current = page ;
                  params.size = pageSize;
                  getOperaLog();
                },
              }}
              // @ts-ignore
                   columns={columns} dataSource={operaLogData} />
      </div>
      </Layout>

 );
};

export  default Role;
