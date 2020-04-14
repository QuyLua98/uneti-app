import * as React from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import { Config } from "../config";
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Text,
  Button,
  Left,
  Icon,
  Right,
  ScrollableTab,
  View,
} from "native-base";
import HotNewsScreen from "./HotNewsScreen";
import axios from "axios";

export default class NewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHotNewsLoading: false,
      isMainNewsLoading: false,
      hotNews: [],
      mainNews: [],
    };
  }

  componentDidMount() {
    this.loadHotNews();
    this.loadMainNews();
  }

  loadHotNews = () => {
    this.setState({ isHotNewsLoading: true });
    axios
      .get(Config.API_URL + `/api/news/`)
      .then((res) => {
        this.setState({ hotNews: res.data });
        this.setState({ isHotNewsLoading: false });
      })
      .catch((err) => {
        alert("Không thể kết nối đến máy chủ.");
        this.setState({ isHotNewsLoading: false });
      });
  };

  loadMainNews = () => {
    this.setState({ isMainNewsLoading: true });
    axios
      .get(Config.API_URL + `/api/news/main/`)
      .then((res) => {
        this.setState({ mainNews: res.data });
        this.setState({ isMainNewsLoading: false });
      })
      .catch((err) => {
        alert("Không thể kết nối đến máy chủ.");
        this.setState({ isMainNewsLoading: false });
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

  render() {
    const {
      hotNews,
      mainNews,
      isHotNewsLoading,
      isMainNewsLoading,
    } = this.state;
    return (
      <Container>
        <Header hasTabs style={styles.header}>
          <Left>
            <Button transparent onPress={this.onClickMenu}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Right></Right>
        </Header>
        <Tabs renderTabBar={() => <ScrollableTab />}>
          <Tab
            heading={
              <TabHeading>
                <Text>Tin nổi bật</Text>
              </TabHeading>
            }
          >
            {/* tab content */}
            {isHotNewsLoading ? (
              this._loadingBlock(isHotNewsLoading)
            ) : (
              <HotNewsScreen
                listArticleData={hotNews}
                onPress={this.readNews}
                navigation={this.props.navigation}
              />
            )}
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Tin tức - sự kiện</Text>
              </TabHeading>
            }
          >
            {/* tab content */}
            {isMainNewsLoading ? (
              this._loadingBlock(isMainNewsLoading)
            ) : (
              <HotNewsScreen
                listArticleData={mainNews["Tin tức - sự kiện"]}
                onPress={this.readNews}
                navigation={this.props.navigation}
              />
            )}
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Nghiên cứu</Text>
              </TabHeading>
            }
          >
            {/* tab content */}
            {isMainNewsLoading ? (
              this._loadingBlock(isMainNewsLoading)
            ) : (
              <HotNewsScreen
                listArticleData={mainNews["Nghiên cứu"]}
                onPress={this.readNews}
                navigation={this.props.navigation}
              />
            )}
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Hoạt động</Text>
              </TabHeading>
            }
          >
            {/* tab content */}
            {isMainNewsLoading ? (
              this._loadingBlock(isMainNewsLoading)
            ) : (
              <HotNewsScreen
                listArticleData={mainNews["Hoạt động"]}
                onPress={this.readNews}
                navigation={this.props.navigation}
              />
            )}
          </Tab>
          <Tab
            heading={
              <TabHeading>
                <Text>Sinh viên</Text>
              </TabHeading>
            }
          >
            {/* tab content */}
            {isMainNewsLoading ? (
              this._loadingBlock(isMainNewsLoading)
            ) : (
              <HotNewsScreen
                listArticleData={mainNews["Sinh viên"]}
                onPress={this.readNews}
                navigation={this.props.navigation}
              />
            )}
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
  },
});
