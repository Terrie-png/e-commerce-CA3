import React, { Component } from 'react';

class footer extends Component {
    render() {
        return (
            <footer style={{ backgroundColor: '#333', color: '#fff', padding: '20px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h5>About Kors</h5>
                            <p>We produce eco-friendly and very comfortable shoes ready at your disposal.Grab a KORs product and experience a whole new world of comfyness.</p>
                        </div>
                        <div className="col-md-3">
                            <h5>Support Us</h5>
                            <ul>
                                <li>FAQ</li>
                                <li>Check Gift card Balance</li>
                                <li>Purchase a Gift Card</li>
                                <li>Check Order</li>
                                <li>Delivery</li>
                                <li>Find a store</li>
                                <li>Size Guard</li>
                            </ul>
                        </div>
                        <div className="col-md-3">
                            <h5>Contact Us</h5>
                            <ul>

                                <li>DKIT</li>
                                <li>Dundalk, Ireland A91DY90</li>
                                <li>kors@gmail.com</li>

                            </ul>
                        </div>
                        <div className="col-md-3">
                            <h5>Follow Us</h5>
                            <ul>
                                <li><a href="#">Facebook</a></li>
                                <li><a href="#">Twitter</a></li>
                                <li><a href="#">Instagram</a></li>
                            </ul>
                        </div>


                    </div>
                    <p>  © 2023 KORs, Inc. All Rights Reserved</p>
                </div>
            </footer>
        );
    }
}

export default footer;