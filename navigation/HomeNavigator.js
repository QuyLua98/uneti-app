import * as React from "react";
import NewsScreen from "../screens/NewsScreen";
import SearchNewsScreen from "../screens/SearchNewsScreen";
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
        <NewsStack.Screen name="SearchNews" component={SearchNewsScreen} options={{ headerShown: false }} />
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
        <HomeStack.Screen name="MyModal" component={Modal} options={{ headerShown: false }} />
      </HomeStack.Navigator>
    );
  }
}