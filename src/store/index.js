import {createContext, useContext} from "react";
import LoginStore from "@/store/login.Store";
import UserStore from "@/store/user.Store";

class RootStore {
    constructor() {
        this.loginStore = new LoginStore()
        this.userStore = new UserStore()
    }
}

const rootStore = new RootStore()
const context = createContext(rootStore)
const useStore = () => useContext(context)

export default useStore