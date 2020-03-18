import React, { Component } from "react";
import { Image, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  View
} from "native-base";

export default class ContactScreen extends Component {
  render() {
    return (
      <Container>
        <View>
          <Image
            source={require("../assets/images/splash.png")}
            style={{
              width: 300,
              height: 400,
              marginTop: 50,
              marginLeft: 20
            }}
          />
        </View>
        <View style={{marginTop: 20}}>
          <Text style={styles.text}>
            Trường Đại học Kinh tế Kỹ thuật Công nghiệp - Phòng Đào Tạo
          </Text>
          <Text style={styles.text}>Địa chỉ: 456-Minh Khai, Hà Nội - Fax:(04)8623938</Text>
          <Text style={styles.text}>Điện thoại: (04)8621504 - Email: uneti@vnn.vn</Text>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "center"
  }

});
