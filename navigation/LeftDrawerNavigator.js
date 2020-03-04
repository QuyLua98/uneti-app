import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import Logout from '../components/LogoutComponent';

const Drawer = createDrawerNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function LeftDrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <Drawer.Screen
        name="Home"
        label="Trang chủ"
        component={HomeScreen}
      />
      <Drawer.Screen
        label="Lịch dạy học"
        name="Schedule"
        component={ScheduleScreen}
      />
      <Drawer.Screen
        label="Đăng xuất"
        name="Logout"
        component={Logout}
      />
    </Drawer.Navigator>
  );
}
