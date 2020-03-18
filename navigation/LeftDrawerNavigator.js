import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./HomeNavigator";
import Student from "./StudentNavigator";
import ScheduleScreen from "../screens/ScheduleScreen";
import ContactScreen from "../screens/ContactScreen";
import MapScreen from "../screens/MapScreen";
import { StyleSheet } from "react-native";
import DrawerContentComponent from "../components/DrawerContentComponent";

const Drawer = createDrawerNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default class LeftDrawerNavigator extends React.Component {
  render() {
    return (
      <Drawer.Navigator initialRouteName={INITIAL_ROUTE_NAME} drawerContent={props => <DrawerContentComponent {...props} />}>
        <Drawer.Screen name="Home" label="Trang chủ" component={Home} />
        <Drawer.Screen
          label="Lịch dạy học"
          name="Schedule"
          component={ScheduleScreen}
        />
        <Drawer.Screen
          name="Student"
          component={Student}
        />
        <Drawer.Screen
          name="Map"
          headerTitle= "Vị trí trường học"
          component={MapScreen}
        />
        <Drawer.Screen
          name="Contact"
          headerTitle= "Vị trí trường học"
          component={ContactScreen}
        />
      </Drawer.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    height: 50
  }
});
