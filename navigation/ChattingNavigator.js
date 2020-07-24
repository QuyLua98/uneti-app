import * as React from "react";
import {CardStyleInterpolators, createStackNavigator, TransitionPresets} from "@react-navigation/stack";
import LoginScreen from "../screens/chatting/LoginScreen";
import ChattingTableScreen from "../screens/chatting/ChattingTableScreen";
import ChattingBoxScreen from "../screens/chatting/ChattingBoxScreen";

const ChattingWrapStack = createStackNavigator();
const ChattingStack = createStackNavigator();

export default class EgovNavigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    ChattingContent = () => {
        return (
            <ChattingStack.Navigator
                screenOptions={{
                    ...TransitionPresets.SlideFromRightIOS
                }}
            >
                <ChattingStack.Screen name="ChattingTable" component={ChattingTableScreen} options={{ headerShown: false }} />
                <ChattingStack.Screen name="ChattingBox" component={ChattingBoxScreen} options={{ headerShown: false }} />
            </ChattingStack.Navigator>
        );
    };

    render() {
        return (
            <ChattingWrapStack.Navigator>
                <ChattingWrapStack.Screen
                    name="ChattingLogin"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <ChattingWrapStack.Screen name="ChattingContent" component={this.ChattingContent} options={{ headerShown: false }} />
            </ChattingWrapStack.Navigator>
        );
    }
}