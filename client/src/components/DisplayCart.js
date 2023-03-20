import React,{Component} from "react";
import {Link} from "react-router-dom";
import ProductsTable from "./ProductsTable";
import axios from "axios";
import {SANDBOX_CLIENT_ID, SERVER_HOST} from "../config/global_constants"
import PayPalMessage from "./PayPalMessage"
import {PayPalButtons, PayPalScriptProvider} from "@paypal/react-paypal-js"


import BuyProduct from "./BuyProduct"


export default class DisplayCart extends Component{

    constructor(props) {
        super(props);

        this.state = {
            carts:[],
            price:0
        }
    }

    componentDidMount() {
         // needed for sessions to work
        axios.get(`${SERVER_HOST}/carts`,{headers:{"authorization":localStorage.token}})
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
                        console.log("Records read")
                        let total_price = 0;
                        res.data.map((product) => {
                            if(product == null){
                                console.log("null")
                            } else {
                                total_price += product.price
                            }
                        })
                        this.setState({carts: res.data, price: total_price})
                    }
                }
                else
                {
                    console.log("Record not found")
                }
            })
    }

    render() {
        return(
            <div>
                <div className="table-container">
                    <ProductsTable carts={this.state.carts} price={this.state.price} />
                </div>
            </div>
        )
    }


}