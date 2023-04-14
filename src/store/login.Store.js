/**
 * login module
 */
import {makeAutoObservable} from "mobx";
import {getToken, http, setToken} from "@/utils";

class LoginStore {
    token = getToken() || ''

    constructor() {
        // 响应式
        makeAutoObservable(this)
    }

    getToken = async ({mobile, code}) => {
        // 调用登陆接口
        const res = await http.post('/authorizations', {mobile, code})
        // 存入token
        this.token = res.data.token
        // 存入localstorage
        setToken(this.token)
    }

}

export default LoginStore