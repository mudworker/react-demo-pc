import {Layout, Menu, Popconfirm} from 'antd'
import {
    HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import useStore from "@/store";
import {useEffect} from "react";
import {observer} from 'mobx-react-lite'

const {Header, Sider} = Layout

const MenuList = [
    {label: <Link to="/">数据概览</Link>, to: '/', key: '/', icon: <HomeOutlined/>, children: null},
    {label: <Link to="/article">内容管理</Link>, to: '/article', key: '/article', icon: <DiffOutlined/>, children: null},
    {label: <Link to="/publish">发布文章</Link>, to: '/publish', key: '/publish', icon: <EditOutlined/>, children: null}
]

const GeekLayout = () => {
    // 获取当前path
    const {pathname} = useLocation()

    // 获取用户信息显示在右上角
    const {userStore, loginStore} = useStore()
    useEffect(() => {
        userStore.getUserInfo()
    }, [userStore])

    // 确认退出
    const navigate = useNavigate()
    const onConfirm = () => {
        // 退出登陆，删除token，跳回登录页
        loginStore.clearToken()
        navigate('/login')
    }

    return (
        <Layout>
            <Header className="header">
                <div className="logo"/>
                <div className="user-info">
                    <span className="user-name">{userStore.userInfo.name}</span>
                    <span className="user-logout">
                        <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
                          <LogoutOutlined/> 退出
                        </Popconfirm>
                    </span>
                </div>
            </Header>
            <Layout>
                <Sider width={200} className="site-layout-background">
                    {/*高亮原理：selectedKeys属性与Menu.Item组件的key属性发生匹配的时候，Item组件即可高亮*/}
                    {/*获取当前激活的path路径，交给selectedKeys*/}
                    {/*selectedKey确保前进后退的高亮正确*/}
                    <Menu
                        mode="inline"
                        theme="dark"
                        defaultSelectedKeys={[pathname]}
                        selectedKeys={[pathname]}
                        style={{height: '100%', borderRight: 0}}
                        items={MenuList}
                    >
                    </Menu>
                </Sider>
                <Layout className="layout-content" style={{padding: 20}}>
                    {/*二级路由出口*/}
                    <Outlet/>
                </Layout>
            </Layout>
        </Layout>
    )
}

export default observer(GeekLayout)