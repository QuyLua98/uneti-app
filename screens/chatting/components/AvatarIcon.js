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
                    source={require('../../../assets/images/chatting/avatar/avatar-quy.jpg')}
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
        borderRadius: 45,
        backgroundColor: Colors.white,
    },
    avatar: {
        flex: 1,
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    dot: {
        borderColor: Colors.gray,
        borderWidth: 0.5,
        margin: 5,
        position: "absolute",
        bottom: -7,
        right: -7,
        width: 15,
        height: 15,
        borderRadius: 15,
        backgroundColor: Colors.green,
        color: "tomato"
    }

})