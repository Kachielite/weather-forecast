import {createContext,useState} from 'react';
import axios from 'axios';


export const WeatherContext = createContext(); //create Weather Context

export const WeatherProvider = (props) => {     //Create WeatherContext Provider


    //Getting user request
    const [userQuery, setUserQuery] = useState('');
    const [searched, setSearched] = useState([])
    // const [geoLocation, setGeoLocation] = useState({})



  
    const searchHandler = (event) => {
      setUserQuery(event.target.value)
    }
  
    const onSubmit = (event) =>{
      event.preventDefault()
      setSearched([{cityName:userQuery.charAt(0).toUpperCase() + userQuery.slice(1), checkedOn: getTime()},...searched])
      getGeoLocation()
    
      
    }
    
    const getTime = () =>{
        let today = new Date();
        let date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
        let time = today.getHours() + ":" + today.getMinutes() 
        let dateTime = date+' '+time;   

        return dateTime
    }

    const apiKey = "065faab4bf6c2518641eeb48bcc7bb2f"

    //Convert CityName to Latitude and Longitude
    const getGeoLocation= async ()=>{

        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${userQuery}&appid=${apiKey}`;
        
        try {
        const res = await axios.get(url)
        // setGeoLocation({lat:res.data[0].lat, lon:res.data[0].lon})
        getWeatherDetails(res.data[0].lat, res.data[0].lon )
        

        } catch (error) {
            console.log('Error message: ', error);

        } finally {
            
        }
    }

    // Get weather details
    const getWeatherDetails = async (lat, lon)=>{

        console.log(lat, lon)

        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}`;
        
        try {
        const res = await axios.get(url)
        console.log(res.data)

        } catch (error) {
            console.log('Error message: ', error);

        } finally {
            
        }
    }


    return(
        <WeatherContext.Provider value={{searchHandler, onSubmit, searched}}>
            {props.children}
        </WeatherContext.Provider>
    )
}