import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"

export default class AddProducts extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            name: "",
            description: "",
            price: "",
            category: "",
            image: "",
            redirect: false
        }

        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeDescription = this.onChangeDescription.bind(this)
        this.onChangePrice = this.onChangePrice.bind(this)
        this.onChangeCategory = this.onChangeCategory.bind(this)
        this.onChangeImage = this.onChangeImage.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChangeName(e)
    {
        this.setState({name: e.target.value})
    }

    onChangeDescription(e)
    {
        this.setState({description: e.target.value})
    }

    onChangePrice(e)
    {
        this.setState({price: e.target.value})
    }

    onChangeCategory(e)
    {
        this.setState({category: e.target.value})
    }

    onChangeImage(e)
    {
        this.setState({image: e.target.value})
    }

    onSubmit(e)
    {
        e.preventDefault()

        const product = {
            name: this.state.name,
            description: this.state.description,
            price: this.state.price,
            category: this.state.category,
            image: this.state.image
        }

        axios.post(`${SERVER_HOST}/products/add`, product)
        .then(res => console.log(res.data))

        this.setState({
            name: "",
            description: "",
            price: "",
            category: "",
            image: "",
            redirect: true
        })
    }

    render()
    {
        if(this.state.redirect)
        {
            return <Redirect to="/products"/>
        }

        return(
            <div>
                <h3>Add New Product</h3>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={this.state.name} onChange={this.onChangeName}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" value={this.state.description} onChange={this.onChangeDescription}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" value={this.state.price} onChange={this.onChangePrice}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" value={this.state.category} onChange={this.onChangeCategory}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" value={this.state.image} onChange={this.onChangeImage}/>
                    </Form.Group>
                    <Form.Group>
                        <input type="submit" value="Add Product" className="btn btn-primary"/>
                    </Form.Group>
                </Form>
                <LinkInClass to="/products" text="Back to Products"/>
            </div>
        )
    }
}