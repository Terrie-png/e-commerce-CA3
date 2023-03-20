// import React, {Component} from "react"
// import Form from "react-bootstrap/Form"
// import {Redirect, Link} from "react-router-dom"
// import axios from "axios"

// import LinkInClass from "../components/LinkInClass"

// import {ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"

// export default class EditProduct extends Component
// {
//     constructor(props)
//     {
//         super(props)

//         this.state = {

//             name: ``,
//             brand: ``,
//             gender: ``,
//             category: ``,
//             price: ``,
//             is_in_inventory: ``,
//             items_left: ``,
//             slug: ``,
//             redirectToDisplayAllProducts:localStorage.accessLevel < ACCESS_LEVEL_ADMIN
//         }
//     }

//     componentDidMount()
//     {
//         this.inputToFocus.focus()

//          // needed for sessions to work
//         axios.get(`${SERVER_HOST}/Products/${this.props.match.params.id}`,{headers:{"authorization":localStorage.token}})
//             .then(res =>
//             {
//                 if(res.data)
//                 {
//                     if (res.data.errorMessage)
//                     {
//                         console.log(res.data.errorMessage)
//                     }
//                     else
//                     {
//                         this.setState({
//                             name: this.state.name,
//                             brand: this.state.brand,
//                             gender: this.state.gender,
//                             category: this.state.category,
//                             price: this.state.price,
//                             is_in_inventory: this.state.is_in_inventory,
//                             items_left: this.state.items_left,
//                             slug: this.state.slug
//                         })
//                     }
//                 }
//                 else
//                 {
//                     console.log(`Record not found`)
//                 }
//             })
//     }


//     handleChange = (e) =>
//     {
//         this.setState({[e.target.name]: e.target.value})
//     }


//     handleSubmit = (e) =>
//     {
//         e.preventDefault()

//         const ProductObject = {
//             name: this.state.name,
//             brand: this.state.brand,
//             gender: this.state.gender,
//             category: this.state.category,
//             price: this.state.price,
//             is_in_inventory: this.state.is_in_inventory,
//             items_left: this.state.items_left,
//             slug: this.state.slug
//         }

//          // needed for sessions to work
//         axios.put(`${SERVER_HOST}/Products/${this.props.match.params.id}`, ProductObject)
//             .then(res =>
//             {
//                 if(res.data)
//                 {
//                     if (res.data.errorMessage)
//                     {
//                         console.log(res.data.errorMessage)
//                     }
//                     else
//                     {
//                         console.log(`Record updated`)
//                         this.setState({redirectToDisplayAllProducts:true})
//                     }
//                 }
//                 else
//                 {
//                     console.log(`Record not updated`)
//                 }
//             })
//     }


//     render()
//     {
//         return (
//             <div className="form-container">

//                 {this.state.redirectToDisplayAllProducts ? <Redirect to="/DisplayAllProducts"/> : null}
//                 <Form>
//                     <Form.Group controlId="name">
//                         <Form.Label>Name</Form.Label>
//                         <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="name" value={this.state.name} onChange={this.handleChange} />
//                     </Form.Group>

//                     <Form.Group controlId="brand">
//                         <Form.Label>Brand</Form.Label>
//                         <Form.Control type="text" name="colour" value={this.state.Brand} onChange={this.handleChange} />
//                     </Form.Group>

//                     <Form.Group controlId="gender">
//                         <Form.Label>Gender</Form.Label>
//                         <select name="gender" value={this.state.gender} onChange={this.handleChange}>
//                         <option value="men">Men</option>
//                    <option value="women">Women</option>
//                     <option value="kids">Kids</option>
//                     </select>
//                     </Form.Group>

//                     <Form.Group controlId="category">
//                         <Form.Label>Category</Form.Label>
//                         {/* <Form.Control type="select" name="category" value={this.state.category} onChange={this.handleChange} /> */}
//                         <select name="category" value={this.state.category} onChange={this.handleChange}>
//                    <option value="running">Running</option>
//                    <option value="football">Football</option>
//                     <option value="casual">Casual</option>
//                   <option value="formal">Formal</option>
//                    </select>
//                     </Form.Group>

//                     <Form.Group controlId="price">
//                         <Form.Label>Price</Form.Label>
//                         <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />
//                     </Form.Group>

//                     <Form.Group controlId="is_in_inventory">
//                         <Form.Label>Have In Shop</Form.Label>
//                                              <select name="is_in_inventory" value={this.state.is_in_inventory} onChange={this.handleChange}>
//                    <option value="yes">Yes</option>
//                    <option value="no">No</option>
//                    </select>
//                     </Form.Group>

//                     <Form.Group controlId="items_left">
//                         <Form.Label>Items left</Form.Label>
//                         <Form.Control type="text" name="items_left" value={this.state.items_left} onChange={this.handleChange} />
//                     </Form.Group>

//                     <Form.Group controlId="slug">
//                         <Form.Label>Slug</Form.Label>
//                         <Form.Control type="text" name="slug" value={this.state.slug} onChange={this.handleChange} />
//                     </Form.Group>

//                     <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit}/>

//                     <Link className="red-button" to={"/DisplayAllProducts"}>Cancel</Link>
//                 </Form>
//             </div>
//         )
//     }
// }
import React, {Component} from "react"
import Form from "react-bootstrap/Form"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {SERVER_HOST} from "../config/global_constants"

export default class EditProduct extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            name: ``,
            brand: ``,
            gender: ``,
            category: ``,
            price: ``,
            is_in_inventory: ``,
            items_left: ``,
            slug: ``,
            image:``,
            redirect:false
        }
    }

    componentDidMount()
    {
        this.inputToFocus.focus()

        axios.get(`${SERVER_HOST}/products/${this.props.match.params.id}`)
            .then(res =>
            {
                if(res.data)
                {
                    if (res.data.errorMessage)
                    {

                        console.log("1")
                        console.log(res.data.errorMessage)
                    }
                    else
                    {
                        this.setState({
                            name: res.data.name,
                            brand:  res.data.brand,
                            gender:  res.data.gender,
                            category: res.data.category,
                            price: res.data.price,
                            is_in_inventory: res.data.is_in_inventory,
                            items_left:res.data.items_left,
                            slug:res.data.slug
                        })
                    }
                }
                else
                {
                    console.log(`Record not found`)
                }
            })
    }


    handleChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value})
    }

    product;
    handleSubmit = (e) =>
    {
        e.preventDefault()

        const productObject = {
            name: this.state.name,
            brand: this.state.brand,
            gender: this.state.gender,
            category: this.state.category,
            price: this.state.price,
            is_in_inventory: this.state.is_in_inventory,
            items_left: this.state.items_left,
            slug: this.state.slug
        }

        axios.defaults.withCredentials = true;
        axios.put(`${SERVER_HOST}/products/:id`, this.product, {headers:{"authorization":localStorage.token}})
            .then(res =>
            {
                if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        // console.log("1")
                        console.log(res.data.errorMessage)
                    }
                    else
                    {
                        console.log(`Record updated`)
                        this.setState({redirect:true})
                    }
                }
                else
                {
                    console.log(`Record not updated`)
                }
            })
    }


    render()
    {
        return (
            <div className="form-container">

                {this.state.redirect ? <Redirect to="/DisplayAllProducts"/> : null}
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
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />
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



                    <Form.Group controlId="slug">
                        <Form.Label>Slug</Form.Label>
                        <Form.Control type="text" name="slug" value={this.state.slug} onChange={this.handleChange} />
                    </Form.Group>


                    <LinkInClass value="Update" className="green-button" onClick={this.handleSubmit}/>

                    <Link className="red-button" to={"/DisplayAllProducts"}>Cancel</Link>
                </Form>
            </div>
        )
    }

}