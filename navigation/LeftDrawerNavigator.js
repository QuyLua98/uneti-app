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
import ChattingNavigator from "./ChattingNavigator";
import {getUserProfile} from "../store/auth/action";
import {connect} from "react-redux";

const Drawer = createDrawerNavigator();
const INITIAL_ROUTE_NAME = "Home";

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

class LeftDrawerNavigator extends React.Component {
  render() {
    return (
      <Drawer.Navigator
        initialRouteName={INITIAL_ROUTE_NAME}
        drawerContent={(props) => <DrawerContentComponent self={this.props} {...props} />}
      >
        <Drawer.Screen
          name="Home"
          component={Home}

        />
        <Drawer.Screen name="About" component={AboutScreen} />
        <Drawer.Screen name="Educate" component={EducationScreen} />
        <Drawer.Screen name="Login" component={EgovNavigator} />
        <Drawer.Screen name="Student" component={StudentNavigator} />
        <Drawer.Screen name="ChattingLogin" component={ChattingNavigator} />
        <Drawer.Screen name="Map" component={MapScreen} />
        <Drawer.Screen name="Contact" component={ContactScreen} />
      </Drawer.Navigator>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
const mapDispatchToProps = {getUserProfile};
export default connect(mapStateToProps, mapDispatchToProps)(LeftDrawerNavigator);