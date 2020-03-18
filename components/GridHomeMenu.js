import * as React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Thumbnail } from 'native-base'

export default class GridHomeMenu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { grid } = this.props;
    return (
      <View style={styles.shadow}>
        <View style={styles.itemContainer}>
          <Thumbnail square style={styles.image} source={grid.image} />
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
    alignItems: "center"
  },
  image: {
    marginTop: 10,
    tintColor: "#757575"
  },
  shadow: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 }
  },
  title: {
    fontSize: 14,
    marginBottom: 8,
    marginTop: 5,
    fontWeight: "bold",
    textAlign: "center",
  }
});
