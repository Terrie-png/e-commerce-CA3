import React, {Component} from "react"
import {Link} from "react-router-dom"
import addToCartIcon from '../images/addToCartIcon.png'

import { ACCESS_LEVEL_ADMIN} from "../config/global_constants"


export default class ProductCard extends Component
{
    constructor(props)
    {
        super(props)
        this.state = { showAddToCart: false };
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        // this.state = {
        //     products:[]
        }

    handleMouseEnter() {
        this.setState({ showAddToCart: true });
    }

    handleMouseLeave() {
        this.setState({ showAddToCart: false });
    }



    render()
    {
        return (
            <div>
                <div className="image-container" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    <img src={this.props.product.imageURL} alt="lol" height="250px" width="250px"/>
                    {this.state.showAddToCart &&(
                        <div className="add-to-cart">
                            <img src={addToCartIcon} alt="Add to Cart" height="20px" width="20px" />
                        </div>
                    )}
                    }
                </div>
                <div>{this.props.product.name}</div>
                {/*<div>{this.props.product.brand}</div>*/}
                {/*<div> {this.props.product.gender}</div>*/}
                <div> {this.props.product.category}</div>
                <div>{this.props.product.price}</div>
                {/*<div>{this.props.product.is_in_inventory}</div>*/}
                {/*<div> {this.props.product.items_left}</div>*/}

                {/*<div>{this.props.product.slug}</div>*/}

                {localStorage.accessLevel > ACCESS_LEVEL_ADMIN ? <Link className="green-button" to={"/EditProduct/" + this.props.product._id}>Edit</Link> : null}

                {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/DeleteProduct/" + this.props.product._id}>Delete</Link> : null}
            </div>


                    // {localStorage.accessLevel > ACCESS_LEVEL_GUEST ? <Link className="green-button" to={"/EditCar/" + this.props.car._id}>Edit</Link> : null}
                    //
                    // {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/DeleteCar/" + this.props.car._id}>Delete</Link> : null}

            )
    }
}