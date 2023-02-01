import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"

import Register from "./components/Archive/Register"
import ResetDatabase from "./components/Archive/ResetDatabase"
import Login from "./components/Archive/Login"
import Logout from "./components/Archive/Logout"
import AddCar from "./components/Archive/AddCar"
import EditCar from "./components/Archive/EditCar"
import DeleteCar from "./components/Archive/DeleteCar"
import DisplayAllCars from "./components/Archive/DisplayAllCars"
import PrivateRoute from "./components/PrivateRoute"


import {ACCESS_LEVEL_GUEST} from "./config/global_constants"


if (typeof sessionStorage.isLoggedIn === "undefined")
{
    sessionStorage.isLoggedIn = "false"
    sessionStorage.name = "GUEST"
    sessionStorage.accessLevel = ACCESS_LEVEL_GUEST
}

    
export default class App extends Component 
{
    render() 
    {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/Register" component={Register} />
                    <Route exact path="/ResetDatabase" component={ResetDatabase} />                    
                    <Route exact path="/" component={DisplayAllCars} />
                    <Route exact path="/Login" component={Login} />
                    <PrivateRoute exact path="/Logout" component={Logout} />
                    <PrivateRoute exact path="/AddCar" component={AddCar} />
                    <PrivateRoute exact path="/EditCar/:id" component={EditCar} />
                    <PrivateRoute exact path="/DeleteCar/:id" component={DeleteCar} />
                    <Route exact path="/DisplayAllCars" component={DisplayAllCars}/> 
                    <Route path="*" component={DisplayAllCars}/>                            
                </Switch>
            </BrowserRouter>
        )
    }
}