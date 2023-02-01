import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"
import {ACCESS_LEVEL_GUEST, SERVER_HOST} from "../config/global_constants"


export default class Logout extends Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            isLoggedIn:true
        }
    }
    
    
    handleSubmit = (e) => 
    {
        e.preventDefault()
        
        axios.defaults.withCredentials = true // needed for sessions to work
        axios.post(`${SERVER_HOST}/users/logout`)
        .then(res => 
        {     
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else
                { 
                    console.log("User logged out")
                    sessionStorage.clear() 

                    sessionStorage.name = "GUEST"
                    sessionStorage.accessLevel = ACCESS_LEVEL_GUEST
                    this.setState({isLoggedIn:false}) 
                }
            }
            else
            {
                console.log("Logout failed")
            }
        }) 
    }


    render()
    {
        return (
            <div>   
        
                {!this.state.isLoggedIn ? <Redirect to="/DisplayAllCars"/> : null} 
                  
                <LinkInClass value="Log out" className="red-button" onClick={this.handleSubmit}/> 
            </div>
        )
    }
}