/**
 * 封装图表bar组件
 * 思路：
 * 1、看官方文档，把echarts加入项目
 *   如何获取到dom-->useRef
 *   在什么时候获取dom-->useEffect
 * 2、跑起demo
 * 3、按照需求抽离参数，抽象为方法
 */

import * as echarts from 'echarts'
import {useEffect, useRef} from 'react'

function echartInit(node, xData, yData, title) {
    const myChart = echarts.init(node)
    // 绘制图表
    myChart.setOption({
        title: {
            text: title
        },
        tooltip: {},
        xAxis: {
            data: xData
        },
        yAxis: {},
        series: [
            {
                name: '销量',
                type: 'bar',
                data: yData
            }
        ]
    })
}

function Bar({style, xData, yData, title}) {
    // 1. 先不考虑传参问题  静态数据渲染到页面中
    // 2. 把那些用户可能定制的参数 抽象props (1.定制大小 2.data 以及说明文字)
    const nodeRef = useRef(null)
    useEffect(() => {
        echartInit(nodeRef.current, xData, yData, title)
    }, [xData, yData, title])

    return (
        <div ref={nodeRef} style={style}></div>
    )
}

export default Bar