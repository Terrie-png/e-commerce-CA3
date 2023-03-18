import React, {Component} from "react"
import {Link, Redirect} from "react-router-dom"
import addToCartIcon from '../images/addToCartIcon.png'

import { ACCESS_LEVEL_ADMIN, ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"
import axios from "axios";


export default class ProductCard extends Component
{
    constructor(props)
    {
        super(props)
        this.state = { showAddToCart: false,
                        logined: true};
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleCartClick = this.handleCartClick.bind(this);
        }

    handleMouseEnter() {
        this.setState({ showAddToCart: true });
    }

    handleMouseLeave() {
        this.setState({ showAddToCart: false });
    }

    handleCartClick(e){
        if(localStorage.accessLevel >=ACCESS_LEVEL_NORMAL_USER ){
            axios.defaults.withCredentials = true
            axios.post(`${SERVER_HOST}/carts`,{productID:this.props.product._id},{headers:{"authorization":localStorage.token}}).then(res=>{
                    if(res.data){
                        if(res.data.errorMessage){
                            console.log(res.data.errorMessage);
                            this.setState({logined:false});
                        } else {
                            console.log("added")
                        }
                    } else{
                        console.log("something")
                    }
                }
            )
        } else {
            this.setState({logined:false});
            console.log("Please log in");
        }
    }

    render()
    {
        return (
            <div>
                {this.state.logined? null: <Redirect to='/Login'/>}
                <div className="image-container" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                    <img src={this.props.product.imageURL} alt="lol" height="250px" width="250px"/>
                    {this.state.showAddToCart &&(
                        <div className="add-to-cart">
                                <img src={addToCartIcon} alt="Add to Cart" height="20px" width="20px"  onClick={this.handleCartClick} />
                        </div>
                    )}

               </div>
                {/*<div>{this.props.product.slug}</div>*/}
                {/*<AddCart productID={this.props.product}/>*/}
                {localStorage.accessLevel === ACCESS_LEVEL_NORMAL_USER? <button onClick={this.addCart}> Add to Shopping cart </button>:null}
                <div>{this.props.product.name}</div>
                {/*<div>{this.props.product.brand}</div>*/}
                <div> {this.props.product.gender}</div>
                {/* <div> {this.props.product.category}</div> */}
                <div>{this.props.product.price}</div>
                {/*<div>{this.props.product.is_in_inventory}</div>*/}
                {/*<div> {this.props.product.items_left}</div>*/}

                {/*<div>{this.props.product.slug}</div>*/}

                {
                localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? 
                <Link className="green-button" to={"/EditProduct/" + this.props.product._id}>Edit</Link> 
                : null
                }

                {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="red-button" to={"/DeleteProduct/" + this.props.product._id}>Delete</Link> : null}
            </div>


            )
    }
}