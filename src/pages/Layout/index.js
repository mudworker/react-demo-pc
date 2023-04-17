import {Layout, Menu, Popconfirm} from 'antd'
import {
    HomeOutlined, DiffOutlined, EditOutlined, LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import {Link, Outlet, useLocation} from "react-router-dom";

const {Header, Sider} = Layout

const GeekLayout = () => {
    // 获取当前path
    const {pathname} = useLocation()
    return (<Layout>
        <Header className="header">
            <div className="logo"/>
            <div className="user-info">
                <span className="user-name">user.name</span>
                <span className="user-logout">
                        <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消">
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
                    selectedKeys={pathname}
                    style={{height: '100%', borderRight: 0}}
                >
                    <Menu.Item icon={<HomeOutlined/>} key="/">
                        <Link to='/'>数据概览</Link>
                    </Menu.Item>
                    <Menu.Item icon={<DiffOutlined/>} key="/article">
                        <Link to='/article'>内容管理</Link>
                    </Menu.Item>
                    <Menu.Item icon={<EditOutlined/>} key="/publish">
                        <Link to='/publish'>发布文章</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="layout-content" style={{padding: 20}}>
                {/*二级路由出口*/}
                <Outlet/>
            </Layout>
        </Layout>
    </Layout>)
}

export default GeekLayout