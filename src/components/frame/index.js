import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb,Dropdown ,Avatar,Badge} from 'antd';
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import Logo from './logo.png'
import "./index.less"
import {adminRoute} from "../../routes"
import {withRouter} from 'react-router-dom'
import {DownOutlined} from '@ant-design/icons'
import {connect} from 'react-redux'
import {getNotificationsData} from "../../actions//notifications"
const menu = adminRoute.filter(route=>route.isNav === true)
const { Header, Content, Footer, Sider } = Layout;
const mapsState = state=>{
    return{
        notificationsCount:state.notifications.list.filter(item=>item.hasRead === false).length
    }
}
@connect(mapsState,{getNotificationsData})
@withRouter
class index extends Component {
    componentDidMount(){
        this.props.getNotificationsData()
    }
    handleMenuClick= ({key})=>{
        console.log(key)
        this.props.history.push(key)
    }
    menu = ()=>{
        return(
            <Menu onClick={this.handleMenuClick}>
            <Menu.Item key={"/admin/notifications"}>
                <Badge dot={Boolean(this.props.notificationsCount)}>
                通知中心
                </Badge>
               
            </Menu.Item>
            <Menu.Item key={"/admin/settings"}>
                个人设置
            </Menu.Item>
            <Menu.Item key={"/admin/login"}>
                退出
            </Menu.Item>
          </Menu>
        )
    }
    handleMenu=({ key })=>{
        this.props.history.push(key)
    }
    render() {
        let selectedKeysArr =this.props.location.pathname.split("/")
        selectedKeysArr.length=3
        return (
            <Layout>
                <Header className="header t-header">
                    <div className="logo">
                        <img src={Logo} alt="logo"/>
                    </div>
                    <Dropdown overlay={this.menu}>
                        <div className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                        <Badge count={this.props.notificationsCount}>
                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            <span>个人中心</span>
                            <DownOutlined />
                        </Badge>
                        </div>
                    </Dropdown>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={[menu[0].pathname]}
                                selectedKeys={[selectedKeysArr.join("/")]}
                                style={{ height: '100%' }}
                                onClick={this.handleMenu}
                            >
                                {
                                    menu.map(route=>{
                                        return (
                                        <Menu.Item key={route.pathname}>
                                            {route.icon}
                                            {route.title}
                                            </Menu.Item>
                                        )
                                    })
                                }
                                
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>{this.props.children}</Content>
                    </Layout>
                </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        )
    }
}

export default index
