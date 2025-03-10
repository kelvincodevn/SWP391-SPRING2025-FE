import { Button, Form, Input, Modal, Popconfirm, Table, Upload } from 'antd'
import { useForm } from 'antd/es/form/Form';
import React, { useEffect, useState } from 'react'
import api from '../../config/axios';
import FormItem from 'antd/es/form/FormItem';
import { PlusOutlined } from "@ant-design/icons";

//cái này trong cái tham số của function này truyền cái object chứ ko phải là cái mảng
// {object}
function DashboardTemplate({title, columns, uri, formItems}) {

    const [newColumns, setUserColumns] = useState();
    const [isOpen, setOpen] = useState(false);
    const [form] = useForm();
    const [data, setData] = useState([]);
    
    //chạy useEffect đầu tiên
    useEffect(( )=> {
         const tableColumns = [
            ...columns,
            ... [
                {
                    title: "Action",
                    dataIndex: "id",
                    key: "id",
                    render: (id, record) => {
                      return (
                      <>
                        <Button type="primary" onClick={() => {
                          setOpen(true); //bấm edit mở form 
                        //   form.setFieldsValue(student); //mở form xong set cái value cho cái form chính là cái data student 
                        //   if (student.avatar) {
                        //     setFileList([
                        //       {
                        //         name: "image.png",
                        //         status: "done",
                        //         url: student.avatar,
                        //       },
                        //     ]);
                        //   }
                        }}
                        >
                          Edit
                        </Button>
                        <Popconfirm 
                        title= {`Delete the ${title}`}                                   
                        description={`Are you sure to delete this ${title}?`}                                   
                        onConfirm={() => console.log("Delete")}
                        >
                        <Button danger type="primary">
                            Delete
                        </Button>
                        </Popconfirm>
                      </>
                      );
                    },
                  },
            ]
         ]
         setUserColumns(tableColumns)
    },[newColumns]) 

    const fetchData = async () => {
        const response = await api.get(`${uri}`)
        setData(response.data)
        console.log(response.data);
    }

    useEffect(() =>{
        fetchData();
        }, 
    [])


    const handleOpenModal = () => {
        setOpen(true);
      };
    
      const handleCloseModal = () => {
        setOpen(false);
      };

      const handleSubmitForm = async (values) => {
        console.log(values);
      };

  return (
    <div>
        <Button onClick={() => setOpen(true)} type="primary" >
            Create {title}
        </Button>
        {/* Đây là cái tên gọi của button (Button "Add" hay Button "Update") */}
        <Table columns={newColumns} dataSource={data} />;
        <Modal
        title={`Create new ${title}`}
        open={isOpen}
        onClose={handleCloseModal}
        onCancel={handleCloseModal}
        onOk={() => form.submit()}
      >
        <Form
          labelCol={{
            span: 24,
          }}
          form={form}
          onFinish={handleSubmitForm}
        >
          <FormItem label="Id" name="id" hidden>
              <Input />
          </FormItem>

          {formItems}
          
        </Form>
      </Modal>

    </div>
  )
}

export default DashboardTemplate