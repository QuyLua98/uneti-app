import React, {Component} from "react";
import {FlatList, StyleSheet} from "react-native";
import {Thumbnail, View} from "native-base";
import Colors from "../../../constants/Colors";
import AvatarIcon from "./AvatarIcon";

export default class UserSlide extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <FlatList
                data={[",", ",",",", ",",",", ",",",", ",",",", ",",",", ","]}
                horizontal={true}
                renderItem={() => {
                    return <AvatarIcon />
                }}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
            />
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