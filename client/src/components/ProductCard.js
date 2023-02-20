import React, {Component} from "react"
import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN} from "../config/global_constants"


export default class ProductCard extends Component
{
    render()
    {
        return (
            <div Style="padding:10px 10px 10px 10px; border-style:solid; margin:10px 10px 10px 10px">
                {this.props.product.name}
                {this.props.product.brand}
                {this.props.product.gender}
                {this.props.product.catxegory}
                {this.props.product.price}
                {this.props.product.is_in_inventory}
                {this.props.product.items_left}
                {this.props.product.imageURL}
                {this.props.product.slug}

                {localStorage.accessLevel > ACCESS_LEVEL_GUEST ? <Link className="green-button" to={"/EditProduct/" + this.props.product._id}>Edit</Link> : null}

                {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/DeleteProduct/" + this.props.product._id}>Delete</Link> : null}
            </div>


                    // {localStorage.accessLevel > ACCESS_LEVEL_GUEST ? <Link className="green-button" to={"/EditCar/" + this.props.car._id}>Edit</Link> : null}
                    //
                    // {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/DeleteCar/" + this.props.car._id}>Delete</Link> : null}

            )
    }
}