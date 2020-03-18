import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
  SafeAreaView
} from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import ScheduleItem from "../components/ScheduleItem";

export default class ScheduleScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      schedule: [
        {
          id: 1,
          ngayBatDau: "19/2/2020",
          thu: "5",
          tuTiet: "1",
          denTiet: "3",
          maLopHocPhan: "010100107304",
          tenLopHoc: "ĐH Tin 10A1 HN",
          tenMonHoc: "Lập trình di động",
          diaDiem: "HA9.401"
        },
        {
          id: 2,
          ngayBatDau: "18/2/2020",
          thu: "2",
          tuTiet: "4",
          denTiet: "6",
          maLopHocPhan: "010100107307",
          tenLopHoc: "ĐH Tin 10A5 HN",
          tenMonHoc: "Thực tập lập trình mạng",
          diaDiem: "HA9.T6.PM1"
        },
        {
          id: 3,
          ngayBatDau: "29/8/2019",
          thu: "5",
          tuTiet: "4",
          denTiet: "6",
          maLopHocPhan: "010100107307",
          tenLopHoc: "ĐH Tin 10A1 HN",
          tenMonHoc: "Thực tập lập trình mạng",
          diaDiem: "HA9.T6.PM1"
        },
        {
          id: 4,
          ngayBatDau: "24/10/2019",
          thu: "5",
          tuTiet: "1",
          denTiet: "3",
          maLopHocPhan: "010100107307",
          tenLopHoc: "ĐH Tin 10A2 HN",
          tenMonHoc: "Lập trình di động",
          diaDiem: "HA9.402"
        },
        {
          id: 5,
          ngayBatDau: "31/10/2020",
          thu: "5",
          tuTiet: "1",
          denTiet: "3",
          maLopHocPhan: "010100107307",
          tenLopHoc: "ĐH Tin 10A8 HN",
          tenMonHoc: "Lập trình di động",
          diaDiem: "HA9.402"
        },
        {
          id: 6,
          ngayBatDau: "14/11/2019",
          thu: "2",
          tuTiet: "1",
          denTiet: "3",
          maLopHocPhan: "010100107307",
          tenLopHoc: "ĐH Tin 10A7 HN",
          tenMonHoc: "Thực tập lập trình mạng",
          diaDiem: "HA9.T6.PM1"
        }
      ]
    };
  }

  render() {
    const { schedule } = this.state;
    return (
      <ScrollView style={{flex: 1}}>
        <FlatList 
          data={schedule}
          contentContainerStyle={styles.container}
          renderItem={({ item }) =>
              <ScheduleItem schedule={item} />
           }
          keyExtractor={item => item.id}>
        </FlatList>
      </ScrollView>
    );
  }
}

ScheduleScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    borderRadius: 4,
  }
});
