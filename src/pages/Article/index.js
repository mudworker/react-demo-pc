import {Link, useNavigate} from 'react-router-dom'
import {Card, Breadcrumb, Form, Button, Radio, DatePicker, Table, Space, Tag, Popconfirm} from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import img404 from '@/assets/error.png'
import {useEffect, useState} from "react";
import {http} from '@/utils'
import Channel from "@/components/Channel";

const {RangePicker} = DatePicker


/**
 * 结果表格组件
 */
const ResTable = (props) => {
    // 文章列表数据管理
    const [article, setArticleList] = useState({
        list: [],
        count: 0
    })
    // 如果异步请求函数需要依赖一些数据的变化而重新执行，推荐把它写道effect内部
    // 此处effect是核心，当params改变时，会自动走searchList
    useEffect(() => {
        const searchList = async () => {
            const res = await http.get('/mp/articles', {params: props.params})
            const {results, total_count} = res.data
            setArticleList({
                list: results,
                count: total_count
            })
        }
        searchList()
    }, [props.params])

    // 删除回调
    const delArticle = async (data) => {
        await http.delete(`/mp/articles/${data.id}`)
        // 更新列表
        props.setParams({
            ...props.params,
            page: 1
        })
    }

    // 编辑回调
    const navigate = useNavigate()
    const editArticle = (data) => {
        navigate(`/publish?id=${data.id}`)
    }

    const columns = [
        {
            title: '封面',
            dataIndex: 'cover',
            width: 120,
            render: cover => {
                return <img src={cover?.images[0] || img404} width={80} height={60} alt=""/>
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            width: 220
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: data => <Tag color="green">审核通过</Tag>
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count'
        },
        {
            title: '评论数',
            dataIndex: 'comment_count'
        },
        {
            title: '点赞数',
            dataIndex: 'like_count'
        },
        {
            title: '操作',
            render: data => {
                return (
                    <Space size="middle">
                        <Button type="primary" shape="circle" icon={<EditOutlined/>}
                                onClick={() => editArticle(data)}/>
                        <Popconfirm
                            title="确认删除该条文章吗?"
                            onConfirm={() => delArticle(data)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <Button
                                type="primary"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined/>}
                            />
                        </Popconfirm>
                    </Space>
                )
            }
        }
    ]

    return (
        <Card title={`根据筛选条件共查询到 ${article.count} 条结果：`}>
            <Table rowKey="id"
                   columns={columns}
                   dataSource={article.list}
                   pagination={{
                       total: article.count,
                       position: ['bottomCenter'],
                       current: props.params.page,
                       pageSize: props.params.per_page,
                       onChange: props.pageChange
                   }}/>
        </Card>
    )
}


const Article = () => {
    // 文章参数管理
    const [params, setParams] = useState({
        page: 1,
        per_page: 10
    })

    const onFinish = (values) => {
        const {status, channel_id, date} = values
        // 格式化表单数据
        const _params = {}
        // 格式化status
        _params.status = status
        if (channel_id !== undefined) {
            _params.channel_id = channel_id
        }
        if (date) {
            _params.begin_pubdate = date[0].format('YYYY-MM-DD')
            _params.end_pubdate = date[1].format('YYYY-MM-DD')
        }
        // 修改params参数 触发接口再次发起
        setParams({
            ...params,
            ..._params
        })
    }

    const pageChange = (page) => {
        // 拿到当前页参数 修改params 引起接口更新
        setParams({
            ...params,
            page
        })
    }

    return (
        <div>
            {/*条件筛选区域*/}
            <Card
                title={
                    <Breadcrumb separator=">" items={
                        [
                            {title: <Link to="/">首页</Link>},
                            {title: "内容管理"},
                        ]
                    }>
                    </Breadcrumb>
                }
                style={{marginBottom: 20}}
            >
                <Form
                    onFinish={onFinish}
                    initialValues={{status: -1}}>
                    <Form.Item label="状态" name="status">
                        <Radio.Group>
                            <Radio value={-1}>全部</Radio>
                            <Radio value={0}>草稿</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                            <Radio value={3}>审核失败</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="频道" name="channel_id">
                        <Channel/>
                    </Form.Item>

                    <Form.Item label="日期" name="date">
                        {/* 传入locale属性 控制中文显示*/}
                        <RangePicker locale={locale}></RangePicker>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{marginLeft: 80}}>
                            筛选
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
            {/*文章列表区域*/}
            <ResTable params={params} pageChange={pageChange} setParams={setParams}/>
        </div>
    )
}

export default Article