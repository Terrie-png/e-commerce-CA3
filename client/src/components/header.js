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

    handleClick = () => {
        window.location.href = "/Login";
    }
    render(){
        return(
                <div id="cd">
                    <h1>KORs</h1>
                    <h3>Women</h3>
                    <h3>Men</h3>
                    <h3>Kids</h3>
                    <input type="search" placeholder="Search"/>
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