import * as React from "react";
import { StyleSheet, ActivityIndicator, Platform, StatusBar } from "react-native";
import { Config } from "../config";
import {
  Container,
  Tab,
  Tabs,
  Text,
  Button,
  Icon,
  ScrollableTab,
  View,
  Content,
  ListItem,
  Input,
  InputGroup,
} from "native-base";
import NewsItemScreen from "./NewsItemScreen";
import axios from "axios";

export default class NewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHotNewsLoading: false,
      isEventNewsLoading: false,
      hotNews: [],
      eventNews: [],
      category: [
        "news",
        "Tin tức - sự kiện",
        "Sinh viên",
        "Nghiên cứu",
        "Hoạt động",
      ],
      searchText: ""
    };
  }

  componentDidMount() {
    this.loadHotNews();
    this.loadEventNews();
  }

  loadHotNews = () => {
    this.setState({ isHotNewsLoading: true });
    axios
      .get(Config.API_URL + `/api/khoacntt/`)
      .then((res) => {
        this.setState({ hotNews: res.data });
        this.setState({ isHotNewsLoading: false });
      })
      .catch((err) => {
        alert("Không thể kết nối đến máy chủ.");
        this.setState({ isHotNewsLoading: false });
      });
  };

  loadEventNews = () => {
    this.setState({ isEventNewsLoading: true });
    axios
      .get(Config.API_URL + `/api/khoacntt/event/`)
      .then((res) => {
        this.setState({ eventNews: res.data });
        this.setState({ isEventNewsLoading: false });
      })
      .catch((err) => {
        alert("Không thể kết nối đến máy chủ.");
        this.setState({ isEventNewsLoading: false });
      });
  };

  onClickMenu = () => {
    this.props.navigation.toggleDrawer();
  };

  _loadingBlock(state) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator animating={state} size="large" color="#0000ff" />
      </View>
    );
  }

  _searchSubmit = (event) => {
    const textSearch = event.nativeEvent.text;
    if (textSearch == "") {
      alert("Mời nhập từ khoá cần tìm kiếm");
    } else {
      this.props.navigation.navigate("SearchNews", {
        textSearch: textSearch,
      });
    }
  };

  render() {
    const {
      hotNews,
      eventNews,
      isHotNewsLoading,
      isEventNewsLoading,
      category,
      searchText
    } = this.state;
    return (
      <Container style={{backgroundColor: "#5262af"}}>
        <View
          searchBar
          style={{
            flexDirection: "row",
            padding: 10,
            ...Platform.select({
              android: {
                backgroundColor: "#5262af",
                // marginTop: StatusBar.currentHeight,
              },
              ios: {
                backgroundColor: "#3f9afc",
              },
            }),
          }}
        >
          <Button
            transparent
            iconLeft
            style={{ height: 30, marginRight: 15 }}
            onPress={this.onClickMenu}
          >
            <Icon name="menu" style={{ color: "#fff" }} />
          </Button>

          <InputGroup
            rounded
            style={{
              flex: 1,
              backgroundColor: "#fff",
              height: 30,
              paddingLeft: 10,
              paddingRight: 10,
            }}
          >
            <Input
              style={{ height: 20 }}
              placeholder="Tìm kiếm"
              value={searchText}
              onChangeText={(searchText) => this.setState({ searchText })}
              onSubmitEditing={(event) => this._searchSubmit(event)}
            />
            <Icon name="ios-search" />
          </InputGroup>
        </View>
        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab heading={"Tin nổi bật"}>
            {isHotNewsLoading ? (
              this._loadingBlock(isHotNewsLoading)
            ) : (
              <Container>
                <Content>
                  <NewsItemScreen
                    listArticleData={hotNews[category[0]]}
                    navigation={this.props.navigation}
                  />
                  <ListItem itemDivider>
                    <Text>{category[1]}</Text>
                  </ListItem>
                  <NewsItemScreen
                    listArticleData={hotNews[category[1]]}
                    navigation={this.props.navigation}
                  />
                  <ListItem itemDivider>
                    <Text>{category[2]}</Text>
                  </ListItem>
                  <NewsItemScreen
                    listArticleData={hotNews[category[2]]}
                    navigation={this.props.navigation}
                  />
                  <ListItem itemDivider>
                    <Text>{category[3]}</Text>
                  </ListItem>
                  <NewsItemScreen
                    listArticleData={hotNews[category[3]]}
                    navigation={this.props.navigation}
                  />
                  <ListItem itemDivider>
                    <Text>{category[4]}</Text>
                  </ListItem>

                  <NewsItemScreen
                    listArticleData={hotNews[category[4]]}
                    navigation={this.props.navigation}
                  />
                </Content>
              </Container>
            )}
          </Tab>
          <Tab heading={"Tin tức - sự kiện"}>
            {isEventNewsLoading ? (
              this._loadingBlock(isEventNewsLoading)
            ) : (
              <Container>
                <Content>
                  <NewsItemScreen
                    listArticleData={eventNews}
                    navigation={this.props.navigation}
                  />
                </Content>
              </Container>
            )}
          </Tab>
        </Tabs>
      </Container>
    );
  }
}
