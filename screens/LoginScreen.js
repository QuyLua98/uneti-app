import * as React from "react";
import axios from "axios";
import {Config} from "../config";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    AsyncStorage,
    Keyboard,
    CheckBox,
    Alert,
    ActivityIndicator
} from "react-native";
import {Container, Body, Button, Header, Icon, Left, Right, Spinner, Title} from 'native-base';
import {EGOV_TOKEN} from "../constants/Constants";
import {DrawerActions} from "@react-navigation/native";
import PasswordEncode from "../components/Encode"

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isRemember: false,
            isLoading: false,
            isLoadingToken: false,
            _0x6100: [
                "", // 0
                "\x2F\x43\x6F\x6D\x6D\x6F\x6E\x2F\x47\x65\x74\x50\x72\x69\x76\x61\x74\x65\x4B\x65\x79", // 1
                "\x67\x65\x74", // 2
                "\x76\x61\x6C", // 3
                "\x23", // 4
                "\x61\x6A\x61\x78", // 5
                "\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64", // 6
                "\x65\x38\x34\x61\x64\x36\x36\x30\x63\x34\x37\x32\x31\x61\x65\x30\x65\x38\x34\x61\x64\x36\x36\x30\x63\x34\x37\x32\x31\x61\x65\x30",
                "\x70\x61\x72\x73\x65", // 7
                "\x48\x65\x78", // 9
                "\x65\x6E\x63", // 10
                "\x55\x74\x66\x38", // 11
                "\x43\x72\x79\x70\x74\x6F\x67\x72\x61\x70\x68\x79\x50\x4D\x54\x2D\x45\x4D\x53", // 12
                "\x43\x42\x43", // 13
                "\x6D\x6F\x64\x65", // 14
                "\x50\x6B\x63\x73\x37", // 15
                "\x70\x61\x64", // 16
                "\x65\x6E\x63\x72\x79\x70\x74", // 17
                "\x41\x45\x53", // 18
                "\x76\x61\x6C\x75\x65", // 19
                "\x63\x69\x70\x68\x65\x72\x74\x65\x78\x74",
            ], // 20
        };
    }

    componentDidMount() {
        this.setState({isLoadingToken: true});
        AsyncStorage.getItem(EGOV_TOKEN).then((token) => {
            if (token) {
                axios
                    .post(Config.API_URL + `/api/isLogin`, {
                        token: token
                    })
                    .then((res) => {
                        if (res.data) {
                            this.props.navigation.navigate("EgovDetail", {
                                screen: "EgovHome",
                                params: {
                                    token: token,
                                },
                            });
                        }
                        this.setState({isLoadingToken: false});
                    }).catch(() => {
                    Alert.alert("Lỗi", "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
                    this.setState({isLoadingToken: false});
                })
            } else {
                this.setState({isLoadingToken: false});
            }
        });
    }

    login = async () => {
        if (this.state.username === "" || this.state.password === "") {
            alert("Mời bạn nhập username và password.");
        } else {
            this.setState({isLoading: true});

            let pK = await axios
                .get(Config.API_URL + `/api/salt/${this.state.username}`)
                .then((res) => {
                    return res.data;
                });
            let password = PasswordEncode(pK, this.state.username);

            axios
                .post(Config.API_URL + `/api/login`, {
                    username: this.state.username,
                    password: password
                })
                .then(async (res) => {
                    if (this.state.isRemember) {
                        await AsyncStorage.setItem(EGOV_TOKEN, res.data);
                    } else {
                        await AsyncStorage.removeItem(EGOV_TOKEN);
                    }
                    console.log(res.data);
                    this.props.navigation.navigate("EgovDetail", {
                        screen: "EgovHome",
                        params: {
                            token: res.data,
                        },
                    });
                    this.setState({isLoading: false});
                })
                .catch(() => {
                    Alert.alert("Lỗi", "Đăng nhập thất bại.");
                    this.setState({isLoading: false});
                });
        }
    };

    _loadingBlock() {
        return (
            <View style={{flex: 1, justifyContent: "center"}}>
                <ActivityIndicator
                    animating={this.state.isLoadingToken}
                    size="large"
                    color="#0000ff"
                />
            </View>
        );
    }

    render() {
        if (this.state.isLoadingToken) return this._loadingBlock;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Header>
                        <Left>
                            <Button
                                transparent
                                onPress={() => {
                                    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
                                }}
                            >
                                <Icon name="menu"/>
                            </Button>
                        </Left>
                        <Body>
                            <Title>Login</Title>
                        </Body>
                        <Right/>
                    </Header>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Image
                                source={require("../assets/images/icon.png")}
                                style={styles.welcomeImage}
                            />
                            <Text style={styles.title}>Cán bộ - giảng viên đăng nhập</Text>
                        </View>
                        <View style={styles.body}>
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    textContentType="username"
                                    placeholder="Nhập tài khoản"
                                    onChangeText={(text) => this.setState({username: text})}
                                />
                            </View>
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    textContentType="password"
                                    secureTextEntry={true}
                                    placeholder="Nhập mật khẩu"
                                    onChangeText={(text) => this.setState({password: text})}
                                />
                            </View>
                            <View style={styles.checkBoxContainer}>
                                <CheckBox
                                    value={this.state.isRemember}
                                    onValueChange={() =>
                                        this.setState({isRemember: !this.state.isRemember})
                                    }
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>Ghi nhớ thông tin</Text>
                            </View>
                            <TouchableOpacity style={styles.loginButton} onPress={this.login}>
                                <Text style={styles.loginButtonTitle}>ĐĂNG NHẬP</Text>
                            </TouchableOpacity>
                            {this.state.isLoading ? <Spinner color='red'/> : <></>}
                        </View>
                        <View style={styles.footer}/>
                    </View>
                </Container>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
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
