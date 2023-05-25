import {Routes, Route} from "react-router-dom";
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import Publish from "@/pages/Publish";
import Article from "@/pages/Article";
import Home from "@/pages/Home";
import AuthComponent from "@/components/AuthComponent";
import { HistoryRouter, history } from './utils/history'
import './App.css'

function App() {
    return (
        // 路由配置
        <HistoryRouter history={history}>
            <div className="App">
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
            </div>
        </HistoryRouter>
    );
}

export default App;
