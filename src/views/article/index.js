import React, {Component} from 'react'
import { Card,Button,Table,Tag} from 'antd';
import {getArticle} from '../../request'
import moment from 'moment'

const titleDisplayMap = {
    id:"id",
    title:"标题",
    amount:"阅读量",
    author:"作者",
    currentAt:"创建时间"
}
export default class index extends Component{
    state = {
        dataSource:[],
        columns: [],
        total:0,
        loading:false
    }
    //创建列的代码
    createColums = columnsKey=>{
        return columnsKey.map(item=>{
            if(item === "amount"){
                return {
                    title: titleDisplayMap[item],
                    render:(text,record,index)=>{
                        let {amount} = record
                    return <Tag color={amount>200?'pink':'blue'}>{amount}</Tag>
                    },
                    key: item,
                }
            }
            if(item === "currentAt"){
                return {
                    title: titleDisplayMap[item],
                    render:(text,record,index)=>{
                        let {currentAt} = record
                        return moment(currentAt).format("YYYY年MM月DD日 HH:mm:ss")
                    },
                    key: item,
                }
            }
            return {
                title: titleDisplayMap[item],
                dataIndex: item,
                key: item,
            }
        })
    }
    getData = ()=>{
        this.setState({loading:true})
        getArticle().then(res=>{
            console.log("article",res)
            const columnsKey = Object.keys(res.list[0])
            const columns =this.createColums(columnsKey)
            this.setState({
                total:res.total,
                columns,
                dataSource:res.list
            })
        }).finally(()=>{
            this.setState({loading:false})
        })
    }
    componentDidMount(){
        this.getData()
    }
    render(){
        return(
            <Card
                title="文章列表" 
                extra={<Button>More</Button>} 
            >
                <Table 
                dataSource={this.state.dataSource} 
                columns={this.state.columns} 
                rowKey={record=>record.id}
                loading={this.state.loading}
                pagination={
                   {
                        total:this.state.total
                    }
                }
                />
            </Card>
        )
    }
}