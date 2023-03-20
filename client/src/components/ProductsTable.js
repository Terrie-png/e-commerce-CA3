import React, {Component} from "react"
import ProductsTableRow from "./ProductsTableRow"
import BuyProduct from "./BuyProduct";
import {ACCESS_LEVEL_NORMAL_USER} from "../config/global_constants";
import {Link} from "react-router-dom";


export default class ProductsTable extends Component
{
    constructor(props){
        super(props)

    }

    render()
    {
        return (
            <table>
                <thead>
                <tr>
                    <th>name</th>
                    <th>brand</th>
                    <th>gender</th>
                    <th>category</th>
                    <th>price</th>
                    <th>is_in_inventory</th>
                    <th>items_lef</th>
                    <th>slug</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>
                {this.props.carts.map((product) => {
                    if(product == null){
                       console.log("null")
                    } else{
                        return <ProductsTableRow key={product._id} product={product}/>
                }})}
                </tbody>
                <tr>
                    <td>
                        {localStorage.accessLevel >= ACCESS_LEVEL_NORMAL_USER && this.props.carts.length > 0 ?<BuyProduct product={this.props.carts} price={this.props.price}/> : null}
                    </td>
                </tr>
            </table>
        )
    }
}