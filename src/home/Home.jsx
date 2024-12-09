import React from 'react';
import { Banner } from './Banner'; // Correct path
import HomeCategory from './HomeCategory'; // Correct path to HomeCategory
import CategoryShowcase from './CategoryShowcase'; // Correct path to CategoryShowcase

const Home = () => {
    return (
        <div>
            <Banner />
            <HomeCategory /> {/* Add the HomeCategory component here */}
            <CategoryShowcase /> {/* Add the CategoryShowcase component here */}
        </div>
    );
};

export default Home;