import {Link} from 'react-router-dom'
import {Card, Breadcrumb, Form, Button, Radio, DatePicker, Select, Table, Space, Tag} from 'antd'
import 'moment/locale/zh-cn'
import locale from 'antd/es/date-picker/locale/zh_CN'
import './index.scss'
import {EditOutlined, DeleteOutlined} from "@ant-design/icons";
import img404 from '@/assets/error.png'
import {useEffect, useState} from "react";
import {http} from '@/utils'

const {Option} = Select
const {RangePicker} = DatePicker

/**
 * 频道下拉框组件
 */
const Channel = () => {
    // 频道列表管理
    const [channels, setChannels] = useState([])

    useEffect(() => {
        // 注意：异步请求的写法
        const fetchChannels = async () => {
            const res = await http.get('/channels')
            setChannels(res.data.channels)
        }
        fetchChannels()
    }, [])

    return (
        <Form.Item label="频道" name="channel_id">
            <Select
                placeholder="请选择文章频道"
                style={{width: 200}}
            >
                {
                    channels.map(item => (
                        <Option value={item.id} key={item.id}>{item.name}</Option>
                    ))
                }
            </Select>
        </Form.Item>
    )
}

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
                        <Button type="primary" shape="circle" icon={<EditOutlined/>}/>
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            icon={<DeleteOutlined/>}
                        />
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
        if (channel_id) {
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

                    <Channel/>

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
            <ResTable params={params} pageChange={pageChange}/>
        </div>
    )
}

export default Article