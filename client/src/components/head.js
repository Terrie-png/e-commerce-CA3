import React, { Component } from 'react';

class head extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            texts: ['Welcome to my KORS', 'Get 25% with your first order', 'Contact us'],
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            const { current, texts } = this.state;
            this.setState({
                current: (current + 1) % texts.length,
            });
        }, 2000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const { current, texts } = this.state;
        return (
            <header>
                <h2>{texts[current]}</h2>
            </header>
        );
    }
}

export default head;
