import React, {useState} from 'react';
import SearchBar from '../AppComponents/SearchBar';
import SwitchButton from '../AppComponents/SwitchButton';
import SearchHistory from '../AppComponents/SearchHistory';

import './homepage.css';

const HomePage = () => {

    /* State management for the SwitchButton component that toggles display for the 7 day weather forecast and this is passed down to SwitchButton Component*/
    const [searchHistory, setSearchHistory] = useState(true)
    /* Toggles the SearchHistory Component */
    const searchHistoryHandler = () =>{
        if(searchHistory){
            setSearchHistory(false)
        }else{
            setSearchHistory(true)
        }
    }
    
    return(
        <div className="home-div">
            <div className="search-div">
                <SearchBar/>
            </div>
            <div className="switch-div">
                <SwitchButton searchHistoryHandler={searchHistoryHandler}/>
            </div>
            <div className="searchHistory-div">
                {searchHistory && <SearchHistory/>}
            </div>
        </div>
    )
}

export default HomePage;