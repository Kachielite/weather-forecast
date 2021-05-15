import React, {useState} from 'react';
import SearchBar from '../AppComponents/SearchBar';
import SwitchButton from '../AppComponents/SwitchButton';
import SearchHistory from '../AppComponents/SearchHistory';

import './homepage.css';

const HomePage = () => {

    const [searchHistory, setSearchHistory] = useState(true)

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