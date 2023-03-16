import React, {Component} from "react";

import Profile from "./Profile";
import SearchBar from "./SearchBar";
import ShoppingIcon from "./ShoppingIcon";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";

export default class header extends Component{

    constructor(props) {
        super(props);
    }
    handleClick = () => {
        window.location.href = "/Login";
    }


    render(){
        return(
                <div id="cd">
                    <Link to={"/DisplayAllProducts"}><h1>KORs</h1></Link>
                    <h3 onClick={this.props.handleWomenFilter}>Women</h3>
                    <h3 onClick={this.props.handleMenFilter}>Men</h3>
                    <h3 onClick={this.props.handleKidsFilter}>Kids</h3>
                    <input  type="search" placeholder="Search"/>
                    {/* <FontAwesomeIcon icon={faCoffee} /> */}
                    <FontAwesomeIcon icon={faHeart} Style="font-size:250px;"/>
                    {/*for shopping cart*/}
                    <Link to={"/DisplayCart"}>
                        <FontAwesomeIcon icon={faCartShopping} />
                    </Link>
                    {/*for user profile*/}
                    <Link  className="green-button" to={"/Login"}>
                        <FontAwesomeIcon icon={faUser} onClick={this.handleClick} />
                    </Link>

                </div>


        )
    }
}