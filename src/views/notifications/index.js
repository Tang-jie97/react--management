import React, { Component } from 'react'
import {Card,Button,List,Badge} from "antd"
const data = [
    {
      title: '统一一下时间安排，四点到蜀南庭苑美食广场，买菜买酒等',
    },
    {
      title: '后面还有什么娱乐安排大家再想想，可以提前来，尽量不要来迟，希望大家可以来玩的开心',
    },
    {
      title: '来早发信息给我我会接的',
    },
    {
      title: '希望大家可以来早点，哈哈牛逼',
    },
    {
        title: '明天天比较热，都注意点，口罩也带着',
    },
    {
        title: '尽量不要在我屋吸烟，我女朋友很介意，理解一下',
    },
    {
        title: '欢迎补充',
    }
  ];
export default class index extends Component {
    render() {
        return (
            <Card
            title={"通知中心"}
            extra={<Button>全部标记为已读</Button>}
            >
               <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                        title={<Badge dot>{item.title}</Badge>}
                        />
                        <Button>标记为已读</Button>
                    </List.Item>
                    )}
                />,
            </Card>
        )
    }
}
