import * as React from "react";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button
} from "native-base";
import Modal from "../components/Modal";
import NewsItem from "../components/NewsItem";

export default class HotNewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onClickMenu = link => {
    this.props.navigation.navigate(link);
  };

  toggleModal = () => {
    this.setState({
      modalArticleData: {}
    });
  };

  handleModalClose = () => {
    this.setState({
      setModalVisible: false,
      modalArticleData: {}
    });
  };

  handleItemDataOnPress = articleData => {
    this.props.navigation.navigate("MyModal", { articleData: articleData });
  };

  render() {
    return (
      <Container>
        <Content>
          <List>
            <NewsItem onPress={this.handleItemDataOnPress} />
          </List>
        </Content>
      </Container>
    );
  }
}

HotNewsScreen.navigationOptions = {
  header: null
};
