import React,{Component} from "react";
import UsersTable from "./UsersTable";
import axios from "axios";
import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"
import {Redirect} from "react-router-dom";




export default class UserPage extends Component{

    constructor(props) {
        super(props);

        this.state = {
            users:[]
        }
    }

    componentDidMount() {
        // needed for sessions to work
        axios.get(`${SERVER_HOST}/users`).then(res=>{
            this.setState({users:res.data})
        })
    }

    render() {
        return (
                <div>
                    <div className="table-container">
                        <h2>User</h2>
                        <UsersTable users={this.state.users}/>
                    </div>
                </div>

            )
    }
}
