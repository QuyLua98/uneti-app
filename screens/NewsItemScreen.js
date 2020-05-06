import * as React from "react";
import { Container, Content, List } from "native-base";
import NewsItem from "../components/NewsItem";

export default class NewsItemScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleModalClose = () => {
    this.setState({
      setModalVisible: false,
      modalArticleData: {},
    });
  };

  handleItemDataOnPress = (articleData) => {
    this.props.navigation.navigate("MyModal", { articleData: articleData });
  };

  render() {
    const { listArticleData } = this.props;
    if (listArticleData == null || listArticleData == undefined) return <></>;
    return (
      <>
        {listArticleData.map((item,index) => {
          return (
            <NewsItem articleData={item} onPress={this.handleItemDataOnPress} key={index} />
          );
        })}
      </>
    );
  }
}

NewsItemScreen.navigationOptions = {
  header: null,
};
