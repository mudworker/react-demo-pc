import {createContext, useContext} from "react";
import LoginStore from "@/store/login.Store";
import UserStore from "@/store/user.Store";
import ChannelStore from "@/store/channel.Store";

class RootStore {
    constructor() {
        this.loginStore = new LoginStore()
        this.userStore = new UserStore()
        this.channelStore = new ChannelStore()
    }
}

const rootStore = new RootStore()
const context = createContext(rootStore)
const useStore = () => useContext(context)

export default useStore