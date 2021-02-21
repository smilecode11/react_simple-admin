import React, { Component } from 'react'
import { Link } from "react-router-dom"
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
        return menuList.map((menu, index) => {
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
        })
    }

    render() {
        return (
            <>
                <Link className='left-nav' to="/adminx">
                    <div className="logo-wrapper">
                        <Avatar size={46} src={<Image preview={false} src={logo} alt="logo" fallback={fallbackUrl}></Image>}></Avatar>
                        <h3>小型后台</h3>
                    </div>
                </Link>

                <Menu
                    style={{ marginTop: '32px' }}
                    defaultSelectedKeys={['/admin/home']}
                    mode="inline"
                    theme="dark"
                >
                    {this.renderMenuNodeByMenuList(MenuList)}
                </Menu>
            </>
        )
    }
}

const LeftNavRouter = LeftNav

export default LeftNavRouter