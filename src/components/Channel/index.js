import {Select} from "antd";
import {observer} from "mobx-react-lite";
import useStore from "@/store";

/**
 * 频道下拉框组件
 */
const Channel = (props) => {
    const {channelStore} = useStore()

    return (
        <Select
            placeholder="请选择文章频道"
            style={{width: props.width || 200}}
        >
            {
                channelStore.channelList.map(item => (
                    <Select.Option value={item.id} key={item.id}>{item.name}</Select.Option>
                ))
            }
        </Select>
    )
}


export default observer(Channel)