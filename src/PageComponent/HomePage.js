import React from 'react';
import SearchBar from '../AppComponents/SearchBar';
import SwitchButton from '../AppComponents/SwitchButton';
import SearchHistory from '../AppComponents/SearchHistory';

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
            <div className="searchHistory-div">
                <SearchHistory/>
            </div>
        </div>
    )
}

export default HomePage;