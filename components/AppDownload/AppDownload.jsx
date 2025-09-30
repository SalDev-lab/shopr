import React from 'react';
import './AppDownload.css';
import { assets } from '../../assets/assets';

const AppDownload = () => {
    return (
        <section className='app-download' id='app-download'>
            <div className="app-download-container">
                <p className="app-download-text">
                    For a Better Experience, <br />
                    Download <span>Tomato App</span>
                </p>
                <div className="app-download-platforms">
                    <img src={assets.play_store} alt="Google Play Store" />
                    <img src={assets.app_store} alt="Apple App Store" />
                </div>
            </div>
        </section>
    );
};

export default AppDownload;
