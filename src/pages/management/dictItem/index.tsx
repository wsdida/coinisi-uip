import React, {useEffect, useState} from "react";
import {Button, Form, Input, Layout, Modal, Select, Space, Switch, Table, Tag} from "antd";
import {deleteDictItem, insertDictItem, queryDictItem, updateDictItem} from "@/services/system/dictItem";
import {queryDict} from "@/services/system/dict";
import {useLocation} from "umi";
import {PageHeaderWrapper} from "@ant-design/pro-layout";



interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};
//声明state类型
interface stateType {
  dictCode: string;
}
//使用钩子获取state

const DictItem: React.FC = () => {
  const { state } = useLocation<stateType>();
  let dictCode = state.dictCode;
 const [searchForm] = Form.useForm();
 const [dictItmeData,setDictItmeData] = useState();
  const [modalSwitchStatus,setModalSwitchStatus] = React.useState(false);
  const [modalSwitchDefaulted,setModalSwitchDefaulted] = React.useState(false);
 const [selectData,setSelectData] = useState([]);
 const [selectDefaultValue,setSelectDefaultValue] = useState();
 const [modalTitle,setModalTitle] = useState("");
  let [params] = React.useState({ 'name': '', 'status': '', 'dictCode': '' });
  const [modalForm] = Form.useForm();
  const [visibleStatus,setVisibleStatus] = useState(false);
  searchForm.setFieldsValue({'dictCode':dictCode,"name":"","status":""});
  const columns = [
    {
      align: 'center',
      hidden: true,
      title: 'id',
      dataIndex: 'id',
  },
    {
      align: 'center',
      title: '字典标签',
      dataIndex: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      align: 'center',
      title: '字典项值',
      dataIndex: 'value',
    },
    {
      align: 'center',
      title: '字典编码',
      dataIndex: 'dictCode',
    },
    {
      align: 'center',
      title: '排序',
      dataIndex: 'sort',
    },
    {
      align: 'center',
      title: '状态',
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
      align: 'center',
      title: '操作',
      dataIndex: 'statusd',
      render: (text:any, record:any)=>(
        <Space direction="horizontal">
          <Button type="link" onClick={()=>{
            setVisibleStatus(true);
            setModalSwitchStatus(record.status);
            setModalSwitchDefaulted(record.defaulted);
            modalForm.setFieldsValue(record);
            setModalTitle("修改字典数据");

          }
          }>修改</Button>
          <Button  type="link" onClick={()=>{
            deleteDictItem(record.id);
            setTimeout(function () {
              params.dictCode = record.dictCode;
              queryDictItemData();
            }, 500);

          }
          }>删除</Button>
        </Space>
      )
    }
  ];
  const queryDictData = async () => {

    // @ts-ignore
    const result = await queryDict(params);
    // @ts-ignore
    setSelectData(result);
  };

  const queryDictItemData = async () => {


    // @ts-ignore
    const result = await queryDictItem(params);
    // @ts-ignore
    setDictItmeData(result);
  };
  useEffect(() => {
    if(dictCode !=null){
      params.dictCode = dictCode;
    }
    queryDictData();

    queryDictItemData();
  }, []);
  // @ts-ignore
  return (
    <Layout>
      <PageHeaderWrapper />
      <div style={ {marginTop: 30,backgroundColor: '#FFF'} }>
      <Form form={searchForm} layout="inline" style={ {marginLeft: 40,marginTop: 40} }>
        <Form.Item label="字典名称" name = "dictCode">
          <Select style={{width: 300}}    defaultValue={selectDefaultValue} >
            {
              selectData.map(item=>{
                // @ts-ignore
                return(<Select.Option value={item.code} key={item.id.toString()}>{item.name}</Select.Option>)
              })
            }
          </Select>
        </Form.Item>
        <Form.Item label="字典标签" name = "name" >
               <Input placeholder="请输入字典标签" style={{width: 300}}/>
        </Form.Item>
        <Form.Item label="字典状态" name = "status">
         <Select style={{width: 300}} defaultValue = "">
           <Select.Option value="">所有</Select.Option>
           <Select.Option value="true">正常</Select.Option>
           <Select.Option value="false">禁止</Select.Option>
         </Select>
        </Form.Item>
        <Form.Item  >
                    <Button type="primary" onClick={()=>{
                      setTimeout(function () {
                        params = searchForm.getFieldsValue();
                        queryDictItemData();
                      }, 500);

                    }}>查询</Button>
        </Form.Item>
        <Form.Item  >
          <Button onClick={()=>{
            params.dictCode= searchForm.getFieldValue("dictCode");
            searchForm.setFieldsValue({'dictCode':params.dictCode,"name":"","status":""});
            // @ts-ignore
            setSelectDefaultValue(params.dictCode)
            queryDictItemData();
          }}>重置</Button>
        </Form.Item>
      </Form>
      <Space style={ {marginLeft: 40,marginTop: 30} }>
        <Button onClick={item =>{
          setVisibleStatus(true);
          modalForm.setFieldsValue({'name':'','value':'','dictCode':dictCode,'sort':'','defaulted':true,'status':true,'remark':''});
          setModalTitle("添加字典数据");
        }
        }>添加</Button>
      </Space>
      <Table
        style={ {marginLeft: 40,marginTop: 8, marginRight: 40, marginBottom: 40} }
        pagination={false}
        bordered={true}
        rowSelection={{
          ...rowSelection,
        }}
        // @ts-ignore
        columns={columns}
        dataSource={dictItmeData}
      />
      </div>
      <Modal visible={visibleStatus} title={modalTitle}
             onCancel={item=>{console.log("取消",item) ;setVisibleStatus(false)} }
             onOk={item =>{
               if(modalTitle =="添加字典数据"){
                 insertDictItem(modalForm.getFieldsValue());
               }else{
                 updateDictItem(modalForm.getFieldsValue());
               }
               setVisibleStatus(false);
               setTimeout(function () {
                 if(modalForm.getFieldValue("dictCode") ==null){
                   // @ts-ignore
                   params.dictCode = selectDefaultValue;
                 }else{
                   params.dictCode = modalForm.getFieldValue("dictCode");
                 }
                 queryDictItemData();
               }, 200);
             }}>
              <Form form={modalForm}>
                <Form.Item hidden={true} name="id">
                  <Input />
                </Form.Item>
                <Form.Item label="字典标签" name="name">
                   <Input />
                </Form.Item>
                <Form.Item label="字典项值" name="value">
                  <Input />
                </Form.Item>
                <Form.Item label="字典编码" name="dictCode" >
                  <Select style={{width: 300}}    value={selectDefaultValue} disabled={true}>
                    {
                      selectData.map(item=>{
                        // @ts-ignore
                        return(<Select.Option value={item.code} key={item.id.toString()}>{item.name}</Select.Option>)
                      })
                    }
                  </Select>
                </Form.Item>
                <Form.Item label="字典排序" name="sort">
                  <Input />
                </Form.Item>
                <Form.Item label="系统默认" name="defaulted">
                  <Switch unCheckedChildren="禁用"
                          checkedChildren="正常"
                          checked={modalSwitchDefaulted}
                          onChange={item=>{setModalSwitchDefaulted(item)} }
                  />
                </Form.Item>
                <Form.Item label="状态" name="status">
                  <Switch unCheckedChildren="禁用"
                          checkedChildren="正常"
                          checked={modalSwitchStatus}
                          onChange={item=>{setModalSwitchStatus(item)} }
                  />
                </Form.Item>
                <Form.Item label="备注" name="remark">
                  <Input />
                </Form.Item>
              </Form>
      </Modal>
    </Layout>
  );
};
export default DictItem;
