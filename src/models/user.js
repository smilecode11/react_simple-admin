import {
    user
} from "./api"

import Http from './index'

export default class userModel extends Http {
    //  用户登录
    userLogin({
        username,
        password
    }) {
        return this.request({
            method: 'post',
            url: user.userLogin,
            data: {
                username,
                password
            }
        }).catch(err => {
            return Promise.resolve(undefined)
        })
    }

    
}