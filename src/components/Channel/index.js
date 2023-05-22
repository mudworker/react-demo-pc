import {Select} from "antd";
import {observer} from "mobx-react-lite";
import useStore from "@/store";

/**
 * 频道下拉框组件
 */
const Channel = (props) => {
    const {channelStore} = useStore()
    const {value, onChange} = props // 特别注意onChange这块，Select组件需要手动触发一次，不然外部的Menu.item无法通过name识别到Select值改变

    return (
        <Select
            placeholder="请选择文章频道"
            style={{width: props.width || 200}}
            value={value}
            onChange={onChange}
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