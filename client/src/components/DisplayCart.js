import React,{Component} from "react";
import {Link} from "react-router-dom";
import ProductsTable from "./ProductsTable";
import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants";
import axios from "axios";



export default class DisplayCart extends Component{

    constructor(props) {
        super(props);

        this.state = {
            carts:[]
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
                        this.setState({carts: res.data})
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
            <div className="table-container">
                <ProductsTable product={this.state.products} />
            </div>
        )
    }


}