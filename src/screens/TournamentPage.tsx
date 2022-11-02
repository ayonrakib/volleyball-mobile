import {
    createDrawerNavigator
} from '@react-navigation/drawer';
import * as React from 'react';
import { View } from 'react-native';
import Article from './Article';
import Feed from './Feed';
import AppDrawer from '../Components/AppDrawer';


export default function TournamentPage() {
    const Drawer = createDrawerNavigator();
    const [active, setActive] = React.useState('');
    return (
        <View>
            <AppDrawer />
        </View>
    )
}