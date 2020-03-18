import React from "react";
import axios from "axios";
import { Container, Thumbnail } from "native-base";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity
} from "react-native";
import GridHomeMenu from "../components/GridHomeMenu";

export default class StudentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      student: {},
      grid: [
        {
          id: 1,
          title: "KẾT QUẢ HỌC TẬP",
          image: require("../assets/images/point-analyze.png"),
          link: "MarkTable"
        },
        {
          id: 2,
          title: "LỊCH HỌC",
          image: require("../assets/images/calendar.png"),
          link: "Schedule"
        },
        {
          id: 3,
          title: "LỊCH THI",
          image: require("../assets/images/calendar-with-clock.png"),
          link: "Schedule"
        },
        {
          id: 4,
          title: "CÔNG NỢ",
          image: require("../assets/images/money.png"),
          link: "Schedule"
        }
      ]
    };
  }

  componentWillMount() {
    const { id } = this.props.route.params;
    this.setState({ isLoading: true });
    axios
      .get(`http://192.168.1.70:8080/student/${id}/mark/`)
      // .get(`http://192.168.1.70:8080/student/mark/fake`)
      .then(res => {
        this.setState({ student: res.data });
        this.setState({ isLoading: false });
      })
      .catch(res => {
        alert("Tải thông tin thất bại!Xin thử lại!");
        this.setState({ isLoading: false });
        this.props.navigation.goBack();
      });
  }

  onClickMenu = link => {
    this.props.navigation.navigate(link, { data: this.state.student.diem });
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
      let { grid, student } = this.state;
      let base64Image = `data:image/png;base64,${student.img}`;
      return (
        <View>
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
          <View>
            <View style={styles.title}>
              <Text style={styles.titleText}>THÔNG TIN</Text>
            </View>
            <View style={styles.info2}>
              <Text style={styles.text}>Cơ sở: {student.coSo}</Text>
              <Text style={styles.text}>Bậc đào tạo: {student.bacDaoTao}</Text>
              <Text style={styles.text}>Khoá: {student.khoa}</Text>
              <Text style={styles.text}>Ngành: {student.chuyenNganh}</Text>
              <Text style={styles.text}>Khoa: {student.khoaHoc}</Text>
            </View>
          </View>
          <View style={styles.menu}>
            <FlatList
              data={grid}
              contentContainerStyle={styles.container}
              numColumns={2}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.wrapper}
                  activeOpacity={0.7}
                  onPress={() => this.onClickMenu(item.link)}
                >
                  <GridHomeMenu grid={item} />
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            ></FlatList>
          </View>
        </View>
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
    paddingHorizontal: 8
  },
  headWrapper: {
    height: 200,
    backgroundColor: "#fff"
  },
  head: {
    flexDirection: "row",
    marginTop: 10
  },
  image: {
    marginTop: 10,
    marginLeft: 10,
    width: 120,
    height: 140
  },
  info: {
    padding: 10,
    marginLeft: 5,
    fontSize: 30
  },
  text: {
    fontSize: 16,
    marginTop: 3
  },
  title: {
    backgroundColor: "#84b5ff"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    color: "#fff"
  },
  info2: {
    padding: 10,
    fontSize: 18,
    backgroundColor: "#fff"
  },
  menu: {
    marginTop: 10
  }
});
