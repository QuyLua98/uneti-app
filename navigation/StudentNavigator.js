import * as React from "react";
import StudentSearchScreen from "../screens/student/StudentSearchScreen";
import StudentScreen from "../screens/student/StudentScreen";
import MarkTableScreen from "../screens/student/MarkTableScreen";
import DebtScreen from "../screens/student/DebtScreen";
import ScheduleScreen from "../screens/student/ScheduleScreen";
import ScheduleTestScreen from "../screens/student/ScheduleTestScreen";
import { createStackNavigator } from "@react-navigation/stack";

const StudentStack = createStackNavigator();
const StudenDetailtStack = createStackNavigator();

export default class StudentNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  StudentDetail = () => {
    return (
      <StudenDetailtStack.Navigator>
        <StudenDetailtStack.Screen name="StudentHome" component={StudentScreen} options={{ headerShown: false }} />
        <StudenDetailtStack.Screen name="MarkTable" component={MarkTableScreen} options={{ headerShown: false }} />
        <StudenDetailtStack.Screen name="Schedule" component={ScheduleScreen} options={{ headerShown: false }} />
        <StudenDetailtStack.Screen name="DebtTable" component={DebtScreen} options={{ headerShown: false }} />
        <StudenDetailtStack.Screen name="ScheduleTest" component={ScheduleTestScreen} options={{ headerShown: false }} />
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