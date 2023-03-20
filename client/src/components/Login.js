import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"
import {SERVER_HOST} from "../config/global_constants"


export default class Login extends Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            email:"",
            password:"",
            isLoggedIn:false
        }
    }
    
    
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }
    
    
    handleSubmit = (e) => 
    {
         // needed for sessions to work
        axios.post(`${SERVER_HOST}/users/login/${this.state.email}/${this.state.password}`)
        .then(res => 
        {     
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else // user successfully logged in
                { 
                    console.log("User logged in")
                    
                    localStorage.name = res.data.name
                    localStorage.accessLevel = res.data.accessLevel
                    localStorage.token = res.data.token
                    
                    this.setState({isLoggedIn:true})
                }        
            }
            else
            {
                console.log("Login failed")
            }
        })                
    }


    render()
    {            
        return (
            <form className="login-form" noValidate = {true} id = "loginOrRegistrationForm">
                <h2>Login</h2>
                
                {this.state.isLoggedIn ? <Redirect to="/Test"/> : null}
               <label>Email
                <input 
                    type = "email" 
                    name = "email" 
                    placeholder = "Email"
                    autoComplete="email"
                    value={this.state.email} 
                    onChange={this.handleChange}
                />
               </label> <br/>
                  <label>Password:
                <input 
                    type = "password" 
                    name = "password" 
                    placeholder = "Password"
                    autoComplete="password"
                    value={this.state.password} 
                    onChange={this.handleChange}
                />
                  </label>
                <br/><br/>

                <button>Sign In
                <LinkInClass value="Login" className="green-button" onClick={this.handleSubmit}/> </button>
                <Link className="red-button" to={"/DisplayAllProducts"}>Cancel</Link>
            </form>
        )
    }
}