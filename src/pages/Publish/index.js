import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space
} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Channel from "@/components/Channel";
import {useState} from "react";

const Publish = () => {
    // 图片上传
    const [fileList, setFileList] = useState([])
    // 上传成功回调
    const onUploadChange = info => {
        const fileList = info.fileList.map(file => {
            // 有response说明上传完毕，是最后一次的返回结果
            if (file.response) {
                return {
                    url: file.response.data.url
                }
            }
            return file
        })
        setFileList(fileList)
    }

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb separator=">" items={
                        [
                            {title: <Link to="/">首页</Link>},
                            {title: "发布文章"},
                        ]
                    }>

                    </Breadcrumb>
                }
            >
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 16}}
                    initialValues={{type: 1, content: ''}}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{required: true, message: '请输入文章标题'}]}
                    >
                        <Input placeholder="请输入文章标题" style={{width: 400}}/>
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{required: true, message: '请选择文章频道'}]}
                    >
                        <Channel width={400}/>
                    </Form.Item>

                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Upload
                            name="image"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList
                            action="http://geek.itheima.net/v1_0/upload"
                            fileList={fileList}
                            onChange={onUploadChange}
                        >
                            <div style={{marginTop: 8}}>
                                <PlusOutlined/>
                            </div>
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{required: true, message: '请输入文章内容'}]}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 4}}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                发布文章
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish