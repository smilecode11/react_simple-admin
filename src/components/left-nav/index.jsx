import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom"
import { Image, Avatar, Menu } from 'antd';

import { fallbackUrl } from '../../config/index'
import logo from "../../assets/images/logo.jpg"
import { createFromIconfontCN } from '@ant-design/icons';


import "./index.less"

import MenuList from '../../config/menuConifg'

const { SubMenu } = Menu;

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_2380160_71qlmta2xh.js'
})
class LeftNav extends Component {

    renderMenuNodeByMenuList = (menuList) => {
        const pathname = this.props.location.pathname;

        //  reduce 生成菜单
        return menuList.reduce((pre, menu) => {
            if (!menu.children) {
                pre.push(
                    <Menu.Item key={menu.key}>
                        <Link to={menu.key}>
                            <IconFont type={'icon' + menu.icon}></IconFont>
                            <span>{menu.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                //  遍历匹配打开的菜单 pathname，设置打开菜单
                let openKey = menu.children.find(cItem => cItem.key === pathname)
                if (openKey) {
                    this.openKey = menu.key
                }

                pre.push(
                    <SubMenu key={menu.key} icon={<IconFont type={'icon' + menu.icon} />} title={menu.title}>
                        {this.renderMenuNodeByMenuList(menu.children)}
                    </SubMenu>
                )
            }

            return pre
        }, [])

        //#region map 生成菜单
        /* return menuList.map((menu, index) => {
            if (!menu.children) {
                return (
                    <Menu.Item key={menu.key}>
                        <Link to={menu.key}>
                            <IconFont type={'icon' + menu.icon}></IconFont>
                            <span>{menu.title}</span>
                        </Link>
                    </Menu.Item>
                )
            }
            return (
                <SubMenu key={menu.key} icon={<IconFont type={'icon' + menu.icon} />} title={menu.title}>
                    {this.renderMenuNodeByMenuList(menu.children)}
                </SubMenu>
            )
        }) */
        //#endregion
    }

    //  第一次render之前执行一次｜为第一次render坐一些同步的准备
    UNSAFE_componentWillMount() {
        this.menuNodes = this.renderMenuNodeByMenuList(MenuList);
    }

    render() {
        //  非路由组件｜无法直接读取 this.props，需要将其转为路由组件, 使用 withRouter 高阶组件包装
        //  1.默认选中的menu
        const selectKey = this.props.location.pathname;


        return (
            <>
                <Link className='left-nav' to="/home">
                    <div className="logo-wrapper">
                        <Avatar size={46} src={<Image preview={false} src={logo} alt="logo" fallback={fallbackUrl}></Image>}></Avatar>
                        <h3>小型后台</h3>
                    </div>
                </Link>

                {/* 
                    selectedKeys 总是指定
                */}
                <Menu
                    style={{ marginTop: '32px' }}
                    selectedKeys={[selectKey]}
                    defaultOpenKeys={[this.openKey]}
                    mode="inline"
                    theme="dark"
                >
                    {this.menuNodes}
                </Menu>
            </>
        )
    }
}

//  使用高阶组件包装非路由组件，传递 history，location, match
const LeftNavRouter = withRouter(LeftNav)

export default LeftNavRouter