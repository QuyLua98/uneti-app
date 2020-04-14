import React from "react";
import axios from "axios";
import { Config } from "../config";
import { Thumbnail, Button, View, Text, Container, Header, Left, Right, Icon, Body, Title } from "native-base";
import { SESSION_ASP, CODE_SEARCH } from "../constants/Constants";
import { StyleSheet, ActivityIndicator, TouchableOpacity, ScrollView } from "react-native";
import GridHomeMenu from "../components/GridHomeMenu";

export default class StudentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isShowDetail: false,
      code: "",
      sessionAsp: "",
      student: {},
      menuMark: {
        title: "KẾT QUẢ HỌC TẬP",
        image: require("../assets/images/point-analyze.png"),
        link: "MarkTable",
      },
      menuSchedule: {
        title: "LỊCH HỌC",
        image: require("../assets/images/calendar.png"),
        link: "Schedule",
      },
      menuTestSchedule: {
        title: "LỊCH THI",
        image: require("../assets/images/calendar-with-clock.png"),
        link: "ScheduleTest",
      },
      menuDebt: {
        title: "CÔNG NỢ",
        image: require("../assets/images/money.png"),
        link: "DebtTable",
      },
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    const { code, sessionAsp } = this.props.route.params;

    this.setState({ code: code, sessionAsp: sessionAsp });

    const headers = {
      [SESSION_ASP]: sessionAsp,
      [CODE_SEARCH]: code,
    };

    axios
      .get(Config.API_URL + `/api/student/mark/`, { headers })
      .then((res) => {
        this.setState({ student: res.data });
        this.setState({ isLoading: false });
      })
      .catch((res) => {
        alert("Tải thông tin thất bại!Xin thử lại!");
        this.setState({ isLoading: false });
        this.props.navigation.goBack();
      });
  }

  onPressBack = () => {
    this.props.navigation.goBack();
  }

  onClickMenu = (link, data) => {
    this.props.navigation.navigate(link, { data: data });
  };

  toggleDetail = () => {
    console.log("aaa");
    this.setState({ isShowDetail: !this.state.isShowDetail });
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
      let {
        menuMark,
        menuSchedule,
        menuTestSchedule,
        menuDebt,
        student,
      } = this.state;
      let base64Image = `data:image/png;base64,${student.img}`;
      const data = {
        sessionAsp: this.state.sessionAsp,
        code: this.state.code,
      };
      return (
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={this.onPressBack}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>Thông tin sinh viên</Title>
            </Body>
          </Header>
          <View style={styles.headWrapper}>
            <View style={styles.head}>
              <View>
                <Thumbnail
                  large
                  square
                  source={{ uri: base64Image }}
                  style={styles.image}
                />
              </View>
              <View style={styles.info}>
                <Text style={styles.text}>Họ tên: {student.hoTen}</Text>
                <Text style={styles.text}>Mã SV: {student.maSV}</Text>
                <Text style={styles.text}>Tình trạng: {student.tinhTrang}</Text>
                <Text style={styles.text}>Giới tính: {student.gioiTinh}</Text>
                <Text style={styles.text}>
                  Ngày vào trường: {student.ngayVaoTruong}
                </Text>
                <Text style={styles.text}>Lớp: {student.lop}</Text>
              </View>
            </View>
          </View>
          {this.state.isShowDetail ? (
            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.toggleDetail}
              >
                <View style={styles.title}>
                  <Text style={styles.titleText}>THÔNG TIN &#8595;</Text>
                </View>
              </TouchableOpacity>
              <View style={styles.info2}>
                <Text style={styles.text}>Cơ sở: {student.coSo}</Text>
                <Text style={styles.text}>
                  Bậc đào tạo: {student.bacDaoTao}
                </Text>
                <Text style={styles.text}>Khoá: {student.khoa}</Text>
                <Text style={styles.text}>Ngành: {student.chuyenNganh}</Text>
                <Text style={styles.text}>Khoa: {student.khoaHoc}</Text>
              </View>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.toggleDetail}
              >
                <View style={styles.title}>
                  <Text style={styles.titleText}>THÔNG TIN &#8593;</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          <ScrollView style={styles.menu}>
            <View style={{ flexDirection: "row" }}>
              {/* Bảng điểm */}
              <TouchableOpacity
                style={styles.wrapper}
                activeOpacity={0.7}
                onPress={() => this.onClickMenu(menuMark.link, student.diem)}
              >
                <GridHomeMenu grid={menuMark} />
              </TouchableOpacity>
              {/* Lịch học */}
              <TouchableOpacity
                style={styles.wrapper}
                activeOpacity={0.7}
                onPress={() => this.onClickMenu(menuSchedule.link, data)}
              >
                <GridHomeMenu grid={menuSchedule} />
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row" }}>
              {/* Lịch thi */}
              <TouchableOpacity
                style={styles.wrapper}
                activeOpacity={0.7}
                onPress={() => this.onClickMenu(menuTestSchedule.link, data)}
              >
                <GridHomeMenu grid={menuTestSchedule} />
              </TouchableOpacity>
              {/* Công nợ */}
              <TouchableOpacity
                style={styles.wrapper}
                activeOpacity={0.7}
                onPress={() => this.onClickMenu(menuDebt.link, data)}
              >
                <GridHomeMenu grid={menuDebt} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Container>
      );
    }
  }

  render() {
    return this.load();
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 8,
  },
  headWrapper: {
    height: 200,
    backgroundColor: "#fff",
  },
  head: {
    flexDirection: "row",
    marginTop: 10,
  },
  image: {
    marginTop: 10,
    marginLeft: 10,
    width: 120,
    height: 160,
  },
  info: {
    padding: 10,
    marginLeft: 5,
    fontSize: 30,
  },
  text: {
    fontSize: 16,
    marginTop: 3,
  },
  title: {
    backgroundColor: "#84b5ff",
  },
  titleText: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    color: "#fff",
  },
  info2: {
    padding: 10,
    fontSize: 18,
    backgroundColor: "#fff",
  },
  menu: {
    flexDirection: "column",
    marginTop: 10,
  },
});
