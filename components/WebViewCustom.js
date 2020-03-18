import * as React from "react";
import { WebView } from "react-native-webview";

export default class WebViewCustom extends React.Component {
  render() {
    return <WebView source={this.props.url} />;
  }
}
