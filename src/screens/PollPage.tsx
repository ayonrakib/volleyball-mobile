import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useReducer } from "react";
import Poll from "../Components/Poll";
import { userService } from "../service/UserService";
import Icon from 'react-native-vector-icons/FontAwesome';

function reducer(stateDictionary:any, action:any):any{
    switch(action.name){
        case "temparature":
            return { ...stateDictionary ,  temparature : action.data.temparature};
        case "weatherText":
            return { ...stateDictionary ,  weatherText : action.data.weatherText};
        case "weatherIcon":
            return { ...stateDictionary ,  weatherIcon : action.data.weatherIcon};
    }

}

const weatherTextToIconMapping = {"overcast clouds":"cloud"}

const PollPage = (props:any) => {
    console.log("came inside PollPage component!");
    const [stateDictionary, dispatch] = useReducer(reducer, { weatherText : "" , weatherIcon : "a" , temparature : 0 });
    useEffect(()=>{
        userService.getWeather(1,2,3).then(weatherDetails =>{
            dispatch({ name : "temparature" , data : { temparature : weatherDetails.data.main.feels_like} })
            dispatch({ name : "weatherText" , data : { weatherText : weatherDetails.data.weather[0].description} })
            dispatch({ name : "weatherIcon" , data : { weatherIcon : <Icon size={20} name={weatherTextToIconMapping[weatherDetails.data.weather[0].description]} color="black" />} })

        })
    }, [])


    const polls = [];
    for(var currentPollNumber = 0; currentPollNumber < 3; currentPollNumber++){
        polls.push(
                    <View
                        key={Math.random()}
                        style={{marginVertical: 10, width:"100%", alignSelf: "center", justifyContent: "center", backgroundColor: "yellow"}}>
                            <Poll temparature={stateDictionary.temparature} weatherText={stateDictionary.weatherText} weatherIcon={stateDictionary.weatherIcon}/>
                    </View>
        )
    }
    return(
        <View>
            {polls}
        </View>
        
    )
}

export default PollPage;