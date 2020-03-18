import React, {Component} from 'react';
import { ListItem, Left, Thumbnail, Body, Text } from 'native-base';

class NewsItem extends Component {

    constructor(props) {
        super(props);
        // this.data = props.data;
        this.data = {
            url: "https://khoacntt.uneti.edu.vn/chi-bo-khoa-cntt-to-chuc-dai-hoi-nhiem-ky-2020-2022--109",
            title: "asd"
        }
    }

    readNews = () => {
      const {url, title} = this.data;
      this.props.onPress({url, title});
    }

    render() {
        return(
            <ListItem thumbnail button onPress={this.readNews} >
              <Left>
                <Thumbnail square source={require('../assets/images/icon.png')} />
              </Left>
              <Body>
                <Text numberOfLines={2}>Chi bộ Khoa CNTT tổ chức Đại hội nhiệm kỳ 2020-2022</Text>
                <Text note>20-12-2020</Text>
              </Body>
            </ListItem>
        );
    }
}

export default NewsItem;