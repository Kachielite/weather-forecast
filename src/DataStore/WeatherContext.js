import {createContext,useEffect,useState} from 'react';
import axios from 'axios';
import moment from 'moment';
import { useHistory } from "react-router-dom";


//Create Weather Context
export const WeatherContext = createContext(); 

//Create WeatherContext Provider
export const WeatherProvider = (props) => {     

    
    const [query, setQuery] = useState("") 
    const [userQuery, setUserQuery,] = useState(() => getLocalStorage("userQuery", ""));
    const [searched, setSearched] = useState(() => getLocalStorage("searched", []))
    const [currentCondition, setCurrentCondition] = useState(() => getLocalStorage("currentCondition", {}))
    const [dailyConditions, setDailyConditions] = useState(() => getLocalStorage("dailyConditions", {}))
    const [weekdays, setWeekDays] = useState(() => getLocalStorage("weekdays", []))
    const [loading, setLoading] = useState(false)
    const [triggerError, setTriggerError] = useState(false)
    const [errMsg, setErrMsg] = useState()

    function setLocalStorage(key, value) {
        try {
          window.localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
          // catch possible errors:
          // https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
        }
      }
      
      function getLocalStorage(key, initialValue) {
        try {
          const value = window.localStorage.getItem(key);
          return value ? JSON.parse(value) : initialValue;
        } catch (e) {
          // if error, return initial value
          return initialValue;
        }
      }

    useEffect(() => {
        setLocalStorage("userQuery", userQuery);
        setLocalStorage("currentCondition", currentCondition);
        setLocalStorage("dailyConditions", dailyConditions);
        setLocalStorage("searched", searched);
        setLocalStorage("weekdays", weekdays);
      }, [userQuery, currentCondition, dailyConditions, searched,weekdays]);

    useEffect(()=>{
        setUserQuery(query)
    },[query])

  
    const searchHandler = (event) => { 
      setQuery(event.target.value)
      
    }
  
    const onSubmit = (event) =>{
        setQuery("")
        event.preventDefault()
            if(userQuery === ""){
                setTriggerError(true)
                setErrMsg("You must provide the name of the city to get weather forecast")
                return;
            }else{
                setUserQuery(query)
                getGeoLocation(userQuery)
                switchPage()
          }
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
          days.push( moment().add(i, 'days').format('ddd, D') )
        }
        
        setWeekDays(days.slice(1))

    }
     


    //History Tiles Action
    const cityHandler = (cityClicked) =>{
        getGeoLocation(cityClicked)
    }



    const apiKey = `${process.env.REACT_APP_WEATHER_API_KEY}`

    
    const getGeoLocation= async (userQuery)=>{
        setLoading(true)
        next7Days()

        //Convert CityName to Latitude and Longitude
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${userQuery}&appid=${apiKey}`;
        try {
        const res = await axios.get(url)
        let lat = res.data[0].lat;
        let lon = res.data[0].lon
        
        // Get weather details
        const url2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}`;
        const res2 = await axios.get(url2)
        setCurrentCondition({
            city:userQuery, 
            checkedOn: apiDate(res2.data.current.dt), 
            tempInCel: toCelsius(res2.data.current.temp),
            tempInFah: toFahrenheit(res2.data.current.temp),
            wind: toKMpH(res2.data.current.wind_speed),
            humidity: `${res2.data.current.humidity}%`
        })

        let daily = res2.data.daily.slice(1)

        setDailyConditions({
            weatherIcon: (daily.map(item => item.weather.map(item => item.icon))).flat(1),
            tempMin: daily.map(item => toCelsius(item.temp.min)),
            tempMax: daily.map(item => toCelsius(item.temp.max)),
            windSpeed: daily.map(item => toKMpH(item.wind_speed)),
            humidity: daily.map(item => item.humidity)
        })

        
        if(searched.some(item => item.cityName === userQuery)) {
            let objIndex = searched.findIndex((obj => obj.cityName === userQuery));
            searched.splice(objIndex,1)
            setSearched([{id: `${userQuery.substring(0,3)}${objIndex}`, cityName:userQuery.charAt(0).toUpperCase() + userQuery.toLowerCase().slice(1), checkedOn: getTime()},...searched])

        }else{
            setSearched([{id: `${userQuery.substring(0,3)}${searched.length + 1}`, cityName:userQuery.charAt(0).toUpperCase() + userQuery.toLowerCase().slice(1), checkedOn: getTime()},...searched])
        }

        

        } catch (error) {
            console.log('Error message: ', error.message);
            setTriggerError(true)
            if (error.message === "Network Error"){
                setErrMsg("Unable to connect. Please check your internet connection")
            } else if(error.message.data === undefined){
                setErrMsg("No records found. Please ensure that the name of the city is well spelled")
            } 
            history.push(`/`)

        } finally {
            setLoading(false)
        }
    }



    return(
        <WeatherContext.Provider value={{searchHandler, onSubmit, searched, userQuery, currentCondition, cityHandler, setUserQuery, loading, dailyConditions, weekdays, errMsg, triggerError, setTriggerError,query}}>
            {props.children}
        </WeatherContext.Provider>
    )
}