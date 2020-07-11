import { StyleSheet } from "react-native";

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#fff",
        alignItems: "stretch",
    },
    header: {
        flex: 3,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    body: {
        flex: 5,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    footer: {
        flex: 2,
        flexDirection: "column",
        alignItems: "center",
    },
    title: {
        color: "#000",
        textAlign: "center",
        width: 400,
        fontSize: 22,
    },
    textInputContainer: {
        paddingHorizontal: 10,
        borderRadius: 6,
        marginTop: 20,
    },
    textInput: {
        width: 280,
        height: 45,
        backgroundColor: "white",
        borderRadius: 6,
    },
    loginButton: {
        width: 280,
        height: 45,
        borderRadius: 6,
        marginTop: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgb(105,2,6)",
    },
    loginButtonTitle: {
        fontSize: 18,
        color: "white",
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: "contain",
        marginTop: 3,
        marginLeft: -10,
    },
    checkBoxContainer: {
        flexDirection: "row",
        marginTop: 20,
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
});
