import React, { Component } from 'react'
import { Redirect, Route, Switch } from "react-router-dom"
import { Layout } from "antd"
import LeftNav from "../../components/left-nav"
import Header from "../../components/header"

//  路由组件
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import GeneralOrder from '../general-order/general-order'
import GiftOrder from '../gift-order/gift-order'

// 内存数据
import memory from '../../utils/memory'
const { Footer, Sider, Content } = Layout


export default class Admin extends Component {
    render() {
        // 读取内存 user，不存在直接跳转到登录界面
        const user = memory.user;

        if (!user.uid) {
            return (<Redirect to='/login' />)
        }

        return (
            <Layout style={{ height: '100%' }}>
                <Sider>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content style={{ background: '#f8f8f8' }}>
                        <Switch>
                            <Route path="/admin/home" component={Home}></Route>
                            <Route path="/admin/products/category" component={Category}></Route>
                            <Route path="/admin/products/product" component={Product}></Route>
                            <Route path="/admin/order/general-order" component={GeneralOrder}></Route>
                            <Route path="/admin/order/gift-order" component={GiftOrder}></Route>
                            <Redirect to="/admin/home"></Redirect>
                        </Switch>
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}