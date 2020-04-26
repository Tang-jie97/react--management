import React, {Component} from 'react'
import { Card,Button,Table} from 'antd';
import {getArticle} from '../../request'

export default class index extends Component{
    state = {
        dataSource:[],
        columns: [],
        total:0
    }
    getData = ()=>{
        getArticle().then(res=>{
            console.log("article",res)
            const columnsKey = Object.keys(res.list[0])
            const columns = columnsKey.map(item=>{
                return {
                    title: item,
                    dataIndex: item,
                    key: item,
                }
            })
            this.setState({
                total:res.total,
                columns,
                dataSource:res.list
            })
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