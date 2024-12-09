import React from 'react';
import { Link } from 'react-router-dom';

const title = "More Than 60,000 Customers";

const desc = "Buy products on any device with our app & enjoy your time as you want. Just download, install, and start shopping.";

const clientsList = [
    {
        imgUrl: '/src/assets/images/clients/avater.jpg',
        imgAlt: 'client avatar',
        text: 'Join with Us',
    },
    {
        imgUrl: '/src/assets/images/clients/avater.jpg',
        imgAlt: 'client avatar',
        text: 'Join with Us',
    },
    {
        imgUrl: '/src/assets/images/clients/avater.jpg',
        imgAlt: 'client avatar',
        text: 'Join with Us',
    },
    {
        imgUrl: '/src/assets/images/clients/avater.jpg',
        imgAlt: 'client avatar',
        text: 'Join with Us',
    },
    {
        imgUrl: '/src/assets/images/clients/avater.jpg',
        imgAlt: 'client avatar',
        text: 'Join with Us',
    },
    {
        imgUrl: '/src/assets/images/clients/avater.jpg',
        imgAlt: 'client avatar',
        text: 'Join with Us',
    },
    {
        imgUrl: '/src/assets/images/clients/avater.jpg',
        imgAlt: 'client avatar',
        text: 'Join with Us',
    },
];

const LocationSprade = () => {
    return (
        <div className='clients-section style-2 padding-tb'>
            <div className='container'>
                <div className='section-header text-center'>
                    <h2 className='title'>{title}</h2>
                    <p>{desc}</p>
                </div>
                {/* Main Content */}
                <div className='section-wrapper'>
                    <div className='clients'>
                        {clientsList.map((val, i) => (
                            <div key={i} className="client-list">
                                <Link to="/signup">
                                    <span>{val.text}</span>
                                </Link>
                                <div className='client-thumb'>
                                    <img src={val.imgUrl} alt={val.imgAlt} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationSprade;