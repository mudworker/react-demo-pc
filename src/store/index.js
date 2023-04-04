import {createContext, useContext} from "react";
import LoginStore from "@/store/login.Store";

class RootStore {
    constructor() {
        this.loginStore = new LoginStore()
    }
}

const rootStore = new RootStore()
const context = createContext(rootStore)
const useStore = () => useContext(context)

export default useStore