import React from 'react';
import {AsyncStorage,Text} from 'react-native';
import { render } from 'react-dom';

export default class Logout extends React.Component {
    componentWillMount(){
        try {
            AsyncStorage.removeItem("token");
        }
        catch(exception) {
            return false;
        }
        this.props.navigation.navigate("Login");
    }

    render(){
        return(
            <Text></Text>
        )
    }

}