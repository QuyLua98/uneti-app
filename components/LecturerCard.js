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
    return (
      <Card>
        <CardItem>
          <Left>
            <Thumbnail
              large
              source={require("../assets/images/about/avatar.jpg")}
              style={{ borderColor: "#999999", borderWidth: 1 }}
            />
            <Body>
              <Text style={{ fontSize: 20 }}>Nguyễn Hoàng Chiến</Text>
              <Text note>Th.S</Text>
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
                    <Text style={{ fontWeight: "bold" }}>Năm sinh: </Text> 1
                  </Text>
                  <Text style={{ marginTop: 2 }}>
                    <Text style={{ fontWeight: "bold" }}>Học hàm: </Text> 1ádasd
                  </Text>
                  <Text style={{ marginTop: 2 }}>
                    <Text style={{ fontWeight: "bold" }}>Học vị: </Text> 1ádsdsd
                  </Text>
                  <Text style={{ marginTop: 2 }}>
                    <Text style={{ fontWeight: "bold" }}>Khoa viện: </Text> 1ádd
                  </Text>
                  <Text style={{ marginTop: 2 }}>
                    <Text style={{ fontWeight: "bold" }}>Thâm niên: </Text>{" "}
                    1sdasdasd
                  </Text>
                  <Text style={{ marginTop: 2 }}>
                    <Text style={{ fontWeight: "bold" }}>Bộ Môn: </Text> ádasd
                  </Text>
                  <Text style={{ marginTop: 2 }}>
                    <Text style={{ fontWeight: "bold" }}>Điện thoại: </Text> 1
                  </Text>
                  <Text style={{ marginTop: 2 }}>
                    <Text style={{ fontWeight: "bold" }}>Email: </Text> 1
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
                  <Text
                    style={{
                      marginTop: 2,
                      color: "#7f7f7f",
                    }}
                  >
                    AFAFASFASFASFASFASFF
                  </Text>
                  <Text style={{ marginTop: 2 }}>AFAFASFASFASFASFASFF</Text>
                  <Text style={{ marginTop: 2 }}>AFAFASFASFASFASFASFF</Text>
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
