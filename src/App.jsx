import React, { Component } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import "./App.less"

import Admin from "./pages/admin/admin";
import Login from "./pages/login/login"

export default class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/admin" component={Admin}></Route>
                    <Redirect to="/admin"></Redirect>
                </Switch>
            </BrowserRouter>
        )
    }
}
