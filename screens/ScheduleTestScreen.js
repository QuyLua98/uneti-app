import * as React from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { SESSION_ASP, CODE_SEARCH } from "../constants/Constants";
import { Config } from "../config";
import ScheduleTestItem from "../components/ScheduleTestItem";
import { ActivityIndicator } from "react-native";
import {
  View,
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Content,
  Text,
  Picker,
  Form,
} from "native-base";
import moment from "moment";
import axios from "axios";

export default class ScheduleTestScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLoadingBody: false,
      headers: {},
      selected: "",
      schedule: [],
      listTestPicker: {
        list: [],
        sort: [],
      },
    };
  }

  componentDidMount() {
    const { data } = this.props.route.params;
    const headers = {
      [SESSION_ASP]: data.sessionAsp,
      [CODE_SEARCH]: data.code,
    };
    this.setState({ isLoading: true, headers: headers });

    axios
      .get(Config.API_URL + `/api/student/schedule/test/`, { headers })
      .then((res) => {
        let list = res.data;
        let sort = this.sortListTest(list);
        const listTestPicker = {
          list: list,
          sort: sort,
        };
        this.onChangeSession(sort[0]);
        this.setState({ listTestPicker: listTestPicker });
        this.setState({ isLoading: false });
      })
      .catch((res) => {
        alert("Tải thông tin thất bại!Xin thử lại!");
        this.setState({ isLoading: false });
      });
  }

  onChangeSession = (num) => {
    this.setState({ isLoadingBody: true });
    const { headers } = this.state;
    axios
      .get(Config.API_URL + `/api/student/schedule/test/${num}/`, { headers })
      .then((res) => {
        let schedule = res.data;
        // Get day of week
        schedule.forEach((item) => {
          let day = moment(item.ngayThi).isoWeekday();
          if (day == 7) day = "Chủ nhật";
          else day = "Thứ " + (day + 1);
          let date = moment(item.ngayThi).format("DD-MM-YYYY");
          item.ngayThi = day + " ( " + date + " )";
        });
        this.setState({ schedule });
        this.setState({ isLoadingBody: false });
      })
      .catch((res) => {
        alert("Tải thông tin thất bại!Xin thử lại!");
        this.setState({ isLoadingBody: false });
      });
  };

  onClickGoBack = () => {
    this.props.navigation.goBack();
  };

  _loadingBlock(state) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator animating={state} size="large" color="#0000ff" />
      </View>
    );
  }

  onValueChange = (value) => {
    this.onChangeSession(value);
    this.setState({
      selected: value,
    });
  };

  sortListTest = (list) => {
    let keys = [];
    for (let k in list) {
      if (list.hasOwnProperty(k)) {
        keys.push(k);
      }
    }
    keys.sort((a, b) => b - a);
    return keys;
  };

  render() {
    const { schedule, listTestPicker } = this.state;
    const list = listTestPicker.list;
    const sort = listTestPicker.sort;
    if (this.state.isLoading) return this._loadingBlock(this.state.isLoading);
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.onClickGoBack}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Lịch học</Title>
          </Body>
        </Header>
        <Content contentContainerStyle={{ flex: 1 }}>
          <Form>
            <Picker
              mode="dropdown"
              iosHeader="Select your SIM"
              iosIcon={<Icon name="arrow-down" />}
              style={{ width: undefined }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange}
            >
              {sort.map((i) => {
                return <Picker.Item label={list[i]} value={i} />;
              })}
            </Picker>
          </Form>
          <View style={{ height: 15, backgroundColor: "#F7F7F7" }}></View>
          <SafeAreaView style={{ flex: 1 }}>
            {this.state.isLoadingBody ? (
              this._loadingBlock(this.state.isLoadingBody)
            ) : (
              <ScrollView>
                <View>
                  {schedule === undefined || schedule.length == 0 ? (
                    <View style={{ flex: 1, justifyContent: "center" }}>
                      <Text>Học kì hiện tại chưa có lịch thi.</Text>
                    </View>
                  ) : (
                    schedule.map((item, index) => {
                      return (
                        <>
                          <ScheduleTestItem key={index} schedule={item} />
                          <View style={{ height: 15, backgroundColor: "#F7F7F7" }}></View>
                        </>
                      );
                    })
                  )}
                </View>
              </ScrollView>
            )}
          </SafeAreaView>
        </Content>
      </Container>
    );
  }
}
