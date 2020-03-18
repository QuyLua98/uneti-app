import * as React from "react";
import StudentSearchScreen from "../screens/StudentSearchScreen";
import StudentScreen from "../screens/StudentScreen";
import MarkTableScreen from "../screens/MarkTableScreen";
import { createStackNavigator } from "@react-navigation/stack";

const StudentStack = createStackNavigator();
const StudenDetailtStack = createStackNavigator();

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  StudentDetail = () => {
    return (
      <StudenDetailtStack.Navigator>
        <StudenDetailtStack.Screen name="StudentHome" component={StudentScreen} options={{ headerShown: false }} />
        <StudenDetailtStack.Screen name="MarkTable" component={MarkTableScreen} options={{ headerTitle: "Kết quả học tập" }} />
      </StudenDetailtStack.Navigator>
    );
  };

  render() {
    return (
      <StudentStack.Navigator>
        <StudentStack.Screen
          name="Search"
          component={StudentSearchScreen}
          options={{ headerShown: false }}
        />
        <StudentStack.Screen name="StudentDetail" component={this.StudentDetail} options={{ headerShown: false }} />
      </StudentStack.Navigator>
    );
  }
}