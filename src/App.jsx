import React, { Component } from 'react'
import { HashRouter, Switch, Route, Redirect } from "react-router-dom"
import "./App.less"

import Admin from "./pages/admin/admin";
import Login from "./pages/login/login"

export default class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/" component={Admin}></Route>
                    <Redirect to="/"></Redirect>
                </Switch>
            </HashRouter>
        )
    }
}
