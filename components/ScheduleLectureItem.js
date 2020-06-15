import * as React from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";

export default class ScheduleLectureItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { schedule, date, thu, buoi } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.cardHeader}>
          <Text style={styles.titleHeader}>
            Ngày {date} - {buoi} {thu}
          </Text>
        </View>
        <View style={styles.cardBody}>
          <Text style={styles.titleBody}>
            {schedule.tietHoc}
          </Text>
          <View style={styles.body}>
            <Text style={styles.content}>
              {schedule.maLHP}:{"\n"}
              {schedule.tenMonHoc}
            </Text>
            <Text style={styles.address}>Địa điểm: {schedule.phongHoc}</Text>
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
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 5,
    padding: 5,
    borderColor: '#cecece',
    borderWidth: 1,
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
