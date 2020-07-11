import * as React from "react";
import {ActivityIndicator, Alert} from "react-native";
import {Config} from "../../config";
import {
    Container,
    Text,
    Button,
    Icon,
    View,
    Content,
    Input,
    InputGroup, Left, Item, Header,
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
        const {textSearch} = this.props.route.params;
        this.loadingSearchNews(textSearch);
    }

    loadingSearchNews = (textSearch) => {
        this.setState({isLoading: true});
        axios
            .get(Config.API_URL + `/api/khoacntt/search?q=${textSearch}`)
            .then((res) => {
                this.setState({news: res.data});
                this.setState({isLoading: false});
            })
            .catch(() => {
                Alert.alert("Lỗi", "Không thể kết nối đến máy chủ.");
                this.setState({news: null});
                this.setState({isLoading: false});
            });
    };

    onClickBack = () => {
        this.props.navigation.goBack();
    };

    _loadingBlock(state) {
        return (
            <View style={{flex: 1, justifyContent: "center"}}>
                <ActivityIndicator animating={state} size="large" color="#0000ff"/>
            </View>
        );
    }

    _searchSubmit = (event) => {
        const textSearch = event.nativeEvent.text;
        if (textSearch === "") {
            Alert.alert("Lưu ý", "Mời nhập từ khoá cần tìm kiếm");
        } else {
            this.loadingSearchNews(textSearch);
        }
    };

    render() {
        const {news, isLoading} = this.state;
        return (
            <Container>
                <Header searchBar rounded>
                    <Left style={{flex: null}}>
                        <Button
                            transparent
                            onPress={this.onClickBack}
                        >
                            <Icon name="md-arrow-back" style={{color: "#fff"}}/>
                        </Button>
                    </Left>
                    <Item style={{borderRadius: 25}}>
                        <Input placeholder="Tìm kiếm"
                               style={{
                                   paddingLeft: 10,
                                   paddingRight: 10,
                               }}
                               // onChangeText={(searchText) => this.setState({searchText})}
                               onSubmitEditing={(event) => this._searchSubmit(event)}
                        />
                        <Icon name="ios-search"/>
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <Content>
                    {isLoading ?
                        this._loadingBlock(isLoading)
                        : news == null || news.length === 0 ? (
                            <View style={{flex: 1, justifyContent: "center"}}>
                                <Text style={{textAlign: "center"}}>
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
