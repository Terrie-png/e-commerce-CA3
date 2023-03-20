import React, {Component} from "react"
import {Redirect} from "react-router-dom"
import axios from "axios"

import {SERVER_HOST} from "../config/global_constants"


export default class DeleteProduct extends Component 
{
    constructor(props) 
    {
        super(props)
        
        this.state = {
            redirect:false
        }
    }
    product;

    componentDidMount()
    {
        axios.defaults.withCredentials = true;
        axios.delete(`${SERVER_HOST}/products/${this.props.match.params.id}`, {headers: {"authorization": localStorage.token}})
            .then(res => {

            if(res.data)
            {
                if (res.data.errorMessage)
                {
                    console.log(res.data.errorMessage)    
                }
                else // success
                { 
                    console.log("Record deleted")
                }
                this.setState({redirect:true})
            }
            else 
            {
                console.log("Record not deleted")
            }
        })
    }
  
  
    render() 
    {
        return (
            <div>   
                {this.state.redirect ? <Redirect to="/DisplayAllProducts"/> : null}
            </div>
        )
    }
}