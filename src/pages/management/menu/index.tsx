import {
  Button,
  Col,
  Image,
  Form,
  Input,
  InputNumber,
  Layout,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Table,
  Tag,
  TreeSelect,
  Upload, message
} from "antd";
import React, {useState, useEffect} from "react";
import styles from './index.less'
import {currentUserMenu} from "@/services/ant-design-pro/api";
import {DeleteOutlined,  PlusOutlined, UploadOutlined} from "@ant-design/icons";
import {addMenu, deleteMenu, editMenu, selectTreeMenu} from "@/services/system/menu";
import {PageHeaderWrapper} from "@ant-design/pro-layout";
import {getToken} from "@/utils/TokenUtil";
import {UploadFile} from "antd/lib/upload/interface";


const {Option} = Select;


const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    // email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const Index: React.FC = () => {


  const [hiddenValue, setHiddenValue] = useState(false);
  const [data, setData] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectMenu, setSelectMenu] = useState();
  let [menuData, setMenuData] = useState({
    "name": undefined,
    "parentId": undefined,
    "visible": undefined,
    "redirect": undefined,
    "component": undefined,
    "path": undefined,
    "sort": undefined,
    "icon": undefined,
    "id": undefined,
  });
  const [params] = useState({"name": '','visible': '','id':''});
  const [value, setValue] = useState(0);
  const [menuTitle, setMenuTitle] = useState();
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
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
  const columns = [{
    align: 'center',
    title: '菜单名称',
    dataIndex: 'name',
    key: 'name'

  },
    {
      align: 'center',
      title: '图标',
      dataIndex: 'icon',
      key: 'icon',
        render:(text: any, record: any)=>(<Image
          src={record.icon}
        />),
    },
    {
      align: 'center',
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      align: 'center',
      title: '组件路径',
      dataIndex: 'component',
      key: 'component',

    },
    {
      align: 'center',
      title: '路由路径',
      dataIndex: 'path',
      key: 'path',

    }, {
      align: 'center',
      title: '跳转路径',
      dataIndex: 'redirect',
      key: 'redirect',

    },
    {
      align: 'center',
      title: '状态',
      dataIndex: 'visible',
      key: 'visible',
      render:(text: any, record: any) =>(
        <Space>
          {
            record.visible?<Tag color="success"> 正常</Tag>:<Tag color="default">禁用</Tag>
          }
        </Space>

      )

    },
    {
      align: 'center',
      title: '创建时间',
      dataIndex: '创建时间',
      key: '创建时间',
    }, ,
    {
      align: 'center',
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      render: (text: any, record: any, index: any) =>

        <Space>
          <Button type={"link"}  onClick={() => {
            console.log(record)
            // @ts-ignore
            setMenuTitle("编辑菜单");
            setMenuData(record);
            setValue(record.visible ? 1 : 0);
            setHiddenValue(true)
            setIsModalVisible(true);
          }}>编辑</Button>
          <Button type={"link"}  onClick={item => {
            deleteMenu(record.id);
            params.name="";
            params.visible="";
            setTimeout(() => {
              fetchData();
            }, 200);

          }
          }>删除</Button>
        </Space>
      ,
    },
  ];
  const fetchData = async () => {
    const result = await currentUserMenu(params);
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
    selectTreeMenuData();
    fetchData();
  }, []);

  // @ts-ignore
  return (
    <Layout >
      <PageHeaderWrapper title={false} />
      <Layout style={ {marginTop:30,backgroundColor: '#FFF',height: "auto"} }>
      <Row >
        <Col style={ {marginTop:40,marginLeft:45} }>
          <Form form={searchForm} layout={"inline"}>
            <Form.Item name={['menu', 'name']} label={"菜单名称:"}>
              <Input placeholder={"请输入菜单名称"} style={{width: 400}}/>
            </Form.Item>
            <Form.Item name={['menu', 'visible']} label={"状态: "}>
                <Select style={{width: 400}} defaultValue={'1'}>
                  <Option value={'1'}>正常</Option>
                  <Option value={'0'}>禁用</Option>
                </Select>
            </Form.Item>
            <Form.Item wrapperCol={{offset: 8, span: 16}}  >
              <Space>
                <Button type="primary"

                        htmlType="submit" onClick={item => {
                  const searchData = searchForm.getFieldValue("menu");
                  if(searchData!=undefined){
                    if(searchData.name==null){
                      params.name = "";
                    }else{
                      params.name = searchData.name;
                    }
                    if(searchData.visible==null){
                      params.visible ="";
                    }else {
                      params.visible = searchData.visible;
                    }


                    setTimeout(() => {
                      fetchData();
                    }, 200);
                  }

                }}>
                  查询
                </Button>
                <Button htmlType="button" onClick={(item => {
                  searchForm.resetFields();
                  params.name="";
                  params.visible="";
                  setTimeout(() => {
                    fetchData();
                  }, 200);
                })}>
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Row style={{marginLeft: 45,marginRight: 45,marginTop: 20}}>
        <Col span={24}>
          <Space align="center" style={{marginBottom: 10}}>
            <Button type={"primary"}
                    icon={<PlusOutlined />}
                    ghost onClick={() => {
              form.resetFields();
              setIsModalVisible(true);
              // @ts-ignore
              setMenuTitle("添加菜单");
              setValue(0);
              // @ts-ignore
              setMenuData([])
            }}>添加</Button>
            <Button type={"primary"}
                    icon={<DeleteOutlined />}
                    ghost
            onClick={()=>{
              deleteMenu(params.id);
              setTimeout(() => {
                fetchData();
              }, 200);
            }}
            >删除</Button>
          </Space>
          <Table
            bordered={true}
            // @ts-ignore
            columns={columns}
            pagination={false}
            rowSelection={{...rowSelection}}
            // @ts-ignore
            dataSource={data}
          />
        </Col>
      </Row>
      </Layout>
      <Modal destroyOnClose={true} title={menuTitle}  // @ts-ignore
             visible={isModalVisible} onOk={item => {
        const formDate = form.getFieldValue("menu");
        if (menuTitle == '添加菜单') {
          menuData.name = formDate.name;
          menuData.parentId = formDate.parentId;
          menuData.icon = formDate.icon.file.response.data;
          menuData.sort = formDate.sort;
          menuData.component = formDate.component;
          menuData.path = formDate.path;
          menuData.redirect = formDate.redirect;
          menuData.visible = formDate.visible;
          addMenu(menuData);
        } else {
          menuData.name = formDate.name;
          menuData.parentId = formDate.parentId;
          menuData.icon = formDate.icon.file.response.data;
          menuData.sort = formDate.sort;
          menuData.component = formDate.component;
          menuData.path = formDate.path;
          menuData.redirect = formDate.redirect;
          menuData.visible = formDate.visible;
          editMenu(menuData)
        }
        setTimeout(() => {
          fetchData();
        }, 200);

        setIsModalVisible(false)
      }} onCancel={() => {
        setIsModalVisible(false)
      }}>
        <Form {...layout} validateMessages={validateMessages} form={form}>
          <Form.Item name={['menu', 'name']} label="id" hidden={true} rules={[{required: true}]}>
            <Input defaultValue={hiddenValue ?
              // @ts-ignore
              menuData.id : undefined}/>
          </Form.Item>
          <Form.Item name={['menu', 'parentId']} label="上级菜单" rules={[{required: true}]}>
            <TreeSelect
              className={styles.input}
              value={value}
              dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
              // @ts-ignore
              treeData={selectMenu}
              defaultValue={menuData.parentId}
              placeholder="请选择部门"
              onChange={item => {
                console.log(item)
              }}
            />
          </Form.Item>
          <Form.Item name={['menu', 'name']} label="菜单名称" rules={[{
            whitespace: true,
            message: '菜单名称不能为空',
          } ]}>
            <Input defaultValue={hiddenValue ?
              // @ts-ignore
              menuData.name : undefined}/>
          </Form.Item>
          <Form.Item name={['menu', 'icon']} label="图标"  rules={[{
          whitespace: true,
          message: '图标不能为空',
        } ]}>

            <
              // @ts-ignore
              Upload accept=".svg,.png"
                     name='file'
                       showUploadList={true}
                       action='/coinisi/coinisi-system/common/file'
                       method= 'POST'
                       maxCount={1}
                       headers={{
                         'Authorization': `Bearer ${getToken()}`,
                       }
                       }
                       isImageUrl={(file: UploadFile) => true}
                       // @ts-ignore
                       onChange ={(info: { file: {  status: string; name: any; }; fileList: any; })=>{
                         console.log("文件信息",info)
                       if (info.file.status !== 'uploading') {
                       console.log(info.file, info.fileList);
                     }
                       if (info.file.status === 'done') {
                       message.success(`${info.file.name} file uploaded successfully`);
                     } else if (info.file.status === 'error') {
                       message.error(`${info.file.name} file upload failed.`);
                     }
                     }}>
              <Button icon={<UploadOutlined />}>上传图片</Button>
            </Upload>
          </Form.Item>
          <Form.Item name={['menu', 'sort']} label="排序" rules={[{type: 'number', min: 1, max: 300}]}>
            <InputNumber defaultValue={
              // @ts-ignore
              hiddenValue ? menuData.sort : 1}/>
          </Form.Item>
          <Form.Item name={['menu', 'component']} label="组件路径">
            <Input defaultValue={hiddenValue ?
              // @ts-ignore
              menuData.component : undefined}/>
          </Form.Item>
          <Form.Item name={['menu', 'path']} label="路由路径">
            <Input defaultValue={hiddenValue ?
              // @ts-ignore
              menuData.path : undefined}/>
          </Form.Item>
          <Form.Item name={['menu', 'redirect']} label="跳转路径">
            <Input defaultValue={hiddenValue ?
              // @ts-ignore
              menuData.redirect : undefined}/>
          </Form.Item>
          <Form.Item name={['menu', 'visible']} label="状态">
            <Radio.Group value={value} defaultValue={value}>
              <Radio value={1}>正常</Radio>
              <Radio value={0}>禁止</Radio>
            </Radio.Group>
          </Form.Item>

        </Form>


      </Modal>
    </Layout>
  );
};


export default Index;
