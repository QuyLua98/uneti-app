import * as React from "react";
import {
  Container,
  Content,
  List,
} from "native-base";
import NewsItem from "../components/NewsItem";

export default class HotNewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

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
    const { listArticleData } = this.props;
    return (
      <Container>
        <Content>
          <List>
            {listArticleData.map(item => {
              return <NewsItem articleData={item} onPress={this.handleItemDataOnPress} />
            })}
          </List>
        </Content>
      </Container>
    );
  }
}

HotNewsScreen.navigationOptions = {
  header: null
};
