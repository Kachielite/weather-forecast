import {createContext,useEffect,useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";



export const WeatherContext = createContext(); //create Weather Context

export const WeatherProvider = (props) => {     //Create WeatherContext Provider


    //Getting user request
    const [userQuery, setUserQuery,] = useState('');
    const [searched, setSearched] = useState([])
    const [currentCondition, setCurrentCondition] = useState({})
    const [loading, setLoading] = useState(false)



  
    const searchHandler = (event) => {
      setUserQuery(event.target.value)
    }
  
    const onSubmit = (event) =>{
      event.preventDefault()
      setSearched([{cityName:userQuery.charAt(0).toUpperCase() + userQuery.slice(1), checkedOn: getTime()},...searched])
      getGeoLocation()
      switchPage()
    }

    const history = useHistory();
    
    const switchPage = () =>{
        history.push(`forecast/${userQuery}`)
    }
    
    const getTime = () =>{
        let today = new Date();
        let date = today.getDate()+'-'+((`${today.getMonth()+1}`).length ===1 ?(`0${today.getMonth()+1}`):(today.getMonth()+1))+'-'+today.getFullYear();
        let time = today.getHours() + ":" + today.getMinutes() 
        let dateTime = date+' '+time;   

        return dateTime
    }

    const apiDate = (dt) =>{
        let today = new Date(dt * 1000);
        let date = today.getDate()+'-'+((`${today.getMonth()+1}`).length ===1 ?(`0${today.getMonth()+1}`):(today.getMonth()+1))+'-'+today.getFullYear();
        let time = ((`${today.getHours()+1}`).length ===1 ?(`0${today.getHours()+1}`):(today.getHours()+1)) + ":" + ((`${today.getMinutes()+1}`).length ===1 ?(`0${today.getMinutes()+1}`):(today.getMinutes()+1)) 
        let dateTime = date+' '+time;   
        return dateTime
    }

    const toCelsius = (temp) => {
        return (`${(temp - 273.14).toFixed(2)}°C`)
    }

    const toFahrenheit = (temp) =>{
        return (`${((temp * (9/5)) - 459.67).toFixed(2)}°F`)
    }

    const toKMpH = (wind) =>{
        return (`${(wind * (36/10)).toFixed(2)}Km/h`)
    }

    //History Tiles Action

    const cityHandler = (city) =>{
        setUserQuery(city)
        console.log(city, userQuery)
        getGeoLocation()
    }

    useEffect(()=> {},[userQuery])


    const apiKey = `${process.env.REACT_APP_WEATHER_API_KEY}`

    //Convert CityName to Latitude and Longitude
    const getGeoLocation= async ()=>{
        setLoading(true)

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
        setLoading(true)

        const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}`;
        
        try {
        const res = await axios.get(url)
       
        setCurrentCondition({
            city:userQuery, 
            checkedOn: apiDate(res.data.current.dt), 
            temp: `${toCelsius(res.data.current.temp)} / ${toFahrenheit(res.data.current.temp)}` ,
            wind: toKMpH(res.data.current.wind_speed),
            humidity: `${res.data.current.humidity}%`
        })

        } catch (error) {
            console.log('Error message: ', error);

        } finally {
            setLoading(false)
            
            
        }
    }


    return(
        <WeatherContext.Provider value={{searchHandler, onSubmit, searched, userQuery, currentCondition, cityHandler, setUserQuery, loading}}>
            {props.children}
        </WeatherContext.Provider>
    )
}