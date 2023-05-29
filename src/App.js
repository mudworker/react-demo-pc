import {Routes, Route} from "react-router-dom";
// import Login from "@/pages/Login";
// import Layout from "@/pages/Layout";
// import Home from "@/pages/Home";
// import Article from "@/pages/Article";
// import Publish from "@/pages/Publish";
import AuthComponent from "@/components/AuthComponent";
import {HistoryRouter, history} from './utils/history'
import './App.css'
// 路由懒加载
import {lazy, Suspense} from "react";
// 按需导入路由组件
const Login = lazy(() => import('./pages/Login'))
const Layout = lazy(() => import('./pages/Layout'))
const Home = lazy(() => import('./pages/Home'))
const Article = lazy(() => import('./pages/Article'))
const Publish = lazy(() => import('./pages/Publish'))

function App() {
    return (
        // 路由配置
        <HistoryRouter history={history}>
            <div className='App'>
                {/*使用Suspense包裹路由组件*/}
                <Suspense
                    fallback={
                        <div
                            style={{
                                textAlign: 'center',
                                marginTop: 200
                            }}
                        >loading...</div>
                    }>
                    <Routes>
                        {/*创建路由path和组件的对应关系*/}
                        <Route path='/' element={
                            <AuthComponent>
                                {/*Layout需要权限判断，下面的Login则不需要*/}
                                <Layout/>
                            </AuthComponent>
                        }>
                            <Route index element={<Home/>}></Route>
                            <Route path='/article' element={<Article/>}></Route>
                            <Route path='/publish' element={<Publish/>}></Route>
                        </Route>
                        <Route path='/login' element={<Login/>}></Route>
                    </Routes>
                </Suspense>
            </div>
        </HistoryRouter>
    );
}

export default App;
