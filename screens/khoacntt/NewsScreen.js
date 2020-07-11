import * as React from "react";
import {ActivityIndicator, Alert} from "react-native";
import {Config} from "../../config";
import {
    Container,
    Tab,
    Tabs,
    Text,
    Button,
    Icon,
    ScrollableTab,
    View,
    Content,
    ListItem,
    Input,
    InputGroup,
    Header,
    Item,
    Left
} from "native-base";
import NewsItemScreen from "./NewsItemScreen";
import axios from "axios";

export default class NewsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHotNewsLoading: false,
            isEventNewsLoading: false,
            hotNews: [],
            eventNews: [],
            category: [
                "news",
                "Tin tức - sự kiện",
                "Sinh viên",
                "Nghiên cứu",
                "Hoạt động",
            ],
            searchText: ""
        };
    }

    componentDidMount() {
        this.loadHotNews();
        this.loadEventNews();
    }

    loadHotNews = () => {
        this.setState({isHotNewsLoading: true});
        axios
            .get(Config.API_URL + `/api/khoacntt/`)
            .then((res) => {
                this.setState({hotNews: res.data});
                this.setState({isHotNewsLoading: false});
            })
            .catch((err) => {
                Alert.alert("Lỗi", "Không thể kết nối đến máy chủ.");
                this.setState({isHotNewsLoading: false});
            });
    };

    loadEventNews = () => {
        this.setState({isEventNewsLoading: true});
        axios
            .get(Config.API_URL + `/api/khoacntt/event/`)
            .then((res) => {
                this.setState({eventNews: res.data});
                this.setState({isEventNewsLoading: false});
            })
            .catch((err) => {
                Alert.alert("Lỗi", "Không thể kết nối đến máy chủ.");
                this.setState({isEventNewsLoading: false});
            });
    };

    onClickMenu = () => {
        this.props.navigation.toggleDrawer();
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
            this.props.navigation.navigate("SearchNews", {
                textSearch: textSearch,
            });
        }
    };

    render() {
        const {
            hotNews,
            eventNews,
            isHotNewsLoading,
            isEventNewsLoading,
            category,
            searchText
        } = this.state;
        return (
            <Container style={{backgroundColor: "#5262af"}}>
                <Header searchBar rounded>
                    <Left style={{flex: null}}>
                        <Button onPress={this.onClickMenu}>
                            <Icon name="menu" style={{color: "#fff"}}/>
                        </Button>
                    </Left>
                    <Item style={{borderRadius: 25}}>
                        <Input placeholder="Tìm kiếm"
                               style={{
                                   paddingLeft: 10,
                                   paddingRight: 10,
                               }}
                               value={searchText}
                               onChangeText={(searchText) => this.setState({searchText})}
                               onSubmitEditing={(event) => this._searchSubmit(event)}
                        />
                        <Icon name="ios-search"/>
                    </Item>
                    <Button transparent>
                        <Text>Search</Text>
                    </Button>
                </Header>
                <Tabs renderTabBar={() => <ScrollableTab/>}>
                    <Tab heading={"Tin nổi bật"}>
                        {isHotNewsLoading ? (
                            this._loadingBlock(isHotNewsLoading)
                        ) : (
                            <Container>
                                <Content>
                                    <NewsItemScreen
                                        listArticleData={hotNews[category[0]]}
                                        navigation={this.props.navigation}
                                    />
                                    <ListItem itemDivider>
                                        <Text>{category[1]}</Text>
                                    </ListItem>
                                    <NewsItemScreen
                                        listArticleData={hotNews[category[1]]}
                                        navigation={this.props.navigation}
                                    />
                                    <ListItem itemDivider>
                                        <Text>{category[2]}</Text>
                                    </ListItem>
                                    <NewsItemScreen
                                        listArticleData={hotNews[category[2]]}
                                        navigation={this.props.navigation}
                                    />
                                    <ListItem itemDivider>
                                        <Text>{category[3]}</Text>
                                    </ListItem>
                                    <NewsItemScreen
                                        listArticleData={hotNews[category[3]]}
                                        navigation={this.props.navigation}
                                    />
                                    <ListItem itemDivider>
                                        <Text>{category[4]}</Text>
                                    </ListItem>

                                    <NewsItemScreen
                                        listArticleData={hotNews[category[4]]}
                                        navigation={this.props.navigation}
                                    />
                                </Content>
                            </Container>
                        )}
                    </Tab>
                    <Tab heading={"Tin tức - sự kiện"}>
                        {isEventNewsLoading ? (
                            this._loadingBlock(isEventNewsLoading)
                        ) : (
                            <Container>
                                <Content>
                                    <NewsItemScreen
                                        listArticleData={eventNews}
                                        navigation={this.props.navigation}
                                    />
                                </Content>
                            </Container>
                        )}
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}
