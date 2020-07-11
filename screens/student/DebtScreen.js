import * as React from "react";
import { StyleSheet, ActivityIndicator, Alert } from "react-native";
import { SESSION_ASP, CODE_SEARCH } from "../../constants/Constants";
import { Config } from "../../config";
import {
  Container,
  Content,
  List,
  Header,
  Button,
  Icon,
  Title,
  Body,
  Left,
  Right,
  Text,
  ListItem,
  View,
} from "native-base";
import DebtItem from "../../components/DebtItem";
import axios from "axios";

export default class DebtScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      listDebt: [],
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    const { data } = this.props.route.params;

    const headers = {
      [SESSION_ASP]: data.sessionAsp,
      [CODE_SEARCH]: data.code,
    };

    axios
      .get(Config.API_URL + `/api/student/debt/`, { headers })
      .then((res) => {
        this.setState({ listDebt: res.data });
        this.setState({ isLoading: false });
      })
      .catch((res) => {
        Alert.alert("Lỗi", "Tải thông tin thất bại!Xin thử lại!");
        this.setState({ isLoading: false });
        this.props.navigation.goBack();
      });
  }

  onClickGoBack = () => {
    this.props.navigation.goBack();
  };

  currencyFormat = (num) => {
    return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  getTotalDebt = (data) => {
    if (data.length === 0 || data === null) return;
    return data
      .map((item) => parseInt(item.congNo.split(",").join("")))
      .reduce((a, b) => a + b);
  };

  render() {
    if (!this.state.isLoading) {
      const { listDebt } = this.state;
      if (listDebt.length === 0)
        return (
          <Container>
            <Header>
              <Left>
                <Button transparent onPress={this.onClickGoBack}>
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body>
                <Title>Công nợ sinh viên</Title>
              </Body>
            </Header>
            <Content>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text>Bạn không có công nợ</Text>
              </View>
            </Content>
          </Container>
        );
      else {
        const totalDebt = this.getTotalDebt(listDebt);
        return (
          <Container>
            <Header>
              <Left>
                <Button transparent onPress={this.onClickGoBack}>
                  <Icon name="arrow-back" />
                </Button>
              </Left>
              <Body>
                <Title>Công nợ sinh viên</Title>
              </Body>
            </Header>
            <Content>
              <List>
                {listDebt.map((item, index) => {
                  return <DebtItem data={item} keyExtractor={index}></DebtItem>;
                })}
                <View style={styles.boder}></View>
                <ListItem>
                  <Left>
                    <Text style={styles.text}>Tổng cộng:</Text>
                  </Left>
                  <Right>
                    <Text style={styles.text}>
                      {this.currencyFormat(totalDebt)}
                    </Text>
                  </Right>
                </ListItem>
              </List>
            </Content>
          </Container>
        );
      }
    } else
      return (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator
            animating={this.state.isLoading}
            size="large"
            color="#0000ff"
          />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  boder: {
    borderBottomColor: "#d6d6d6",
    borderBottomWidth: 1,
  },
  text: {
    fontSize: 14,
    color: "red",
  },
});
