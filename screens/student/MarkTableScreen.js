import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  List,
  ListItem,
  Content,
  Form,
  Item,
  Picker,
  Icon,
  Text,
  View,
  Header,
  Left,
  Button,
  Body,
  Title
} from "native-base";

export default class MarkTableScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mark: [],
      currentMark: [],
      selected: "",
    };
  }

  onChange(value) {
    this.setState({ currentMark: this.state.mark[value] });
    this.setState({ selected: value });
  }

  onPressBack = () => {
    this.props.navigation.goBack();
  }

  componentDidMount() {
    const { data } = this.props.route.params;
    let mark = this.groupBy(data, "hocKi");
    this.setState({ mark: mark });
  }

  groupBy(collection, property) {
    let i = 0,
        val,
        index,
        values = [],
        result = [];
    for (; i < collection.length; i++) {
      val = collection[i][property];
      index = values.indexOf(val);
      if (index > -1) result[index].push(collection[i]);
      else {
        values.push(val);
        result.push([collection[i]]);
      }
    }
    return result;
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.onPressBack}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Kết quả học tập</Title>
          </Body>
        </Header>
        <Content>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Chọn kì học"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected}
                onValueChange={this.onChange.bind(this)}
              >
                {this.state.mark.map((item, index) => (
                  <Picker.Item
                    label={item[0].hocKi}
                    value={index}
                    keyExtractor={item => item.id.toString()}
                  />
                ))}
              </Picker>
            </Item>
          </Form>
          <List>
            {this.state.currentMark.map(m => (
              <>
                <ListItem style={{ flex: 1, flexDirection: "column" }}>
                  <View style={styles.header}>
                    <Text style={{ flex: 1, fontSize: 10 }}>Mã LHP</Text>
                    <Text style={{ flex: 2, fontSize: 10 }}>Tên môn</Text>
                  </View>
                  <View style={styles.header}>
                    <Text style={{ flex: 1, fontSize: 12, fontWeight: "700" }}>
                      {m.maLHP}
                    </Text>
                    <Text style={{ flex: 2, fontSize: 12, fontWeight: "700" }}>
                    {m.tenMonHoc}
                    </Text>
                    <Text style={styles.note}>{m.ghiChu}</Text>
                  </View>
                </ListItem>
                <ListItem
                  itemDivider
                  style={{ flex: 1, flexDirection: "column" }}
                >
                  <View style={styles.body}>
                    <Text style={styles.bodyRowText}>Điểm chuyên cần</Text>
                    <Text style={styles.bodyRowText}>TB Thường kì</Text>
                    <Text style={styles.bodyRowText}>Kết thúc</Text>
                    <Text style={styles.bodyRowText}>TB môn</Text>
                    <Text style={styles.bodyRowText}>Xếp loại</Text>
                  </View>
                  <View style={styles.data}>
                    <Text style={styles.dataRowText}>{m.diemChuyenCan}</Text>
                    <Text style={styles.dataRowText}>{m.tbthuongKi}</Text>
                    <Text style={styles.dataRowText}>{m.ketThuc}</Text>
                    <Text style={styles.dataRowText}>{m.trungBinhMon}</Text>
                    <Text style={styles.dataRowText}>{m.xepLoai}</Text>
                  </View>
                </ListItem>
              </>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row"
  },
  body: {
    flexDirection: "row"
  },
  data: {
    borderColor: "#d3d3d3",
    borderWidth: 1,
    flexDirection: "row"
  },
  bodyRowText: {
    flex: 1,
    fontSize: 10,
    textAlign: "center"
  },
  note: {
    fontSize: 10,
    color: "#ff5454",
    justifyContent: "flex-end"
  },
  dataRowText: {
    flex: 1,
    fontSize: 10,
    fontWeight: "700",
    textAlign: "center"
  }
});
