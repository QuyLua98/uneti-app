import * as React from "react";
import { ActivityIndicator, Platform } from "react-native";
import { Config } from "../config";
import {
  Container,
  Text,
  Button,
  Icon,
  View,
  Content,
  Input,
  InputGroup,
} from "native-base";
import NewsItemScreen from "./NewsItemScreen";
import axios from "axios";

export default class SearchNewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      news: [],
    };
  }

  componentDidMount() {
    const { textSearch } = this.props.route.params;
    this.loadingSearchNews(textSearch);
  }

  loadingSearchNews = (textSearch) => {
    this.setState({ isLoading: true });
    axios
      .get(Config.API_URL + `/api/khoacntt/search?q=${textSearch}`)
      .then((res) => {
        this.setState({ news: res.data });
        this.setState({ isLoading: false });
      })
      .catch((err) => {
        alert("Không thể kết nối đến máy chủ.");
        this.setState({ news: null });
        this.setState({ isLoading: false });
      });
  };

  onClickBack = () => {
    this.props.navigation.goBack();
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
      this.loadingSearchNews(textSearch);
    }
  };

  render() {
    const { news, isLoading } = this.state;

    return (
      <Container>
        <View
          searchBar
          style={{
            flexDirection: "row",
            padding: 10,
            ...Platform.select({
              android: {
                backgroundColor: "#5262af",
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
            onPress={this.onClickBack}
          >
            <Icon name="md-arrow-back" style={{ color: "#fff" }} />
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
              onSubmitEditing={(event) => this._searchSubmit(event)}
            />
            <Icon name="ios-search" />
          </InputGroup>
        </View>
        <Content>
          {this.isLoading ? (
            this._loadingBlock(isLoading)
          ) : this.news == null || this.news.length == 0 ? (
            <View style={{ flex: 1, justifyContent: "center" }}>
              <Text style={{ textAlign: "center" }}>
                Không tìm thấy thứ bạn cần tìm.
              </Text>
            </View>
          ) : (
            <NewsItemScreen
              listArticleData={news}
              navigation={this.props.navigation}
            />
          )}
        </Content>
      </Container>
    );
  }
}
