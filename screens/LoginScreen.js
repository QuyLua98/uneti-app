import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  AsyncStorage,
  Keyboard
} from "react-native";

export default class LoginScreen extends React.Component {
  componentWillMount() {
    AsyncStorage.getItem("token").then(token => {
      if (token) {
        this.props.navigation.navigate("Root");
      }
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  login = async () => {
    if (this.state.username === "" || this.state.password === "") {
      alert("Mời bạn nhập username và password.");
    } else {
      if (this.state.username === "admin" && this.state.username === "admin") {
        await AsyncStorage.setItem("token", "1");
        this.props.navigation.navigate("Root");
      } else {
        alert("Sai tài khoản hoặc mật khẩu.");
      }
    }
  };

  render() {
    this.props.navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => setCount(c => c + 1)} title="Update count" />
      )
    });
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require("../assets/images/robot-dev.png")}
              style={styles.welcomeImage}
            />
            <Text style={styles.title}>
              Trường Đại học Kinh tế Kĩ Thuật Công Nghiệp
            </Text>
          </View>
          <View style={styles.body}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                textContentType="username"
                placeholder="Nhập tài khoản"
                onChangeText={text => this.setState({ username: text })}
              ></TextInput>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                textContentType="password"
                secureTextEntry={true}
                placeholder="Nhập mật khẩu"
                onChangeText={text => this.setState({ password: text })}
              ></TextInput>
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={this.login}>
              <Text style={styles.loginButtonTitle}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footer}></View>
        </View>
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
    alignItems: "stretch"
  },
  header: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  body: {
    flex: 5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  footer: {
    flex: 2,
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    color: "#000",
    textAlign: "center",
    width: 400,
    fontSize: 22
  },
  textInputContainer: {
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 20
  },
  textInput: {
    width: 280,
    height: 45,
    backgroundColor: "white",
    borderRadius: 6
  },
  loginButton: {
    width: 280,
    height: 45,
    borderRadius: 6,
    marginTop: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(105,2,6)"
  },
  loginButtonTitle: {
    fontSize: 18,
    color: "white"
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  }
});
