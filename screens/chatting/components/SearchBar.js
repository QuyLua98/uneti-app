import React, {Component} from "react";
import {StyleSheet} from "react-native";
import {View, Item, Input, Icon} from "native-base";
import Colors from "../../../constants/Colors";

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Item regular style={styles.item}>
                    <Icon name="search" style={styles.icon}/>
                    <Input placeholder='Tìm kiếm' style={styles.input}/>
                </Item>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    item: {
        height: 43,
        borderRadius: 13,
    },
    icon: {
      color: Colors.gray
    },
    input: {
        color: Colors.gray
    }
})