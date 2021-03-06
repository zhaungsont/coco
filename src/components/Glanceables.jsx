import React, { useEffect, useState } from "react";
import classes from "./Glanceables.module.css";
import CircularProgress from '@mui/material/CircularProgress';


export default function Glanceables(){

    const [weather, setWeather] = useState({});
    const [pop, setPop] = useState("");

    const {lat, lon} = {"lat": 25.0375198, "lon": 121.5636796};
    const APIkey = process.env.REACT_APP_OW_API;
    const WEATHERAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`;
    const FORECASTAPI = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`;

    let icon = '';
    useEffect(()=>{
        async function getWeather(){
            const response = await fetch(WEATHERAPI);
            if (!response.ok){
                console.error('error getting weather data');
            } else {
                const data = await response.json();
                console.log(data)
                const icon = data.weather[0].icon;
                const main = data.weather[0].main;
                const desc = data.weather[0].description;
                const temp = (data.main.temp - 273.15).toString().slice(0, 4);
                const high = (data.main.temp_max - 273.15).toString().slice(0, 4);
                const low = (data.main.temp_min - 273.15).toString().slice(0, 4);

                setWeather({
                    main: main,
                    desc: desc,
                    temp: temp,
                    icon: icon,
                    high: high,
                    low: low
                })
                console.log(main, desc, icon);
            }
        }

        async function getPOP(){
            const res = await fetch(FORECASTAPI);
            if (!res.ok){
                console.error('error getting weather forecast');
            } else {
                const data = (await res.json()).list[0].pop;
                const pop = (data * 100).toString().slice(0, 2) + '%';
                setPop(pop);

                // to convert a unix timestamp to Javascript date object,
                // simply multiply its value by 1000.
                // source: https://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript
                
                // UPDATE: turns out we don't need to manually get the correct timestamp after all...

            }
        }
        getWeather().catch(err => console.error(err));
        getPOP().catch(err => console.error(err));
    },[])

    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const now = new Date();
    const day = days[ now.getDay() ];
    const date = now.getDate()
    const month = months[ now.getMonth() ];
    const year = now.getFullYear();
    return(
        <div className={classes.glanceables}>
        {weather ? 
        <>
            <div className={classes.schedule}>
                <p><span>{day}</span><br />{month} {date}, {year}</p>
            </div>

            <div className={classes.precipitation}>
                <p><span>{pop}</span><br />Probability of Precipitation</p>
            </div>

            <div className={classes.weatherIcon}>
                {weather.icon ? <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}></img> : <CircularProgress />}
            </div>

            <div className={classes.weatherSpan}>
                <p className={classes.weatherDesc}><span>{weather.temp}??C</span> <br/>{weather.desc}</p>
            </div>

            <div className={classes.additionals}>
                <p><span>{weather.high}</span> ??C Max<br />
                <span>{weather.low}</span> ??C Min</p>
            </div>
        </>
        :
        <CircularProgress />}   
        </div>
    )
}