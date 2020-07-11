import React, {Component} from "react";
import {StyleSheet} from "react-native";
import {View, Text, Thumbnail} from "native-base";
import Colors from "../../../constants/Colors";

export default class LineChat extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {myChat} = this.props;
        if (myChat) {
            return (
                <View style={styles.wrapper}>
                    <View style={styles.container}>
                        <Text style={styles.text}>AAAAAsssssss</Text>
                    </View>
                    <Thumbnail style={styles.img} source={require('../../../assets/images/chatting/avatar/account-female.png')}/>
                </View>
            );
        } else {
            return (
                <View style={styles.wrapper}>
                    <Thumbnail style={styles.img} source={require('../../../assets/images/chatting/avatar/account-female.png')}/>
                    <View style={styles.otherContainer}>
                        <Text style={styles.otherText}>BBBBBasBBBdBBBBBasdasdBBBasdasdBBBBBasdasddasd</Text>
                    </View>
                </View>
            );
        }

    }
}
const styles = StyleSheet.create({
    // wrapper: {
    //     flexDirection: "row",
    //     width: "60%"
    // },
    container: {
        marginTop: 5,
        marginBottom: 5,
        width: "60%",
        flexDirection: "row",
        alignSelf: "flex-end",
        borderRadius: 5,
    },
    otherContainer: {
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: Colors.brandLight,
        width: "60%",
        flexDirection: "row",
        alignSelf: "flex-start",
        borderRadius: 5
    },
    text: {
        backgroundColor: Colors.brandInfo,

        color: "#fff",
        fontSize: 18
    },
    otherText: {
        color: "#1f1f1f",
        fontSize: 18
    },
    img: {
        width: "100%",
        maxWidth: 50,
        maxHeight: 50,
    }
})