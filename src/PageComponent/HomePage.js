import React from 'react';
import SearchBar from '../AppComponents/SearchBar';
import SwitchButton from '../AppComponents/SwitchButton'

import './homepage.css';

const HomePage = () => {
    return(
        <div className="home-div">
            <div className="search-div">
                <SearchBar/>
            </div>
            <div className="switch-div">
                <SwitchButton/>
            </div>
        </div>
    )
}

export default HomePage;