import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

export default class GridHomeMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { grid } = this.props;
    return (
      <View style={styles.shadow}>
        <View style={styles.itemContainer}>
          <Image style={styles.img} source={grid.image} />
          <Text style={styles.title}>{grid.title}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 20,
    borderRadius: 4,
    backgroundColor: "#fff",
    overflow: "hidden",
    

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
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "bold",
    textAlign: "center",
  }
});
