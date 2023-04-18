import {makeAutoObservable} from "mobx";
import {http} from "@/utils";

class ChannelStore {
    channelList = []

    constructor() {
        makeAutoObservable(this)
    }

    // 在哪里触发它呢？在layout中
    loadChannelList = async () => {
        const res = await http.get('/channels')
        this.channelList = res.data.channels
    }
}

export default ChannelStore