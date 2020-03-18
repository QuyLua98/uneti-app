import * as React from "react";
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Text,
  Button
} from "native-base";
import NewsScreen from "../screens/NewsScreen";
import Modal from "../components/Modal";
import { createStackNavigator } from "@react-navigation/stack";

const HomeStack = createStackNavigator();
const NewsStack = createStackNavigator();

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  TabNews = () => {
    return (
      <NewsStack.Navigator>
        <NewsStack.Screen name="News" component={NewsScreen} options={{ headerShown: false }} />
      </NewsStack.Navigator>
    );
  };

  render() {
    return (
      <HomeStack.Navigator mode="modal">
        <HomeStack.Screen
          name="Home"
          component={this.TabNews}
          options={{ headerShown: false }}
        />
        <HomeStack.Screen name="MyModal" component={Modal} options={{ headerTitle: "Xem chi tiết" }} />
      </HomeStack.Navigator>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};
