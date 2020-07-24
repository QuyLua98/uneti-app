import React, {Component} from "react";
import {StyleSheet, Platform, TouchableOpacity} from "react-native";
import {View, Item, Input, Icon} from "native-base";
import Colors from "../../../constants/Colors";

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }

    onChangeText = (val) => {
        this.setState({text: val})
    }


    clearSearchText = () => {
        this.setState({text: ""});
    }

    render() {
        const {text} = this.state;
        return (
            <View style={styles.container}>
                <Item regular style={styles.item}>
                    <Icon name="search" style={styles.icon}/>
                    <Input clearButtonMode={'while-editing'} placeholder='Tìm kiếm' value={text} style={styles.input} onChangeText={this.onChangeText} />
                    {
                        Platform.OS === 'android' && text !== "" ?
                            <TouchableOpacity onPress={this.clearSearchText}>
                                <Icon name="close-circle-outline" style={styles.icon}/>
                            </TouchableOpacity>
                            : <></>
                    }
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