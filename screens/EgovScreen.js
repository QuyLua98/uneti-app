import React, { Component } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {
  Container,
  Content,
  Header,
  Body,
  Right,
  Left,
  Button,
  Icon,
} from "native-base";

export default class EgovScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ten: "Nguyễn Duy Quý",
      ngaySinh: "",
      img: "",
      gioiTinh: "",
      noiSinh: "",
      donVi: "",
      loaiNhanSu: "",
      chucVu: "",
      phongBan: "",
      toBoMon: "",
    };
  }

  onClickMenu = () => {
    this.props.navigation.toggleDrawer();
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              iconLeft
              style={{ height: 30, marginRight: 15 }}
              onPress={this.onClickMenu}
            >
              <Icon name="menu" style={{ color: "#fff" }} />
            </Button>
          </Left>
          <Body></Body>
          <Right>
            <TouchableOpacity activeOpacity={0.6}>
              <Text style={{marginRight: 10, fontSize: 15, color: "#fff"}}>Đăng xuất</Text>
            </TouchableOpacity>
          </Right>
        </Header>
        <Content>
          <View style={styles.header}></View>
          <Image
            style={styles.avatar}
            source={{
              uri: "http://daotao.uneti.edu.vn/GetImage.aspx?MSSV=16103100504",
            }}
          />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>{this.state.ten}</Text>
              <Text style={styles.info}>Xem thông tin chi tiết</Text>
              {/* <Text style={styles.description}>
                Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum
                electram expetendis, omittam deseruisse consequuntur ius an,
              </Text> */}
              <TouchableOpacity
                style={[styles.buttonContainer, { backgroundColor: "#a2cc5a" }]}
              >
                <Text style={{ fontSize: 15, color: "#fff" }}>
                  Xem lịch dạy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={{ fontSize: 15, color: "#fff" }}>
                  Xem lịch coi thi
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttonContainer, { backgroundColor: "#e04f4f" }]}
              >
                <Text style={{ fontSize: 15, color: "#fff" }}>
                  Xem bảng lương
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginBottom: 10,
    textDecorationLine: "underline",
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
    width: 350,
    borderRadius: 10,
    backgroundColor: "#00BFFF",
  },
});
