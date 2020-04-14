import * as React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { SESSION_ASP, CODE_SEARCH } from "../constants/Constants";
import { Config } from "../config";
import ScheduleItem from "../components/ScheduleItem";
import { ActivityIndicator } from 'react-native';
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
} from "native-base";
import CalendarPicker from "react-native-calendar-picker";
import moment from "moment";
import axios from "axios";

export default class ScheduleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      calendarToggle: true,
      studyDates: [],
      schedule: [],
      currentSchedule: [],
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
      .get(Config.API_URL + `/api/student/schedule/current/`, { headers })
      .then((res) => {
        this.setState({ schedule: res.data });
        this.init();
        this.setState({ isLoading: false });
      })
      .catch((res) => {
        alert("Tải thông tin thất bại!Xin thử lại!");
        this.setState({ isLoading: false });
        this.props.navigation.goBack();
      });
  }

  init() {
    let studyDates = [];
    this.state.schedule.forEach((s) => {
      studyDates.push({
        date: moment(s.ngayHoc).format("YYYY-MM-DD"),
        style: { backgroundColor: "#6fc1fc" },
        textStyle: { color: "black" },
      });
    });

    this.setState({ studyDates: studyDates });
  }

  onDateChange = (date) => {
    let currentSchedule = [];
    this.state.schedule.forEach(s => {
      let day1 = moment(s.ngayHoc, "YYYY-MM-DD");
      let day2 = date.date() - 1;
      if (day1.date() == day2) {
        if (day1.format("M") == date.format("M")) {
          if (day1.format("YYYY") == date.format("YYYY")) {
            currentSchedule.push(Object.assign({}, s));
          }
        }
      }
    });
    if (currentSchedule.length !== 0) {
      currentSchedule.forEach(item => item.ngayHoc = moment(item.ngayHoc).format("DD-MM-YYYY"));
      this.setState({ currentSchedule });
    }else{
      this.setState({ currentSchedule: [] });
    }
  };

  onClickGoBack = () => {
    this.props.navigation.goBack();
  }

  _onClickCalendarIcon = () => {
    this.setState({ calendarToggle: !this.state.calendarToggle });
  };

  _loadingBlock() {
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

  render() {
    const { currentSchedule, studyDates, calendarToggle } = this.state;
    if(this.state.isLoading) return this._loadingBlock();
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
          <Right>
            <Button transparent onPress={this._onClickCalendarIcon}>
              <Icon name="calendar" />
            </Button>
          </Right>
        </Header>
        <Content>
          <View>
            {calendarToggle ? (
              <CalendarPicker
                todayTextStyle={{ fontWeight: "bold" }}
                customDatesStyles={studyDates}
                onDateChange={this.onDateChange}
              />
            ) : <></>}
          </View>
          <View style={{ height: 5, backgroundColor: "#E9EBEE" }}></View>
          <ScrollView style={{ flex: 1 }}>
            <View>
              {currentSchedule === undefined || currentSchedule.length == 0 ? (
                <></>
              ) : (
                currentSchedule.map((item, index) => {
                  return (
                    <ScheduleItem
                      key={index}
                      date={item.ngayHoc}
                      schedule={item.listMonHoc[0]}
                    />
                  );
                })
              )}
            </View>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
