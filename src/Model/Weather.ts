import React from "react";

export default class Weather{

    constructor(readonly weatherResponseObject){

    }

    public get temparature():number{
        return this.weatherResponseObject.main.feels_like;
    }

    public get weatherDescription():string{
        return this.weatherResponseObject.weather[0].description;
    }
}