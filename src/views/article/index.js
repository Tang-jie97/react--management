import React, {Component} from 'react'
import { Card,Button,Table,Tag,Tooltip,Modal,Typography} from 'antd';
import {getArticle,deleteArticleById} from '../../request'
import moment from 'moment'
import XLSX from 'xlsx'

const ButtonGroup = Button.Group
const {Text} = Typography
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
        loading:false,
        limited:10, //每一页的数量
        offset:0, //开始的条数
        isDeleteArticleModelShow:false,
        deleteArticlTitle:"",
        deleteArticleLoding:false,
        deleteArticleId:""
    }
    //创建列的代码
    createColums = columnsKey=>{
        const columns = columnsKey.map(item=>{
            if(item === "amount"){
                return {
                    title: titleDisplayMap[item],
                    render:(text,record,index)=>{
                        let {amount} = record
                    return <Tooltip placement="top" title={amount>200?"高于200":"低于200"}>
                                <Tag color={amount>200?'pink':'blue'}>{amount}</Tag>
                            </Tooltip>
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
        columns.push({
            title:"操作",
            key:"action",
            render:(text,record)=>{
                return (
                    <ButtonGroup>
                        <Button type="primary" size="small" onClick={this.toEdit.bind(this,record)}>编辑</Button>
                        <Button type="danger" size="small" onClick={this.deleteArticle.bind(this,record)}>删除</Button>
                    </ButtonGroup>
                )
            }
        })
        return columns
    }
    //操作编辑页面
    toEdit=(record)=>{
        this.props.history.push({
            pathname:`/admin/article/edit/${record.id}`,
            state:{
                title:record.title
            }

        })
        localStorage.setItem("title",JSON.stringify(record))
    }
    deleteArticle = (record)=>{
        // Modal.confirm({
        //     title:"确认删除此项",
        //     content:<Text type="danger">《{record.title}》</Text>,
        //     onOk:()=>{
        //         deleteArticleById(record.id).then(res=>{
        //             console.log(res)
        //         })
        //     }
        // })
        this.setState({
            isDeleteArticleModelShow:true,
            deleteArticlTitle:record.title,
            deleteArticleId:record.id
        })
    }
    onCancel=()=>{
        this.setState({
            isDeleteArticleModelShow:false,
            deleteArticlTitle:"",
        })
    }
    onOk = ()=>{
        this.setState({deleteArticleLoding:true})
        deleteArticleById(this.state.deleteArticleId).then(res=>{
            console.log(res)
            this.getData()
        }).finally( ()=>{
            this.setState({
                deleteArticleLoding:false,
                isDeleteArticleModelShow:false
            })
        })
    }
    getData = ()=>{
        this.setState({loading:true})
        getArticle(this.state.offset,this.state.limited).then(res=>{
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
    handleChange =(page,pageSize)=>{
        this.setState({
            limited:pageSize,
            offset:pageSize*(page-1)
        },()=>{
            this.getData()
        })
    }
    componentDidMount(){
        this.getData()
    }
    toExcel = ()=>{
        const data = [Object.keys(this.state.dataSource[0])]
        for(var i=0;i<this.state.dataSource.length;i++){
            data.push([
                this.state.dataSource[i].id,
                this.state.dataSource[i].title,
                this.state.dataSource[i].author,
                this.state.dataSource[i].amount,
                moment(this.state.dataSource[i].currentAt).format("YYYY年MM月DD日 HH:mm:ss")
            ])
        }

        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb,ws,"SheetJS")
        XLSX.writeFile(wb,`用户信息表-${this.state.offset/this.state.limited +1}页.xlsx`)
    }
    render(){
        return(
            <Card
                title="文章列表" 
                extra={<Button onClick={this.toExcel}>导出Excel表</Button>} 
            >
                <Table 
                dataSource={this.state.dataSource} 
                columns={this.state.columns} 
                rowKey={record=>record.id}
                loading={this.state.loading}
                pagination={
                   {
                        total:this.state.total,
                        onChange:this.handleChange,
                        hideOnSinglePage:true,
                        showQuickJumper:true  //可以跳转到某一页
                    }
                }
                />
                <Modal 
                title="确定要删除吗？"
                visible={this.state.isDeleteArticleModelShow}
                onCancel={this.onCancel}
                confirmLoading={this.state.deleteArticleLoding}
                onOk={this.onOk}
                centered={true}
                maskClosable={false}
                >
                    <Text type="danger">《{this.state.deleteArticlTitle}》</Text>
                
                </Modal>
            </Card>
        )
    }
}