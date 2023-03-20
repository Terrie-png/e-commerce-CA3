import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {SERVER_HOST} from "../config/global_constants"


export default class Register extends Component
{
    constructor(props)
    {
        super(props)
        
        this.state = {
            name:"",
            email:"",
            password:"",
            confirmPassword:"",
            selectedFile:null,
            isRegistered:false
        } 
    }


    handleFileChange = (e) =>
    {
        this.setState({selectedFile: e.target.files[0]})
    }
    
    handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
    }
    
    
    handleSubmit = (e) => 
    {
        e.preventDefault()

        let formData = new FormData()
        formData.append("profilePhoto", this.state.selectedFile)

         // needed for sessions to work
        axios.post(`${SERVER_HOST}/users/register/${this.state.name}/${this.state.email}/${this.state.password}`,formData, {headers: {"Content-type": "multipart/form-data"}})
        .then(res => 
        {     
            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else // user successfully registered
                { 
                    console.log("User registered and logged in")
                    
                    localStorage.name = res.data.name
                    localStorage.accessLevel = res.data.accessLevel
                    localStorage.token = res.data.token
                    
                    this.setState({isRegistered:true})
                }        
            }
            else
            {
                console.log("Registration failed")
            }
        })   
    }


    render() 
    {     
        return (
            <form className="login-form" noValidate = {true} id = "loginOrRegistrationForm">
           
                {this.state.isRegistered ? <Redirect to="/DisplayAllCars"/> : null} 
            
                <h2>New User Registration</h2>
                <label>Name:
                <input  
                    name = "name"              
                    type = "text"
                    placeholder = "Name"
                    autoComplete="name"
                    value = {this.state.name}
                    onChange = {this.handleChange}
                    ref = {(input) => { this.inputToFocus = input }} 
                />
                </label><br/>
<label>Email
	        <input  
                    name = "email"              
                    type = "email"
                    placeholder = "Email"
                    autoComplete="email"
                    value = {this.state.email}
                    onChange = {this.handleChange}
                />
</label><br/>
<label>Password
	        <input  
                    name = "password"           
                    type = "password"
                    placeholder = "Password"
                    autoComplete="password"
                    title = "Password must be at least ten-digits long and contains at least one lowercase letter, one uppercase letter, one digit and one of the following characters (£!#€$%^&*)"
                    value = {this.state.password}
                    onChange = {this.handleChange}
                />
</label><br/>
<label>Confirm Password:
                <input          
                    name = "confirmPassword"    
                    type = "password"
                    placeholder = "Confirm password"
                    autoComplete="confirmPassword"
                    value = {this.state.confirmPassword}
                    onChange = {this.handleChange}
                />
</label><br/><br/>
<label>Upload an Image
                <input
                    type = "file"
                    onChange = {this.handleFileChange}
                />
</label>

<button type="submit">Sign Up
    <LinkInClass  className="green-button" onClick={this.handleSubmit} /></button>
                <Link className="red-button" to={"/DisplayAllCars"}>Cancel</Link>   
            </form>
        )
    }
}