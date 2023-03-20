import React, {Component} from "react"
import {Link} from "react-router-dom"

import {ACCESS_LEVEL_NORMAL_USER} from "../config/global_constants"


export default class UserTable extends Component
{
    render()
    {
        console.log(this.props.user)
        return (
            <tr>
                <td>{this.props.user.name}</td>
                <td>{this.props.user.email}</td>
                <td>{this.props.user.accessLevel}</td>
                <td>
                    {localStorage.accessLevel >= ACCESS_LEVEL_NORMAL_USER || localStorage.email !== this.props.user.email? <Link className="red-button" to={"/DeleteUser/" + this.props.user._id}>Delete</Link> : null}
                </td>
            </tr>
        )
    }
}