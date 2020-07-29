import React, {Component} from "react";

import styles from "../../styles/egov/EgovStyles";
import {
    Image,
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
import {DrawerActions} from "@react-navigation/native";
import {connect} from 'react-redux';
import {getUserProfile, login} from "../../store/auth/action";
import Loader from "./components/Loader";
import {_retrieveAsyncStorageData, _storeAsyncStorageData} from "../../components/AsyncStorageUtils";
import {JWT_TOKEN, PASSWORD, USERNAME} from "../../constants/Constants";


class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "quylua",
            password: "cXV5bHVhOTg",
            isRemember: false,
            isLoading: false,
            isLoadingToken: false,
        }
    }

    async componentDidMount() {
        const token = await _retrieveAsyncStorageData(JWT_TOKEN);
        await this.props.getUserProfile(token);
        if(token !== null) {
            this.props.navigation.navigate("ChattingContent", {
                screen: "ChattingTable",
            });
        }
    }

    login = async () => {
        const {username, password, isRemember} = this.state;
        if(username === "" || password === "") {
            Alert.alert("Waning", "Tài khoản hoặc mật khẩu không được bỏ trống")
        }else {
            this.setState({isLoading: true})
            await this.props.login(username, password, isRemember);
            const token = this.props.auth.token;
            if(token !== null || token !== "") {
                this.props.navigation.navigate("ChattingContent", {
                    screen: "ChattingTable",
                });
            }
            this.setState({isLoading: false})
        }
    }

    render() {
        const {isRemember, isLoading} = this.state;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Loader loading={isLoading} />
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
                                source={require("../../assets/images/icon.png")}
                                style={styles.welcomeImage}
                            />
                        </View>
                        <View style={styles.body}>
                            <View style={styles.textInputContainer}>
                                <TextInput
                                    style={styles.textInput}
                                    textContentType="username"
                                    placeholder="Nhập mã sinh viên hoặc giảng viên"
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
                                    value={isRemember}
                                    onValueChange={() =>
                                        this.setState({isRemember: !isRemember})
                                    }
                                    style={styles.checkbox}
                                />
                                <Text style={styles.label}>Ghi nhớ thông tin</Text>
                            </View>
                            <TouchableOpacity style={styles.loginButton} onPress={this.login}>
                                <Text style={styles.loginButtonTitle}>ĐĂNG NHẬP</Text>
                            </TouchableOpacity>
                            <Text style={[styles.loginButtonTitle, {color: "#000", marginTop: 20}]}>Hoặc</Text>
                            <TouchableOpacity style={styles.loginButton}>
                                <Text style={styles.loginButtonTitle}>ĐĂNG KÍ</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.footer}/>
                    </View>
                </Container>
            </TouchableWithoutFeedback>
        );
    };
};

const mapStateToProps = state => ({
    auth: state.auth
});
const mapDispatchToProps = {login, getUserProfile};
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
