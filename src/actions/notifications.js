import {
    MARK_NOTIFICATIONS_BY_ID,
    MARK_NOTIFICATIONS_ALL,
    START_NOTIFICATIONS,
    END_NOTIFICATIONS,
    GET_NOTIFICATIONS_DATA
} from "./actionTypes"
import {getNotifications} from "../request"
export const markNotificationsById = id=>{
    return dispatch=>{
        //调用startNotifications,isLoading => true
        dispatch(startNotifications())
        setTimeout(() => {
            dispatch({
                type:MARK_NOTIFICATIONS_BY_ID,
                payload:{
                    id
                }
            })
            //异步请求完毕数据后
            dispatch(endNotifiactions())
        }, 1000);
    }
}


export const markNotificationsAll = ()=>{
    return dispatch=>{
        dispatch(startNotifications())
        setTimeout(() => {
            dispatch({type:MARK_NOTIFICATIONS_ALL})
            dispatch(endNotifiactions())
        }, 1000);
    }
}

const startNotifications = ()=>{
    return {
        type:START_NOTIFICATIONS
    }
}
const endNotifiactions = ()=>{
    return {
        type:END_NOTIFICATIONS
    }
}


//异步请求获取通知中心数据
export const getNotificationsData = ()=>{
    return dispatch=>{
        dispatch(startNotifications())
        getNotifications().then(res=>{
            dispatch({
                type: GET_NOTIFICATIONS_DATA,
                payload:{
                    list:res.list
                }
            })
            dispatch(endNotifiactions())
        })
    }
}