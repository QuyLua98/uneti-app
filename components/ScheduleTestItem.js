import * as React from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";

export default class ScheduleTestItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { schedule } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.cardHeader}>
          <Text style={styles.titleHeader}>
            {schedule.ngayThi}
          </Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.titleBody}>
            Tiết {schedule.tiet}
          </Text>
          <View style={styles.body}>
            <Text style={styles.content}>
              {schedule.maLHP}:{"\n"}
              {schedule.tenMonThi} ({schedule.hinhThuc})
            </Text>
            <Text style={styles.address}>Địa điểm: {schedule.phongThi} - {schedule.ghiChu}</Text>
            <Text style={styles.address}>Loại thi: {schedule.loaiThi} - nhóm : {schedule.nhom}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 4,
    marginTop: 10,
    
  },
  cardHeader: {
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  titleHeader: {
      color: 'red',
      padding: 5,
      fontSize: 16,
  },
  cardBody: {
    padding: 5,    
  },
  titleBody: {
    color: 'rgb(30,156,144)',
    fontSize: 18
  },
  body: {
      padding: 10,
      marginLeft: 5,
  },
  content: {
    marginBottom: 10,
    fontWeight: '700',
    fontSize: 18
  },
  address: {
    fontWeight: '100'
  }
});
