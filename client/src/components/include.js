import React from 'react';
// import headerImage from './header-image.jpg';

class include extends React.Component {
    render() {
        const middleImage='https://images.puma.com/image/upload/q_auto,f_auto,w_1440/regional/~regional~EEA~others~KOPs~SS23~RUNNING~RUN_TRAIN_FOREVERRUN~EEA_23SS_ECOM_MF_RT_NITRO_ForeverRUN_FullBleedHero_Desktop_1440x500_2.jpg/fmt/jpg/fmt/png'
        return (
            <div className="middle">
                <img src={middleImage} alt="Middle" className="middleImage" />
                <div className="middleContainer">
                    <h1 className="middleText">KEEPRUNNING</h1>
                    <p className="middleSubtext">Shop Now</p>
                </div>
            </div>
        );
    }
}

export default include;
