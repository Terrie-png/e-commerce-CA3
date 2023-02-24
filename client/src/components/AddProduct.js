import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class AddCar extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            setBrand: ["NIKE", "HUSHPUPPIES","ADIDAS","Reebok","Vans"],
            setGender: ["MEN","WOMEN","KIDS"],
            setCategory:["RUNNING", "FOOTBALL","CASUAL","FORMAL"],
            name:"",
            brand:"",
            gender:"",
            category:"",
            is_in_inventory: null,
            items_left: 0,
            imageURL: null,
            slug:"",
            redirectToDisplayAllProducts:localStorage.accessLevel < ACCESS_LEVEL_ADMIN
        }
    }


    componentDidMount()
    {
        this.inputToFocus.focus()
    }


    handleChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value})
    }


    handleFileChange = (e) =>
    {
        this.setState({selectedFile:e.target.files[0]})
    }

    handleSubmit = (e) =>
    {
        e.preventDefault()

        let formData = new FormData()

        const productObject = {

            name:this.state.name,
            brand:this.state.brand,
            gender:this.state.gender,
            category:this.state.category,
            is_in_inventory: this.state.is_in_inventory,
            items_left: this.state.items_left,
            imageURL: this.state.imageURL,
            slug:this.state.slug,
        }
        let keys = Object.keys(productObject)
        keys.map((o) => formData.append(o,productObject[o]))
        formData.append("profilePhoto", this.state.selectedFile)
        // needed for sessions to work
        axios.post(`${SERVER_HOST}/products`,formData,{headers:{"authorization":localStorage.token,"Content-type":"multipart/form-data"}})
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
                        console.log("Record added")
                        this.setState({redirectToDisplayAllCars:true})
                    }
                }
                else
                {
                    console.log("Record not added")
                }
            })
    }


    render()
    {
        return (
            <div className="form-container">
                {this.state.redirectToDisplayAllProducts ? <Redirect to="/DisplayAllProducts"/> : null}

                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" name="brand" value={this.state.brand} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="gender">
                        <Form.Label>Gender</Form.Label>
                 <select name="gender" value={this.state.gender} onChange={this.handleChange}>
                        <option value="men">Men</option>
                   <option value="women">Women</option>
                    <option value="kids">Kids</option>
                    </select>
                    </Form.Group>

                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <select name="category" value={this.state.category} onChange={this.handleChange}>
                   <option value="running">Running</option>
                   <option value="football">Football</option>
                    <option value="casual">Casual</option>
                  <option value="formal">Formal</option>
                   </select>
                    </Form.Group>

                    <Form.Group controlId="is_in_inventory">
                        <Form.Label>is_in_inventory</Form.Label>
                        <select name="is_in_inventory" value={this.state.is_in_inventory} onChange={this.handleChange}>
                   <option value="yes">Yes</option>
                   <option value="no">No</option>
                   </select>
                    </Form.Group>

                    <Form.Group controlId="items_left">
                        <Form.Label>Stock Left</Form.Label>
                        <Form.Control type="text" name="items_left" value={this.state.items_left} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="imageURL">
                        <Form.Label>imageURL</Form.Label>
                        <Form.Control type="file" name="imageURL" value={this.state.imageURL} onChange={this.handleFileChange} />
                    </Form.Group>

                    <Form.Group controlId="slug">
                        <Form.Label>Slug</Form.Label>
                        <Form.Control type="text" name="slug" value={this.state.slug} onChange={this.handleChange} />
                    </Form.Group>

                    <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit}/>

                    <Link className="red-button" to={"/DisplayAllCars"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}