import React from "react";
import { View, Text } from "react-native";
import { Avatar, Button, Card, Title, Paragraph, RadioButton, ToggleButton  } from 'react-native-paper';
import styles from "../styles/styles";
import Icon from 'react-native-vector-icons/FontAwesome';
import { pollService } from "../service/PollService";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const LeftContent = () => <Icon size={25} name="home" color="black" /> 

export default function Poll(props){
    // const [value, setValue] = React.useState('first');
    const [value, setValue] = React.useState('left');

    function getPollSelectionValue(button):void{
        console.log("button pressed is: ",button)
    }
    return(
            <Card>
                <Card.Content>
                    <View 
                        style={{alignItems: "center"}}>
                            <Title>
                                Cedar Park Recreation Center
                            </Title>
                    </View>
                    
                    <Paragraph>
                        Temparature: {props.temparature} F
                    </Paragraph>
                    <Paragraph>
                        Weather: {props.weatherIcon} {props.weatherText}
                    </Paragraph>
                </Card.Content>
                <Card.Cover 
                    source={require("../images/rec_center.jpg")} 
                />
                <ToggleButton.Group
                    onValueChange = {value => setValue(value)}
                    value={value}
                >
                    <View
                        style={{flexDirection:"row", alignSelf:"center", margin: 10}}>
                        <View nativeID="yesButton">
                            <ToggleButton 
                                icon="check"
                                value="yes"
                                onPress={() => pollService.savePollSelection(1, "yes")}
                            />
                        </View>
  
                        <ToggleButton 
                            icon="close" 
                            value="no"
                            onPress={(e) => getPollSelectionValue(e)}
                        />
                        <ToggleButton 
                            icon="snapchat" 
                            value="maybe"
                            onPress={(e) => getPollSelectionValue(e)}
                        />
                    </View>
                </ToggleButton.Group>
                {/* <Card.Actions>
                    <Button>
                        Cancel
                    </Button>
                    <Button>
                        Ok
                    </Button>
                </Card.Actions> */}
            </Card>
    )
}