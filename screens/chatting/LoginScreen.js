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

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isRemember: false,
            isLoading: false,
            isLoadingToken: false,
        }
    }

    componentDidMount() {
        this.props.navigation.navigate("ChattingContent", {
            screen: "ChattingTable",
        });
    }

    render() {
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
                            <Text style={[styles.loginButtonTitle, {color: "#000", marginTop: 20}]}>Hoặc</Text>
                            <TouchableOpacity style={styles.loginButton} onPress={this.login}>
                                <Text style={styles.loginButtonTitle}>ĐĂNG KÍ</Text>
                            </TouchableOpacity>
                            {this.state.isLoading ? <Spinner color='red'/> : <></>}
                        </View>
                        <View style={styles.footer}/>
                    </View>
                </Container>
            </TouchableWithoutFeedback>
        );
    };
};
