import React from "react";
import { View, Text } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import styles from "../styles/styles";

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function Poll(){
    return(
            <Card>
                <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
                    <Card.Content>
                        <Title>Card title</Title>
                        <Paragraph>Card content</Paragraph>
                    </Card.Content>
                    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                    <Card.Actions>
                        <Button>Cancel</Button>
                        <Button>Ok</Button>
                    </Card.Actions>
            </Card>
    )
}