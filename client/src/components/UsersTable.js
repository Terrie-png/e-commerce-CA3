import React, {Component} from "react"
import ProductsTableRow from "./ProductsTableRow"
import BuyProduct from "./BuyProduct";
import {ACCESS_LEVEL_NORMAL_USER} from "../config/global_constants";
import UserTable from "./UserTable";



export default class UsersTable extends Component
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
                    <th>email</th>
                    <th>access_level</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>
                {this.props.users.map((user) => {
                    if(user == null){
                        console.log("null")
                    } else{
                        return <UserTable key={user._id} user={user}/>
                    }
                })}
                </tbody>
            </table>
        )
    }
}