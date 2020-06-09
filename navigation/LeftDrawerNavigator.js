import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./HomeNavigator";
import StudentNavigator from "./StudentNavigator";
import AboutScreen from "../screens/AboutScreen";
import EducationScreen from "../screens/EducationScreent";
import ContactScreen from "../screens/ContactScreen";
import MapScreen from "../screens/MapScreen";
import DrawerContentComponent from "../components/DrawerContentComponent";
import EgovNavigator from "./EgovNavigator";

const Drawer = createDrawerNavigator();
const INITIAL_ROUTE_NAME = "Home";

export default class LeftDrawerNavigator extends React.Component {
  render() {
    return (
      <Drawer.Navigator
        initialRouteName={INITIAL_ROUTE_NAME}
        drawerContent={(props) => <DrawerContentComponent {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
        />
        <Drawer.Screen name="About" component={AboutScreen} />
        <Drawer.Screen name="Educate" component={EducationScreen} />
        <Drawer.Screen name="Login" component={EgovNavigator} />
        <Drawer.Screen name="Student" component={StudentNavigator} />
        <Drawer.Screen name="Map" component={MapScreen} />
        <Drawer.Screen name="Contact" component={ContactScreen} />
      </Drawer.Navigator>
    );
  }
}
