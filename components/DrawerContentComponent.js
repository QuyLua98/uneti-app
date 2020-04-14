import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Button,
  TouchableOpacity
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
import TabBarIcon from "./TabBarIcon";
import { ScrollView } from "react-native-gesture-handler";

const DrawerContentComponent = ({ navigation }) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.image}>
          <Image
            style={{ width: 200, height: 200 }}
            source={require("../assets/images/icon.png")}
          />
        </View>
        <View style={styles.wrapper}>
          <View style={styles.itemRow}>
            <TabBarIcon name="md-home" />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Home");
              }}
            >
              <Text style={styles.item}>Trang chủ</Text>
            </TouchableOpacity>
          </View>
          {/* <View style={styles.itemRow}>
            <TabBarIcon name="md-paper" />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ScheduleTest");
              }}
            >
              <Text style={styles.item}>Tin tuyển sinh</Text>
            </TouchableOpacity>
          </View> */}
          <View style={styles.itemRow}>
            <TabBarIcon name="md-search" />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Student");
              }}
            >
              <Text style={styles.item}>Thông tin sinh viên</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.itemRow}>
            <TabBarIcon name="md-pin" />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Map");
              }}
            >
              <Text style={styles.item}>Vị trí</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.itemRow}>
            <TabBarIcon name="md-send" />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Contact");
              }}
            >
              <Text style={styles.item}>Liên hệ</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  image: {
    marginTop: 10,
    backgroundColor: "#C3BFC3"
  },
  wrapper: {
    marginTop: 20
  },
  item: {
    fontSize: 20,
    marginLeft: 20
  },
  itemRow: {
    flexDirection: "row",
    padding: 15
  }
});

export default DrawerContentComponent;
