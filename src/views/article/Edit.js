import React, { Component,createRef } from 'react'
import { Form, Input, Button,Card,DatePicker } from 'antd';
import E from "wangeditor"
import "./index.less"
const layout = {
    labelCol:{
        xs:{span:24},
        sm:{span:4}
    },
    wrapperCol:{
        xs:{span:24},
        sm:{span:16}
    }
}
const tailLayout = {
    wrapperCol: { offset:4, span: 16 },
};
export default class Edit extends Component {
    constructor(){
        super()
        this.contentRef = createRef()
        this.formRef = createRef()
    }
    initEditor = ()=>{
        this.editor = new E(this.contentRef.current) 
        this.editor.customConfig.onchange =  (html)=> {
            // html 即变化之后的内容
            // console.log(html)

            //获取到了富文本编辑器里面的内容了，就可以将其对于content字段进行设置了
            this.formRef.current.setFieldsValue({
                "content":html
            })
        }
        this.editor.create()
    }
    componentDidMount(){
        if(!this.props.location.state && !localStorage.getItem("title")){
            this.props.history.push("/admin/article")
        }
        this.initEditor()
    }
    onFinish = values => {
        console.log('Success:', values);
    };
    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };
    render() {
        const state = this.props.location.state || JSON.parse(localStorage.getItem("title"))
        return (
            <Card
                title={state && state.title} 
                extra={<Button onClick={()=>this.props.history.goBack()}>返回</Button>} 
            >
                <Form
                ref={this.formRef}
                {...layout}
                name="basic"
                initialValues={{title:state.title }}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
                colon={false}
                hideRequiredMark={false}
                labelAlign={"right"}
            >
                <Form.Item
                    label="文章标题"
                    name="title"
                    rules={[
                        { required: true, message: 'Please input article title!' },
                    ]}
                >
                    <Input autoFocus />
                </Form.Item>
                <Form.Item
                    label="阅读量"
                    name="amount"
                    rules={[
                        { required: true, message: 'Please input article amount!' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="作者"
                    name="author"
                    rules={[
                        { required: true, message: 'Please input article author!' },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="发布时间"
                    name="currentAt"
                    rules={[
                        { required: true, message: 'Please input article currentAt!' },
                    ]}
                >
                    <DatePicker showTime />
                </Form.Item>
                <Form.Item
                    label="文章内容"
                    name="content"
                    rules={[
                        { required: true, message: 'Please input article content!' },
                    ]}
                >
                    <div className="t-editor" ref={this.contentRef}></div>
                </Form.Item>
                
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            </Card>
        )
    }
}
