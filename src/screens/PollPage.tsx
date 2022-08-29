import React from "react";
import { View, Text } from "react-native";
import { useReducer } from "react";
import Poll from "../Components/Poll";

const PollPage = (props:any) => {
    console.log("came inside PollPage component!");
    const polls = [];
    for(var currentPollNumber = 0; currentPollNumber < 10; currentPollNumber++){
        polls.push(
                    <View
                        key={Math.random()}
                        style={{marginVertical: 10, width:"80%", alignSelf: "center", justifyContent: "center", backgroundColor: "yellow"}}>
                            <Poll/>
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