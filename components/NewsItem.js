import React, {Component} from 'react';
import { ListItem, Left, Thumbnail, Body, Text } from 'native-base';

class NewsItem extends Component {

    constructor(props) {
        super(props);
    }

    readNews = () => {
      const {link, title} = this.props.articleData;
      this.props.onPress({link, title});
    }

    render() {
      const { articleData } = this.props;
        return(
            <ListItem thumbnail button onPress={this.readNews} >
              <Left>
                <Thumbnail square source={articleData.image != null ? articleData.image : require('../assets/images/icon.png')} />
              </Left>
              <Body>
                <Text numberOfLines={2}>{articleData.title}</Text>
                <Text note>{articleData.date}</Text>
              </Body>
            </ListItem>
        );
    }
}

export default NewsItem;