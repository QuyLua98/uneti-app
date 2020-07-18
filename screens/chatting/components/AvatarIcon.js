import React from "react";
import {StyleSheet} from "react-native";
import {Thumbnail, View} from "native-base";
import Colors from "../../../constants/Colors";

export default class AvatarIcon extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Thumbnail
                    style={styles.avatar}
                    source={require('../../../assets/images/chatting/avatar/account-male-128x128.png')}
                />
                {
                    this.props.isActive ? <View style={styles.dot} /> : <></>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: Colors.white,
    },
    avatar: {
        flex: 1,
        borderRadius: 50,
    },
    dot: {
        margin: 5,
        position: "absolute",
        bottom: -10,
        right: -10,
        width: 15,
        height: 15,
        borderRadius: 15,
        backgroundColor: Colors.green,
        color: "tomato"
    }

})