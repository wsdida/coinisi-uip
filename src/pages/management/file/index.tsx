import { Button, Input, Layout, Form, Space, Table, Modal, message, Upload } from 'antd';

import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import { deleteFile, queryFileList } from '@/services/system/file';
import { getToken } from '@/utils/TokenUtil';
import { UploadFile } from 'antd/lib/upload/interface';
import { UploadOutlined } from '@ant-design/icons';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const Role: React.FC = () => {
  const [searchForm] = Form.useForm();
  const [visible, setVisible] = useState(false);
  // @ts-ignore
  const [params] = useState<SYSTEM.File>({
    ids: '',
    remark: '',
    type: '',
    id: 0,
    isDelete: 0,
    name: '',
    currentName: '',
    url: '',
    fileSize: 0,
    size: 10,
    current: 1,
  });
  const [pages, setPages] = useState({
    current: '',
    total: '',
    size: '',
  });
  const [fileData, setFileData] = useState();
  const getFileData = async () => {

    const result = await queryFileList(params);
    // @ts-ignore
    for (let i = 0; i < result.records.length;
      // @ts-ignore
         i++) {
      result.records[i].key = result.records[i].id;
    }
    // @ts-ignore
    setPages(result);
    setFileData(result.records);
  };
  useEffect(() => {
    getFileData();
  }, []);

  const columns = [
    {
      title: '原文件名',
      dataIndex: 'name',
    },
    {
      title: '当前文件名',
      dataIndex: 'currentName',
    },
    {
      width: '150px',
      title: '访问地址',
      dataIndex: 'address',
      ellipsis: true,
    },
    {
      title: '存储地址',
      dataIndex: 'url',
      ellipsis: true,
    },
    {
      title: '大小(KB)',
      dataIndex: 'size',
    },
    {
      title: '备注',
      dataIndex: 'size',
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      // @ts-ignore
      params.ids = selectedRowKeys;
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  }; // @ts-ignore
  return (
    <Layout>
      <PageHeaderWrapper title={false} />
      <Layout style={{ marginTop: 40, backgroundColor: '#FFF' }}>
        <Form form={searchForm} layout="inline" style={{ marginTop: 40, marginLeft: 40 }}>
          <Form.Item label="文件名" name="name">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={() => {
                params.current = 1;
                params.size = 10;
                params.name = searchForm.getFieldValue('name'); // setParams(searchForm.getFieldsValue());
                getFileData();
              }}
            >
              搜索
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              onClick={() => {
                searchForm.resetFields();
                params.name = '';
                setTimeout(() => {
                  getFileData();
                }, 200);
              }}
            >
              重置
            </Button>
          </Form.Item>
        </Form>
        <Space style={{ marginTop: 30, marginLeft: 40, marginBottom: 10 }}>
          <Button
            type="primary"
            ghost
            onClick={() => {
              setVisible(true);
            }}
          >
            添加
          </Button>
          <Button
            onClick={() => {
              deleteFile(params);
              params.current = 1;
              params.size = 10;
              setTimeout(() => {
                getFileData();
              }, 200);
            }}
          >
            删除
          </Button>
        </Space>
        <Table
          style={{ marginLeft: 40, marginRight: 40, marginBottom: 30 }}
          rowSelection={{
            ...rowSelection,
          }}
          bordered
          pagination={{
            // @ts-ignore
            pageSize: pages.size,
            // @ts-ignore
            total: pages.total,
            showSizeChanger: true,
            showQuickJumper: true,
            // @ts-ignore
            current: pages.current,
            pageSizeOptions: ['5', '10', '20'],
            onChange: (page: any, pageSize: any) => {
              params.current = page;
              params.size = pageSize;
              getFileData();
            },
          }}
          columns={columns}
          dataSource={fileData}
        />
      </Layout>
      <Modal
        visible={visible}
        onOk={() => {
          setVisible(false);
          setTimeout(() => {
            getFileData();
          }, 200);
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <
          // @ts-ignore
        Upload
          accept=".svg,.png"
          name="file"
          showUploadList={true}
          action="/coinisi/coinisi-system/common/file"
          method="POST"
          maxCount={1}
          headers={{
            Authorization: `Bearer ${getToken()}`,
          }}
          // @ts-ignore
          isImageUrl={(file: UploadFile) => true}
          // @ts-ignore
          onChange={(info: { file: { status: string; name: any }; fileList: any }) => {
            console.log('文件信息', info);
            if (info.file.status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
              message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          }}
        >
          <Button icon={<UploadOutlined />}>上传图片</Button>
        </Upload>
      </Modal>
    </Layout>
  );
};

export default Role;
