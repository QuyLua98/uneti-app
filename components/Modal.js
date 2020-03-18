//import libraries
import React, { Component } from "react";
import { Dimensions, View, Share } from "react-native";
import {
  Container,
  Header,
  Content,
  Body,
  Left,
  Icon,
  Right,
  Title,
  Button
} from "native-base";
import WebViewCustom from "./WebViewCustom";
import { WebView } from "react-native-webview";

class ModalComponent extends Component {
  constructor(props) {
    super(props);
  }

  handleClose = () => {
    return this.props.onClose();
  };

  handleShare = () => {
    const { url, title } = this.props.articleData;
    let message = `${title}\n\nRead More @${url}\n\nShared via RN News App`;
    return Share.share(
      { title, message, url: message },
      { dialogTitle: `Share ${title}` }
    );
  };

  render() {
    const { articleData } = this.props.route.params;
    const { url } = articleData;
    if (url != undefined) {
      return (
        <Container
          style={{ margin: 2, marginBottom: 0, backgroundColor: "#fff" }}
        >
          <WebView
              source={{ uri: url }}
              style={{ flex: 1 }}
              onError={this.handleClose}
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
