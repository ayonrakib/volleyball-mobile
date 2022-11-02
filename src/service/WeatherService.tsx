import React, { ReactElement } from "react";
import axios from "axios";
import Weather from "../Model/Weather";
import Icon from 'react-native-vector-icons/FontAwesome';

export class WeatherService{
  weatherTextToIconMapping = new Map<string, string>([
    ["overcast clouds" , "cloud"], 
    ["broken clouds" , "cloud"]
  ]);
  constructor(){

  }
  
  async getWeather(): Promise<Weather>{
    console.log("came in get weather service");
    const rawWeatherDetails = await axios.get("https://api.openweathermap.org/data/2.5/weather?lat=30.2672&lon=97.7431&appid=1b6a9c43f4c7125af9f430ff79f20599&units=imperial");
    const weatherTextToIconMap = {"overcast clouds":"cloud", "broken clouds" : "cloud"};


    const weather = new Weather(rawWeatherDetails.data);
    const temparature = weather.temparature;
    const weatherDescription = weather.weatherDescription;
    // console.log("return from the weather obj is: ", temparature, weatherDescription)
    // const weatherIcon = <Icon size={20} name={weatherTextToIconMapping.get(weatherDescription)} color="black" />;
    return weather;
  }

  getWeatherIcon(weather:Weather): ReactElement{
    return <Icon size={20} name={this.weatherTextToIconMapping.get(weather.weatherDescription)} color="black" />
  }


}
