import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View
} from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import GridHomeMenu from "../components/GridHomeMenu";


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [
        { id: 1, title: 'HỒ SƠ NHÂN SỰ', image: require('../assets/images/robot-dev.png') , link: 'Schedule' },
        { id: 2, title: 'THÔNG BÁO', image: require('../assets/images/robot-dev.png') , link: 'Schedule' },
        { id: 3, title: 'LỊCH CÔNG TÁC', image: require('../assets/images/robot-dev.png') , link: 'Schedule' },
        { id: 4, title: 'LỊCH GIẢNG VIÊN', image: require('../assets/images/robot-dev.png') , link: 'Schedule' },
        { id: 5, title: 'HỘP THƯ', image: require('../assets/images/robot-dev.png') , link: 'Schedule' },
        { id: 6, title: 'THỐNG KÊ KHẢO SÁT', image: require('../assets/images/robot-dev.png') , link: 'Schedule' },
      ]
    }
  }

  onClickMenu = (link) => {
    this.props.navigation.navigate(link);
  }

  render() {
    const { grid } = this.state;
    return (
      <ScrollView>
        <FlatList 
          data={grid}
          contentContainerStyle={styles.container}
          numColumns={2}
          renderItem={({ item }) =>
            <TouchableOpacity style={styles.wrapper} activeOpacity={0.7} onPress={() => this.onClickMenu(item.link)} >
                <GridHomeMenu grid={item} />
            </TouchableOpacity>
           }
          keyExtractor={item => item.id}
        >
          
        </FlatList>
      </ScrollView>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingTop: 16
  },
  wrapper: {
    flex: 1,
    paddingHorizontal: 8
  },
  itemContainer: {
    marginBottom: 20,
    borderRadius: 4,
    backgroundColor: "#fff",
    overflow: "hidden"
  },
  info: {
    padding: 8
  },
  shadow: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 }
  },
  img: {
    height: 150,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4
  },
  title: {
    fontSize: 16,
    marginBottom: 8
  }
});
