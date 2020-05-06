import React from "react";
import { TouchableOpacity } from "react-native";
import {

  Text,
  Left,
  Body,
  View,
  Thumbnail,
  Card,
  CardItem,
} from "native-base";

export default class LecturerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetail: false,
    };
  }

  toggleDetail = () => {
    this.setState({ isShowDetail: !this.state.isShowDetail });
  };

  render() {
    const { lecturer } = this.props;
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail
              large
              source={{uri: lecturer.image}}
              style={{ borderColor: "#999999", borderWidth: 1 }}
            />
            <Body>
              <Text style={{ fontSize: 20 }}>{lecturer.hoten}</Text>
              <Text note>{lecturer.hocVi}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <View
            style={{
              flex: 1,
            }}
          >
            <View
              style={{
                flex: 1,
                height: 30,
                justifyContent: "center",
                borderTopWidth: 1,
                borderTopColor: "#efefef",
              }}
            >
              <TouchableOpacity onPress={this.toggleDetail}>
                <Text
                  style={{
                    textAlign: "right",
                    color: "#ff354d",
                    textDecorationLine: "underline",
                    marginRight: 10
                  }}
                >
                  {">"} Xem chi tiết {"<"}
                </Text>
              </TouchableOpacity>
            </View>
            {this.state.isShowDetail ? (
              <View>
                <View
                  style={{
                    flex: 1,
                    borderTopWidth: 1,
                    borderTopColor: "#d3d3d3",
                    padding: 15,
                  }}
                >
                  <Text style={{ marginTop: 2 }}>
                    <Text style={{ fontWeight: "bold" }}>Năm sinh: </Text> {lecturer.namSinh}
                  </Text>
                  <Text style={{ marginTop: 2 }}>
                    <Text style={{ fontWeight: "bold" }}>Học hàm: </Text> {lecturer.hocHam}
                  </Text>
                  <Text style={{ marginTop: 2 }}>
                    <Text style={{ fontWeight: "bold" }}>Học vị: </Text> {lecturer.hocVi}
                  </Text>
                  <Text style={{ marginTop: 2 }}>
                    <Text style={{ fontWeight: "bold" }}>Khoa viện: </Text> {lecturer.khoaVien}
                  </Text>
                  <Text style={{ marginTop: 2 }}>
                    <Text style={{ fontWeight: "bold" }}>Thâm niên: </Text> {lecturer.thamNien}
                  </Text>
                  <Text style={{ marginTop: 2 }}>
                    <Text style={{ fontWeight: "bold" }}>Bộ Môn: </Text> {lecturer.boMon}
                  </Text>
                  <Text style={{ marginTop: 2 }}>
                    <Text style={{ fontWeight: "bold" }}>Điện thoại: </Text> {lecturer.dienThoai}
                  </Text>
                  <Text style={{ marginTop: 2 }}>
                    <Text style={{ fontWeight: "bold" }}>Email: </Text> {lecturer.email}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    height: 40,
                    justifyContent: "center",
                    borderTopWidth: 1,
                    borderTopColor: "#d3d3d3",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#245D7B",
                      fontSize: 16,
                    }}
                  >
                    Lĩnh vực nghiên cứu
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    borderTopWidth: 1,
                    borderTopColor: "#d3d3d3",
                    padding: 15,
                  }}
                >
                  {lecturer.linhVuc.map((item,index) => {
                    return <Text style={{ marginTop: 2, color: "#7f7f7f" }} key={index}>- {item}</Text>;
                  })}
                </View>
              </View>
            ) : (
              <></>
            )}
          </View>
        </CardItem>
      </Card>
    );
  }
}
