import axios from 'axios'
import qs from 'qs';

import {
    message as Message
} from 'antd'

//  请求拦截器
axios.interceptors.request.use((config) => {
    const {
        method,
        data
    } = config

    if (method.toUpperCase() === "POST" && (typeof data === 'object')) {
        config.data = qs.stringify(data)
    }

    return config
})

//  响应拦截器
axios.interceptors.response.use(resp => {
    // console.log('resp interceptors:', resp)
    return resp;
}, (error) => {
    console.log("响应拦截error", error)
})

export default class Http {
    request({
        headers = {},
        method = 'get',
        url,
        data
    }) {
        return axios({
            method,
            url,
            data,
            headers
        }).then(res => {
            if (res.data.status === 0) {
                return Promise.resolve(res.data.data)
            } else {
                return Promise.reject(res)
            }
        }).catch(err => {
            //  失败处理｜弹窗+特定操作（如续登）
            if (err.data.status === 1) {
                this.error_confirm(err.data.msg)
                return Promise.resolve(undefined)
            }
            //  特定处理，如token刷新

        })
    }

    //  错误确定提示
    error_confirm(message) {
        Message.error(message)
    }
}