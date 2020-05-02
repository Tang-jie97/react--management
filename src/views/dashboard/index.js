import React, {Component,createRef} from 'react'
import {Card} from 'antd'
import echarts from 'echarts'
const option = {
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
        data:['销量']
    },
    xAxis: {
        data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
};

export default class index extends Component{
    constructor() {
        super()
        this.articleAmount = createRef()
    }
    componentDidMount(){
        this.articleCharts = echarts.init(this.articleAmount.current);
        this.articleCharts.setOption(option);
    }
    render(){
        return(
            <Card>
                <div ref={this.articleAmount} id="main" style={{height:400,width:600}}></div>
            </Card>
        )
    }
}