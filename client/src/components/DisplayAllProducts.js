import React, {Component} from "react"
import {Link} from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '@fortawesome/fontawesome-free/css/all.min.css';
//import { faCartShopping, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

import axios from "axios"

import Logout from "./Logout"

import {ACCESS_LEVEL_GUEST,ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"
import ProductsCards from "./ProductsCards";
import LinkInClass from "./LinkInClass";

export default class DisplayAllProducts extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            products:[]
        }
    }


    componentDidMount() {
        // needed for sessions to work
        axios.get(`${SERVER_HOST}/products`)
            .then(res => {
                if (res.data) {
                    if (res.data.errorMessage) {
                        console.log(res.data.errorMessage)
                    } else {
                        console.log("Records read")
                        this.setState({products: res.data})
                    }
                } else {
                    console.log("Record not found")
                }
            })


    }

    handleReset(e) {
        // fetch(`jsonformatter.json`).then(res=>{
        //     console.log(res.data);
        // })
        axios.get(`${SERVER_HOST}/resetDB`).then(res=>{
            if(res.data) {
                res.data.map((data) => console.log(data))
            }
        // })
            //         axios.post(`${SERVER_HOST}/resetDB`)
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
            //                         console.log("Records read")
            //                         this.setState({products: res.data})
            //                     }
            //                 }
            //                 else
            //                 {
            //                     console.log("something wrong at the server side")
            //                 }
                        })
            //     }
        }


    render()
    {
        console.log(localStorage);

        return (
            <div>
                <head>
                </head>
            <body>
            <div id="ab">
            <h2> </h2>
                <div id="cd">
             <h1>KORs</h1>
            <h3>Women</h3>
            <h3>Men</h3>
            <h3>Kids</h3>
            <input type="search" placeholder="Search"/>
            {/* <FontAwesomeIcon icon={faCoffee} /> */}
            <FontAwesomeIcon icon={faHeart} Style="font-size:250px;"/>
            <FontAwesomeIcon icon={faCartShopping} />
            <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="form-container">
                {localStorage.accessLevel >  ACCESS_LEVEL_GUEST ?
                    <div className="logout">   
                        <Logout/>
                    </div>
                    :
                    <div>
                        <Link className="green-button" to={"/Login"}>Login</Link>
                        <Link className="blue-button" to={"/Register"}>Register</Link>
                        <Link className="red-button" to={"/ResetDatabase"}>Reset Database</Link>  <br/><br/><br/></div>
                }

                {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ?
                    <div className="add-new-car">
                        <Link className="blue-button" to={"/AddProduct"}>Add New Car</Link>
                    </div>
                    :
                    null
                }
                <div className="add-new-car" >
                    <LinkInClass value="RESET" className="red-button" onClick={this.handleReset}/>


                </div>
                <div className="table-container">
                    <ProductsCards product={this.state.products} />


                </div>
            </div>
            </div>
            </body>
            </div>
        )
    }
}