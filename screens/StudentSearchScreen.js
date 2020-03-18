import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import {
  ListItem,
  Body,
  Item,
  Input,
  Icon,
  Button,
  Text,
  CheckBox
} from "native-base";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class StudentSearchScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      isRemember: false,
      searchText: "",
    }
  }
  
  clearText = () => {
    this.setState({searchText: ""})
  }

  toggleCheck = () => {
    this.setState({isRemember: !this.state.isRemember})
  }
  
  onSubmit = () => {
    if (this.state.searchText === "") {
      alert("Mã sinh viên không được bỏ trống.");
    }else{
      this.props.navigation.navigate("StudentDetail",{screen: "StudentHome", params: { id: this.state.searchText}});
    }
  }

  render() {
    return (
      <View searchBar style={styles.container}>
        <Item style={styles.searchBarStyle}>
          <Icon name="ios-search" />
          <Input placeholder="Nhập mã sinh viên cần tra cứu..." value={this.state.searchText} onChangeText={(searchText) => this.setState({searchText})} />
          <Icon onPress={this.clearText} name="close" style={{color: '#ff8e8e'}} />
        </Item>
        <View style={{ padding: 10, marginTop: 10 }}>
          <Button style={styles.btnSearch} onPress={this.onSubmit}>
            <Text style={{ color: "#fff" }}>Tra Cứu</Text>
          </Button>
        </View>
        <TouchableOpacity onPress={this.toggleCheck} activeOpacity={0.7}>
          <ListItem>
            <CheckBox checked={this.state.isRemember} />
            <Body>
              <Text>Ghi nhớ thông tin</Text>
            </Body>
          </ListItem>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center"
  },
  searchBarStyle: {
    padding: 10
  },
  btnSearch: {
    backgroundColor: "#378fd3",
    justifyContent: "center",
    borderRadius: 5
  }
});
