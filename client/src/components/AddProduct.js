// import React, {Component} from "react"
// import {Redirect, Link} from "react-router-dom"
// import Form from "react-bootstrap/Form"

// import axios from "axios"

// import LinkInClass from "../components/LinkInClass"

// import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


// export default class AddCar extends Component
// {
//     constructor(props)
//     {
//         super(props)

//         this.state = {
//             setBrand: "",
//             setGender: "",
//             setCategory:"",
//             name:"",
//             brand:"",
//             gender:"",
//             category:"",
//             is_in_inventory:"",
//             price: "",
//             items_left: 0,
//             // imageURL: null,
//             slug:"",
//             redirectToDisplayAllProducts:localStorage.accessLevel < ACCESS_LEVEL_ADMIN
//         }
//     }


//     componentDidMount()
//     {
//         this.inputToFocus.focus()
//     }


//     handleChange = (e) =>
//     {
//         this.setState({[e.target.name]: e.target.value})
//     }


//     // handleFileChange = (e) =>
//     // {
//     //     this.setState({selectedFile:e.target.files[0]})
//     // }

//     handleSubmit = (e) =>
//     {
//         e.preventDefault()
// //
//         this.setState({ wasSubmittedAtLeastOnce: true });
// //


//         let formData = new FormData()


//             const productObject = {

//                 name:this.state.name,
//                 brand:this.state.brand,
//                 gender:this.state.gender,
//                 category:this.state.category,
//                 is_in_inventory: this.state.is_in_inventory,
//                 price:this.state.price,
//                 items_left: this.state.items_left,

//                 // imageURL: this.state.imageURL,
//                 slug:this.state.slug,
//                 wasSubmittedAtLeastOnce: false
//             }
//             let keys = Object.keys(productObject)
//             keys.map((o) => formData.append(o,productObject[o]))
//             formData.append("profilePhoto", this.state.selectedFile)


//         // needed for sessions to work
//         axios.post(`${SERVER_HOST}/products`,formData,{headers:{"authorization":localStorage.token,"Content-type":"multipart/form-data"}})
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
//                         console.log("Record added")
//                         this.setState({redirectToDisplayAllCars:true})
//                     }
//                 }
//                 else
//                 {
//                     console.log("Record not added")
//                 }
//             })
//     }


//     render()
//     {
//         let errorMessage = "";
//         if(this.state.wasSubmittedAtLeastOnce)
//         {
//             errorMessage = <div className="error">Product Details are incorrect<br/></div>;
//         }
//         // let gender1;
//         //             if (!this.state.gender1) {
//         //             gender1 = ""
//         //             } else {
//         //             gender1 = this.state.gender
//         //             }
//         // let is_in_inventory1;
//         //             if (!this.state.is_in_inventory) {
//         //             is_in_inventory1 = ""
//         //             } else {
//         //             is_in_inventory1 = this.state.is_in_inventory
//         //             }
//         //  let items_left1;
//         //             if (!this.items_left) {
//         //             items_left1 = ""
//         //             } else {
//         //             items_left1= this.items_left
//         //             }
//         // let imageURL1;
//         //             if (!this.imageURL) {
//         //             imageURL1 = ""
//         //             } else {
//         //             imageURL1= this.items_left
//         //             }
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
//                         <Form.Control type="text" name="brand" value={this.state.brand} onChange={this.handleChange} />
//                     </Form.Group>


//                     <Form.Group controlId="gender">
//                         <Form.Label>Gender</Form.Label>

//                  <select name="gender" value={this.state.gender} onChange={this.handleChange}>
//                         <option value="men">Men</option>
//                    <option value="women">Women</option>
//                     <option value="kids">Kids</option>
//                     </select>
//                     </Form.Group>

//                     <Form.Group controlId="category">
//                         <Form.Label>Category</Form.Label>
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
//                         <Form.Label>is_in_inventory</Form.Label>
//                         <select name="is_in_inventory" value={this.state.is_in_inventory} onChange={this.handleChange}>
//                    <option value="yes">Yes</option>
//                    <option value="no">No</option>
//                    </select>
//                     </Form.Group>

//                     <Form.Group controlId="items_left">
//                         <Form.Label>Stock Left</Form.Label>
//                         <Form.Control type="text" name="items_left" value={this.state.items_left} onChange={this.handleChange} />
//                     </Form.Group>

//                     {/* <Form.Group controlId="imageURL">
//                         <Form.Label>imageURL</Form.Label>
//                         <Form.Control type="file" name="imageURL" value={this.state.imageURL} onChange={this.handleFileChange} />
//                     </Form.Group> */}

//                     <Form.Group controlId="slug">
//                         <Form.Label>Slug</Form.Label>
//                         <Form.Control type="text" name="slug" value={this.state.slug} onChange={this.handleChange} />
//                     </Form.Group>

//                     <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit}/>

//                     <Link className="red-button" to={"/DisplayAllCars"}>Cancel</Link>
//                 </Form>
//             </div>
//         )
//     }
// }

// import React, {Component} from "react"
// import {Redirect, Link} from "react-router-dom"
// import Form from "react-bootstrap/Form"

// import axios from "axios"

// import LinkInClass from "../components/LinkInClass"

// import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


// export default class AddCar extends Component
// {
//     constructor(props)
//     {
//         super(props)

//         this.state = {
//             setBrand: ["NIKE", "HUSHPUPPIES","ADIDAS","Reebok","Vans"],
//             setGender: ["MEN","WOMEN","KIDS"],
//             setCategory:["RUNNING", "FOOTBALL","CASUAL","FORMAL"],
//             name:"",
//             brand:"",
//             gender:"",
//             category:"",
//             is_in_inventory:null,
//             price:0,
//             items_left: 0,
//             imageURL: null,
//             slug:"",
//             redirect: localStorage.accessLevel < ACCESS_LEVEL_ADMIN
//         }
//     }

//     componentDidMount()
//     {
//         this.inputToFocus.focus()
//     }

//     onChangeName(e)
//     {
//         this.setState({name: e.target.value})
//     }
//     onChangeBrand(e)
//     {
//         this.setState({brand: e.target.value})
//     }
//     onChangeGender(e)
//     {
//         this.setState({gender: e.target.value})
//     }

//     onChangeCategory(e)
//     {
//         this.setState({category: e.target.value})
//     }
//     onChangeIs_In_Inventory(e)
//     {
//         this.setState({is_in_inventory: e.target.value})
//     }
//     onChangePrice(e)
//     {
//         this.setState({price: e.target.value})
//     }
//     onChangeItems_Left(e)
//     {
//         this.setState({items_left: e.target.value})
//     }
//     onChangeSlug(e)
//     {
//         this.setState({slug: e.target.value})
//     }
//     onChangeImage(e)
//     {
//         if (e.target.files && e.target.files[0]) {
//           let img = e.target.files[0];
//           this.setState({
//             image: URL.createObjectURL(img)
//           });
//         }
//       };
//     onSubmit(e)
//     {
//         e.preventDefault()

//         let formData = new FormData()

//         const product = {
//             name:this.state.name,
//             brand:this.state.brand,
//             gender:this.state.gender,
//             category:this.state.category,
//             is_in_inventory: this.state.is_in_inventory,
//             items_left: this.state.items_left,
//             imageURL: this.state.imageURL,
//             slug:this.state.slug,
//         }

//         // axios.post(`${SERVER_HOST}/products/add`, product)
//         // .then(res => console.log(res.data))
//         axios.defaults.withCredentials = true;
//         axios.post(`${SERVER_HOST}/products/add`, product, {headers:{"authorization":localStorage.token}})
//         .then(res => console.log(res.data))

//         this.setState({
//             name: "",
//             brand:"",
//             gender:"",
//             category:"",
//             is_in_inventory:"",
//             price:"",
//             items_left:"",
//             slug:"",
//             image: "",
//             redirect: true
//         })
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
//                         <Form.Control type="text" name="brand" value={this.state.brand} onChange={this.handleChange} />
//                     </Form.Group>

//                     <Form.Group controlId="gender">
//                         <Form.Label>Gender</Form.Label>
//                  <select name="gender" value={this.state.gender} onChange={this.handleChange}>
//                         <option value="men">Men</option>
//                    <option value="women">Women</option>
//                     <option value="kids">Kids</option>
//                     </select>
//                     </Form.Group>

//                     <Form.Group controlId="category">
//                         <Form.Label>Category</Form.Label>
//                         <select name="category" value={this.state.category} onChange={this.handleChange}>
//                    <option value="running">Running</option>
//                    <option value="football">Football</option>
//                     <option value="casual">Casual</option>
//                   <option value="formal">Formal</option>
//                    </select>
//                     </Form.Group>

//                     <Form.Group controlId="is_in_inventory">
//                         <Form.Label>is_in_inventory</Form.Label>
//                         <select name="is_in_inventory" value={this.state.is_in_inventory} onChange={this.handleChange}>
//                    <option value="yes">Yes</option>
//                    <option value="no">No</option>
//                    </select>
//                     </Form.Group>

//                     <Form.Group controlId="items_left">
//                         <Form.Label>Stock Left</Form.Label>
//                         <Form.Control type="text" name="items_left" value={this.state.items_left} onChange={this.handleChange} />
//                     </Form.Group>

//                     <Form.Group controlId="imageURL">
//                         <Form.Label>imageURL</Form.Label>
//                         <Form.Control type="file" name="imageURL" value={this.state.imageURL} onChange={this.handleFileChange} />
//                     </Form.Group>

//                     <Form.Group controlId="slug">
//                         <Form.Label>Slug</Form.Label>
//                         <Form.Control type="text" name="slug" value={this.state.slug} onChange={this.handleChange} />
//                     </Form.Group>

//                     <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit}/>

//                     <Link className="red-button" to={"/DisplayAllCars"}>Cancel</Link>
//                 </Form>
//             </div>
//         )
//     }
// }

import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"
import Form from "react-bootstrap/Form"

import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {SERVER_HOST} from "../config/global_constants"


export default class AddProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            brand: "",
            gender: "",
            category: "",
            is_in_inventory: true,
            price: 0,
            items_left: 0,
            slug: "",
            image: "",
            redirect: false
        }
    }


    componentDidMount() {
        this.inputToFocus.focus()
    }


    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    product;


    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({wasSubmittedAtLeastOnce: true});

        const formInputsState = this.validate();
        if (Object.keys(formInputsState).every(index => formInputsState[index]))
        {

        const productObject = {
            name: this.state.name,
            brand: this.state.brand,
            gender: this.state.gender,
            category: this.state.category,
            is_in_inventory: this.state.is_in_inventory,
            price: this.state.price,
            items_left: this.state.items_left,
            slug: this.state.slug,
            wasSubmittedAtLeastOnce: false

        }
                    axios.defaults.withCredentials = true;
                    axios.post(`${SERVER_HOST}/products/add`, this.product, {headers:{"authorization":localStorage.token}})
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        console.log("Record added")
                        this.setState({redirect: true})
                    }
                } else {
                    console.log("Record not added")
                }
            })
    }

    }



    validateName()
    {
        const pattern = /^[A-Za-z]+$/;
        return pattern.test(String(this.state.name))
    }


    validateBrand()
    {
        const pattern = /^[A-Za-z]+$/;
        return pattern.test(String(this.state.brand))
    }



    validatePrice()
    {
        const price = parseInt(this.state.price)
        return (price >= 10 && price <= 1000)
    }
    validateStock()
    {
        const items_left = parseInt(this.state.items_left)
        return (items_left >= 1 && items_left <= 200)
    }
    validateSlug()
    {
        const slug = /^[A-Za-z]+$/;
        return slug.test(String(this.state.slug))
    }


    validate()
    {
        return {
            name: this.validateName(),
            brand: this.validateBrand(),
            price: this.validatePrice(),
            items_left:this.validateStock(),
            slug: this.validateSlug()


        };
    }

    render() {
        let errorMessage = "";
        if(this.state.wasSubmittedAtLeastOnce)
        {
            errorMessage = <div className="error">Shoe Details are incorrect<br/></div>;
        }

        return (
            <div className="form-container">
                {this.state.redirect ? <Redirect to="/DisplayAllProducts"/> : null}

                <Form>
                    {errorMessage}
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref={(input) => {
                            this.inputToFocus = input
                        }} type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" name="brand" value={this.state.brand} onChange={this.handleChange}/>
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
                        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange}/>
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
                        <Form.Control type="text" name="items_left" value={this.state.items_left}
                                      onChange={this.handleChange}/>
                    </Form.Group>


                    <Form.Group controlId="slug">
                        <Form.Label>Slug</Form.Label>
                        <Form.Control type="text" name="slug" value={this.state.slug} onChange={this.handleChange}/>
                    </Form.Group>


                    <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit}/>

                    <Link className="red-button" to={"/DisplayAllProducts"}>Cancel</Link>
                </Form>
            </div>
        )
    }

}