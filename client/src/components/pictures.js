import React, { Component } from 'react';
import pic1 from "../images/pexels-gustavo-fring-4148952.jpg";
import pic2 from "../images/pexels-jeshootscom-7432.jpg";
import pic3 from "../images/pexels-ketut-subiyanto-4853114.jpg";
class pictures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            images: [
                   { src: pic1, alt: 'pic 1' },
                { src: pic2, alt: 'pic 2' },
                { src: pic3, alt: 'pic 3' },
            ],
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const { current, images } = this.state;
            this.setState({
                current: (current + 1) % images.length,
            });
        }, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { current, images } = this.state;
        return (
            <header>
                <img style={{width: "100%", height: "500px"}} src={images[current].src} alt={images[current].alt}/>
            </header>
        );
    }
}

export default pictures;
