import {createContext, useContext} from "react";

class RootStore {

}

const rootStore = new RootStore()
const context = createContext(rootStore)
const useStore = () => useContext(context)

export default useStore