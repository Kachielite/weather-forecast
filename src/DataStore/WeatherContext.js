import {createContext,useEffect,useState} from 'react';
import axios from 'axios';
import moment from 'moment';
import { useHistory } from "react-router-dom";



export const WeatherContext = createContext(); //create Weather Context

export const WeatherProvider = (props) => {     //Create WeatherContext Provider


    //Getting user request
    const [userQuery, setUserQuery,] = useState('');
    const [searched, setSearched] = useState([])
    const [currentCondition, setCurrentCondition] = useState({})
    const [dailyConditions, setDailyConditions] = useState({})
    const [weekdays, setWeekDays] = useState([])
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
        let date = moment().format('DD-MM-YYYY')
        let time = moment().format('HH:mm')
        let dateTime = date + " " + time;

        return dateTime
    }

    const apiDate = (dt) =>{
        let date = moment.unix(dt).format('DD-MM-YYYY')
        let time = moment.unix(dt).format('HH:mm')
        let dateTime = date+' '+time;   
        return dateTime
    }

    const toCelsius = (temp) => {
        return (`${(temp - 273.14).toFixed(2)}`)
    }

    const toFahrenheit = (temp) =>{
        return (`${((temp * (9/5)) - 459.67).toFixed(2)}`)
    }

    const toKMpH = (wind) =>{
        return (`${(wind * (36/10)).toFixed(2)}`)
    }

    
    const next7Days = () => {
        let days = [];
        let daysRequired = 7
        
        for (let i = 0; i <= daysRequired; i++) {
          days.push( moment().add(i, 'days').format('dddd, D') )
        }

        console.log(days)
        
        setWeekDays(days.slice(1))

    }
     
        
    


    //History Tiles Action

    const cityHandler = (city) =>{
        setUserQuery(city)
    }


    useEffect(()=>{
        if(userQuery){
            getGeoLocation()
        }
    },[userQuery])

    const apiKey = `${process.env.REACT_APP_WEATHER_API_KEY}`

    //Convert CityName to Latitude and Longitude
    const getGeoLocation= async ()=>{
        setLoading(true)
        next7Days()
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
            tempInCel: toCelsius(res.data.current.temp),
            tempInFah: toFahrenheit(res.data.current.temp),
            wind: toKMpH(res.data.current.wind_speed),
            humidity: `${res.data.current.humidity}%`
        })

        let daily = res.data.daily.slice(1)

        setDailyConditions({
            weatherIcon: (daily.map(item => item.weather.map(item => item.icon))).flat(1),
            tempMin: daily.map(item => toCelsius(item.temp.min)),
            tempMax: daily.map(item => toCelsius(item.temp.max)),
            windSpeed: daily.map(item => toKMpH(item.wind_speed)),
            humidity: daily.map(item => item.humidity)
        })

        // console.log((daily.map(item => item.weather.map(item => item.icon))).flat(1))
        // console.log(daily.map(item => item.temp.min))
        // console.log(daily.map(item => item.temp.max))
        // console.log(daily.map(item => item.wind_speed))
        console.log(daily.map(item => item.humidity))

        } catch (error) {
            console.log('Error message: ', error);

        } finally {
            setLoading(false)
            
            
        }
    }


    return(
        <WeatherContext.Provider value={{searchHandler, onSubmit, searched, userQuery, currentCondition, cityHandler, setUserQuery, loading, dailyConditions, weekdays}}>
            {props.children}
        </WeatherContext.Provider>
    )
}