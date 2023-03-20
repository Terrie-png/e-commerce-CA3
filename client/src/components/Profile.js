import React, { Component } from "react";


import axios from "axios";


import { SERVER_HOST} from "../config/global_constants";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageUrl: "",
            user: null,
        };
    }

    componentDidMount() {
        const user = axios.get(`${SERVER_HOST}/users/login`,{headers:{"authorization":localStorage.token}})
        this.setState({ user });
    }

    handleImageUpload = (event) => {
        const imageUrl = URL.createObjectURL(event.target.files[0]);
        this.setState({ imageUrl });
    };



    render() {
        const { user } = this.state;
        return (
            <div className="prof">
                <input type="file" onChange={this.handleImageUpload} />
                            {user && (
                    <div className="user-info">
                        <img src={user.imageUrl} alt="" />
                        <p>{user.name}</p>
                    </div>
                )}
            </div>
        );
    }
}

export default Profile;
