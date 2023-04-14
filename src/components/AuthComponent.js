/**
 * 1.判断token是否存在
 * 2.存在时，直接渲染相应页面组件
 * 3.不存在时，重定向到登录页面
 */

import {getToken} from "@/utils";
import {Navigate} from "react-router-dom";

/**
 * 高阶组件：把一个组件当成另外一个组件的参数传入
 * 然后通过一定的判断 返回新的组件
 */

/**
 * 使用方式：<AuthComponent> <Layout /> </AuthComponent>
 * 中间的Layout就是children
 */

function AuthComponent({children}) {
    const isToken = getToken()
    if (isToken) {
        return <>{children}</>
    } else {
        // Navigate 组件会自动重定向
        return <Navigate to='/login'></Navigate>
    }
}

export default AuthComponent