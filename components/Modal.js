//import libraries
import React, { Component } from "react";
import { Dimensions, View, Share } from "react-native";
import {
  Container,
  Header,
  Body,
  Left,
  Icon,
  Right,
  Title,
  Button,
} from "native-base";
import WebViewCustom from "./WebViewCustom";
import { WebView } from "react-native-webview";

class ModalComponent extends Component {
  constructor(props) {
    super(props);
  }

  onPressClose = () => {
    return this.props.navigation.goBack();
  };

  handleShare = () => {
    const { link, title } = this.props.articleData;
    let message = `${title}\n\nRead More @${link}\n\nShared via Uneti App`;
    return Share.share(
      { title, message, link: message },
      { dialogTitle: `Share ${title}` }
    );
  };

  render() {
    const { articleData } = this.props.route.params;
    const { link } = articleData;
    if (link != undefined) {
      return (
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={this.onPressClose}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
            <Body>
              <Title>{articleData.title}</Title>
            </Body>
            <Right></Right>
          </Header>
          <WebView
            source={{ uri: link }}
            style={{ flex: 1 }}
            onError={this.onPressClose}
            startInLoadingState
            scalesPageToFit
          />
        </Container>
      );
    } else {
      return null;
    }
  }
}

//make this component available to the app
export default ModalComponent;
