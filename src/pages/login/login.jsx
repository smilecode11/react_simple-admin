import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Image, Avatar, Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import storage from 'store'

import './login.less'
import logo from "../../assets/images/logo.jpg"
import { fallbackUrl } from '../../config/index'
import memory from '../../utils/memory'

//  接口
import UserModel from "../../models/user"
const userModel = new UserModel()

class Login extends Component {
    state = {
        initValue: {
            username: "",
            password: ""
        }
    }

    /**
     * 表单验证通过回调
     * @param {*} values 
     */
    onFinish = async (values) => {
        const { username, password } = values
        //  接口交互｜用户登录
        const userLoginResult = await userModel.userLogin({ username, password })
        if (userLoginResult) {
            //  本地存储数据
            const user = userLoginResult;
            storage.set('USER_KEY', user)
            memory.user = user;

            //  界面交互
            message.success('成功登录')
            this.props.history.replace('/admin')
        }
    }

    //#region 表单内容发生修改回调函数
    /* onValuesChange = (changedValues, allValues) => {
        console.log("onValuesChange：", changedValues, allValues)
    } */
    //#endregion

    render() {

        //  读取保存的user，存在直接跳转管理界面
        const user = memory.user;

        if (user.uid) {
            return (<Redirect to='/' />)
        }

        //  自定义验证密码的回调函数
        const validatePwd = (rule, value, callback) => {
            value = value.trim();
            if (!value) {
                callback("登录密码必须输入！")
            } else if (value.length < 4 || value.length > 12) {
                callback("登录密码长度介于4—12之间！")
            } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
                callback("密码必须是由英文或数字或下划线组成！")
            } else {
                callback()  //  回调不带参即表示验证通过
            }
        }

        return (
            <div className="login">
                <div className="login-header">
                    <Avatar size={68} src={<Image preview={false} src={logo} alt="logo" fallback={fallbackUrl}></Image>}></Avatar>
                    <h1>小型后台管理系统</h1>
                </div>
                <div className="login-content">
                    <h2>用户登录</h2>
                    <div className="form-wrap">
                        <Form name="normal_login" className="login-form" initialValues={this.state.initValue/* form初始值 */} onFinish={this.onFinish/* 验证通过回调 */}>
                            {/* onValuesChange={this.onValuesChange} */}
                            <Form.Item name="username"
                                rules={[    /* 声明式验证 */
                                    { required: true, whitespace: true, message: '请输入登录用户名!' },
                                    { min: 4, max: 12, message: '登录用户名长度在 4～12 之间!' },
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是由 a~z 或 A~Z 或 _ 组成' }
                                ]} >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="登录用户名" />
                            </Form.Item>

                            <Form.Item name="password" rules={[{ validator: validatePwd/* 自定义验证规则 */ }]}>
                                <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="登录密码" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">登 录</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login