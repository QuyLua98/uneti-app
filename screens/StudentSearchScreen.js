import React, { Component } from "react";
import axios from "axios";
import { Config } from "../config";
import {
  StyleSheet,
  View,
  AsyncStorage,
  ActivityIndicator,
} from "react-native";
import {
  ListItem,
  Body,
  Item,
  Input,
  Icon,
  Button,
  Text,
  CheckBox,
  Container,
  Header,
  Left,
  Title,
  Content,
} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SESSION_ASP, CODE_SEARCH } from "../constants/Constants";

export default class StudentSearchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionAsp: null,
      isLoading: false,
      isRemember: false,
      searchText: "",
      connected: false,
    };
  }

  async componentDidMount() {
    try {
      let sessionAsp = await AsyncStorage.getItem(SESSION_ASP);
      let code = await AsyncStorage.getItem(CODE_SEARCH);
      //debug
      // var instance = axios.create({ withCredentials: false });

      if (sessionAsp === null) {
        this.setState({ isLoading: true });
        await axios
          .get(Config.API_URL + `/api/session`)
          .then(async (res) => {
            await AsyncStorage.setItem(SESSION_ASP, res.data);
            this.setState({
              connected: true,
              isLoading: false,
            });
          })
          .catch((error) => {
            alert("Không thể kết nối đến server.\nXin thử lại sau!");
            console.log(error);
            this.setState({ isLoading: false });
          });
      } else {
        this.setState({
          connected: true,
          sessionAsp: sessionAsp,
        });
      }
      if (code !== null) {
        this.setState({ searchText: code, isRemember: true });
        this.onSubmit(code);
      }
    } catch (error) {
      alert("Không thể kết nối đến server.\nXin thử lại sau!");
      console.log(error);
      this.setState({ isLoading: false });
    }
  }

  onClickMenu = () => {
    this.props.navigation.toggleDrawer();
  };

  clearText = () => {
    this.setState({ searchText: "" });
  };

  toggleCheck = () => {
    this.setState({ isRemember: !this.state.isRemember });
  };

  onSubmit = () => {
    if (this.state.searchText === "") {
      alert("Mã sinh viên không được bỏ trống.");
    } else {
      if (this.state.isRemember) {
        this._storeCode(this.state.searchText);
      } else {
        this._removeCodeStore();
      }
      this.props.navigation.navigate("StudentDetail", {
        screen: "StudentHome",
        params: {
          code: this.state.searchText,
          sessionAsp: this.state.sessionAsp,
        },
      });
    }
  };

  _storeCode = async (code) => {
    try {
      await AsyncStorage.setItem(CODE_SEARCH, code);
    } catch (error) {}
  };

  _removeCodeStore = async () => {
    try {
      await AsyncStorage.removeItem(CODE_SEARCH);
    } catch (err) {}
  };

  load() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator
            animating={this.state.isLoading}
            size="large"
            color="#0000ff"
          />
        </View>
      );
    } else {
      return (
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={this.onClickMenu}>
                <Icon name="menu" />
              </Button>
            </Left>
            <Body>
              <Title>Tra cứu thông tin</Title>
            </Body>
          </Header>
          <View searchBar style={styles.container}>
            <Item style={styles.searchBarStyle}>
              <Icon name="ios-search" />
              {this.state.connected ? (
                <Input
                  placeholder="Nhập mã sinh viên cần tra cứu..."
                  value={this.state.searchText}
                  onChangeText={(searchText) => this.setState({ searchText })}
                />
              ) : (
                <Input
                  disabled
                  placeholder="Nhập mã sinh viên cần tra cứu..."
                  value={this.state.searchText}
                  onChangeText={(searchText) => this.setState({ searchText })}
                />
              )}
              <Icon
                onPress={this.clearText}
                name="close"
                style={{ color: "#ff8e8e" }}
              />
            </Item>
            <View style={{ padding: 10, marginTop: 10 }}>
              {this.state.connected ? (
                <Button
                  style={styles.btnSearch}
                  onPress={() => this.onSubmit(this.state.searchText)}
                >
                  <Text style={{ color: "#fff" }}>Tra Cứu</Text>
                </Button>
              ) : (
                <Button disabled style={styles.btnSearchDisable}>
                  <Text style={{ color: "#fff" }}>Tra Cứu</Text>
                </Button>
              )}
            </View>
            <TouchableOpacity onPress={this.toggleCheck} activeOpacity={0.7}>
              <ListItem>
                <CheckBox checked={this.state.isRemember} />
                <Body>
                  <Text>Ghi nhớ thông tin</Text>
                </Body>
              </ListItem>
            </TouchableOpacity>
          </View>
        </Container>
      );
    }
  }

  render() {
    return this.load();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
  },
  searchBarStyle: {
    padding: 10,
  },
  btnSearch: {
    backgroundColor: "#378fd3",
    justifyContent: "center",
    borderRadius: 5,
  },
  btnSearchDisable: {
    backgroundColor: "#adadad",
    justifyContent: "center",
    borderRadius: 5,
  },
});
