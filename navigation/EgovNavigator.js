import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import EgovScreen from "../screens/EgovScreen";
import LoginScreen from "../screens/LoginScreen";
import ScheduleLectureScreen from "../screens/ScheduleLectureScreen";

const EgovStack = createStackNavigator();
const EgovDetailtStack = createStackNavigator();

export default class EgovNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  EgovDetail = () => {
    return (
      <EgovDetailtStack.Navigator>
        <EgovDetailtStack.Screen name="EgovHome" component={EgovScreen} options={{ headerShown: false }} />
        <EgovDetailtStack.Screen name="ScheduleLectureScreen" component={ScheduleLectureScreen} options={{ headerShown: false }} />
      </EgovDetailtStack.Navigator>
    );
  };

  render() {
    return (
      <EgovStack.Navigator>
        <EgovStack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <EgovStack.Screen name="EgovDetail" component={this.EgovDetail} options={{ headerShown: false }} />
      </EgovStack.Navigator>
    );
  }
}