//使用axios进行异步操作
import axios from 'axios'
import {message} from 'antd'
const service =axios.create({
    baseURL:"http://rap2.taobao.org:38080/app/mock/252306"
})

//axios的拦截器
//请求之前的拦截
service.interceptors.request.use(config=>{
    config.data = {...config.data,authToken:"xiaotangge"}
    return config
})
//请求之后的拦截器
service.interceptors.response.use(res=>{
    if(res.data.code===200){
        return res.data.data
    }else{
        message.error(res.data.errMsg)
    }
})
//请求文章的列表数据
export const getArticle = (offset,limited)=>{
    return service.post("/api/v1/articleList",{offset,limited})
}
//删除文章
export const deleteArticleById = id =>{
    return service.post(`/api/v1/articleDelete/${id}`)
}
//根据id查询
export const getArticleDetailById =(id)=>{
    return service.post(`/api/v1/article/${id}`)
}

//根据id与对应的入参进行文章保存
export const saveArticleById = (id,data)=>{
    return service.post(`/api/v1/articlesave/${id}`,data)
}