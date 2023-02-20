import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"

import Register from "./components/Register"
import ResetDatabase from "./components/ResetDatabase"
import Login from "./components/Login"
import Logout from "./components/Logout"
import AddCar from "./components/AddCar"
import EditCar from "./components/EditCar"
import DeleteCar from "./components/DeleteCar"
import DisplayAllCars from "./components/DisplayAllCars"
import PrivateRoute from "./components/PrivateRoute"


import {ACCESS_LEVEL_GUEST} from "./config/global_constants"


if (typeof localStorage.isLoggedIn === "undefined")
{
    localStorage.isLoggedIn = "false"
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
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