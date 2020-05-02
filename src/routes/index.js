import{
    Article,
    ArticleEdit,
    Dashboard,
    Login,
    Settings,
    Notfound,
    Notifications
} from "../views"
import {
    DashboardOutlined,
    OrderedListOutlined,
    SettingOutlined
  } from '@ant-design/icons';
import React from 'react'
export const mainRoute = [
    {
        pathname:"/login",
        component:Login
    },{
        pathname:"/404",
        component:Notfound
    }
]

export const adminRoute = [
    {
        pathname:"/admin/dashboard",
        component:Dashboard,
        title:"仪表盘",
        isNav:true,
        icon:<DashboardOutlined />
    },{
        pathname:"/admin/article",
        component:Article,
        exact:true,
        title:"文章列表",
        isNav:true,
        icon:<OrderedListOutlined />
    },{
        pathname:"/admin/article/edit/:id",
        component:ArticleEdit
    },{
        pathname:"/admin/notifications",
        component:Notifications
    },{
        pathname:"/admin/settings",
        component:Settings,
        title:"设置",
        isNav:true,
        icon:<SettingOutlined />
    }
]