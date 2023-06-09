import {makeAutoObservable} from "mobx";
import {http} from "@/utils";

class userStore {
    userInfo = {}

    constructor() {
        makeAutoObservable(this)

    }

    async getUserInfo() {
        // 调用接口获取数据
        const res = await http.get('/user/profile')
        this.userInfo = res.data
    }

}


export default userStore