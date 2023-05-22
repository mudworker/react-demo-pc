import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    message
} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import {Link, useNavigate, useSearchParams} from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Channel from "@/components/Channel";
import {useState, useRef, useEffect} from "react";
import {http} from "@/utils";

const Publish = () => {
    // 图片上传
    const [fileList, setFileList] = useState([])
    // 使用useRef声明一个暂存仓库
    const cacheImgList = useRef([])
    // 上传成功回调
    const onUploadChange = ({fileList}) => {
        const formatList = fileList.map(file => {
            if (file.response) { // 判断上传完毕
                return {
                    url: file.response.data.url
                }
            }
            return file
        })
        setFileList(formatList)
        // 同时把图片列表存入一份到仓库
        cacheImgList.current = formatList
    }

    // 切换图片
    const [imgCount, setImgCount] = useState(1)
    const radioChange = (e) => {
        setImgCount(e.target.value)
        // 从仓库里面取对应的图片数量，交给我们用来渲染图片列表的fileList
        if (e.target.value === 1) {
            const img = cacheImgList.current[0] ? [cacheImgList.current[0]] : []
            setFileList(img)
        } else if (e.target.value === 3) {
            cacheImgList.current && setFileList(cacheImgList.current)
        }
    }

    // 提交表单
    const navigate = useNavigate()
    const onFinish = async (values) => {
        // 数据的二次处理：处理图片列表cover
        const {channel_id, content, title, type} = values
        const params = {
            channel_id, content, title, type,
            cover: {
                type: type,
                images: fileList.map(item => item.url)
            }
        }
        if (id) {
            await http.put(`/mp/articles/${id}?draft=false`, params)
        } else {
            await http.post('/mp/articles?draft=false', params)
        }
        // 跳转列表 提示用户
        navigate('/article')
        message.success(`${id ? '更新' : '发布'}成功`)

    }

    // 编辑功能
    // 路由参数id 作为判断条件
    const [params] = useSearchParams()
    const id = params.get('id')
    // 数据回填 id调接口 1.表单回填 2.Upload组件fileList 3.暂存列表
    const form = useRef(null)
    useEffect(() => {
        const loadDetail = async () => {
            const {data} = await http.get(`/mp/articles/${id}`)
            // 表单回填
            form.current.setFieldsValue({...data, type: data.cover.type})
            // 回填Upload
            const formatImgList = data.cover.images.map(url => {
                return {
                    url
                }
            })
            setFileList(formatImgList)
            // 暂存列表也存一份
            cacheImgList.current = formatImgList
        }
        if (id) {
            loadDetail()
        }
    }, [id])


    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb separator=">" items={
                        [
                            {title: <Link to="/">首页</Link>},
                            {title: (id ? '编辑' : '发布') + '文章'},
                        ]
                    }>

                    </Breadcrumb>
                }
            >
                <Form
                    labelCol={{span: 4}}
                    wrapperCol={{span: 16}}
                    initialValues={{type: 1, content: ''}}
                    onFinish={onFinish}
                    ref={form}
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
                            <Radio.Group onChange={radioChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {imgCount > 0 && (
                            <Upload
                                name="image"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList
                                action="http://geek.itheima.net/v1_0/upload"
                                fileList={fileList}
                                onChange={onUploadChange}
                                multiple={imgCount > 1}
                                maxCount={imgCount}
                            >
                                <div style={{marginTop: 8}}>
                                    <PlusOutlined/>
                                </div>
                            </Upload>
                        )}

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
                                {id ? '编辑' : '发布'}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish