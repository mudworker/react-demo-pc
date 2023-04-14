import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "@/pages/Login";
import Layout from "@/pages/Layout";
import AuthComponent from "@/components/AuthComponent";

function App() {
    return (
        // 路由配置
        <BrowserRouter>
            <div className="App">
                <Routes>
                    {/*创建路由path和组件的对应关系*/}
                    <Route path='/' element={
                        <AuthComponent>
                            {/*Layout需要权限判断，下面的Login则不需要*/}
                            <Layout/>
                        </AuthComponent>
                    }></Route>
                    <Route path='/login' element={<Login/>}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
