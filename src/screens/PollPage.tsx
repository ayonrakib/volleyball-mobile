import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { useReducer } from "react";
import Poll from "../Components/Poll";
import {WeatherService} from "../service/WeatherService";
import { userService } from "../service/UserService";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from "react-native-paper";

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

const weatherTextToIconMapping = {"overcast clouds":"cloud", "broken clouds" : "cloud"}

const PollPage = (props:any) => {
    console.log("came inside PollPage component!");
    const [stateDictionary, dispatch] = useReducer(reducer, { weatherText : "" , weatherIcon : "a" , temparature : 0, polls: [] });
    useEffect(()=>{
        userService.getWeather(1,2,3).then(weatherDetails =>{
            dispatch({ name : "temparature" , data : { temparature : weatherDetails.data.main.feels_like} })
            dispatch({ name : "weatherText" , data : { weatherText : weatherDetails.data.weather[0].description} })
            dispatch({ name : "weatherIcon" , data : { weatherIcon : <Icon size={20} name={weatherTextToIconMapping[weatherDetails.data.weather[0].description]} color="black" />} })

        })
    }, [])


    // create poll
    // input: nothing
    // return: nothing, just create a poll
    // method:
    //      1. push newly created poll in the polls state
    function createPoll(){
        console.log("clicked create poll!")
    }


    // save poll selection
    // input: poll id, poll Option Id
    // return: nothing, just assign selection in db
    // method:
    //      1. read poll id and selection id
    //      2. call API and send poll id and session and selection id
    //      3. if response is false:
    //          3.1. show modal to retry
    function savePollSelection(pollId:number, pollOptionId:number):void{
        console.log("selected poll option: ",pollId)
    }

    const polls = [];
    for(var currentPollNumber = 0; currentPollNumber < 3; currentPollNumber++){
        polls.push(
                    <View
                        key={Math.random()}
                        style={{marginVertical: 10, width:"100%", alignSelf: "center", justifyContent: "center", backgroundColor: "yellow"}}>
                            <Poll temparature={stateDictionary.temparature} weatherText={stateDictionary.weatherText} weatherIcon={stateDictionary.weatherIcon} savePollSelection={savePollSelection}/>
                    </View>
        )
    }

    const weatherDetails = new WeatherService();
    return(
        <View>
            <View style={{alignSelf:"center"}}>
                <Button style={{backgroundColor:"black", width:"60%"}} mode="contained" onPress={createPoll}>
                    Create Poll
                </Button>
            </View>

            {polls}
        </View>
        
    )
}

export default PollPage;