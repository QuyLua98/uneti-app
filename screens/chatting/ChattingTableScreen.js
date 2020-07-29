import React, {Component} from "react";

import {
    StyleSheet,
    FlatList,
    Alert
} from "react-native";
import {
    Container,
    View,
    Body,
    Button,
    Header,
    Icon,
    Left,
    Right,
    Title,
    Thumbnail
} from 'native-base';
import {DrawerActions} from "@react-navigation/native";
import {socketsConnect, socketsSubscribe} from "../../store/chat/action";
import {connect} from 'react-redux';
import {CODE_SEARCH, ENDPOINT_BROKER, JWT_TOKEN} from '../../constants/Constants';
import SearchBar from "./components/SearchBar";
import UserSlide from "./components/UserSlide";
import ChatItemBox from "./components/ChatItemBox";
import axios from "axios";
import {Config} from "../../config";
import {_retrieveAsyncStorageData} from "../../components/AsyncStorageUtils";
import {getURIAvatarFromUserId} from "./components/Utils";
import {fetchUsers} from "../../store/user/action";

class ChattingTableScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conversation: []
        }
    }

    async componentDidMount() {
        const token = this.props.auth.token;
        this.getConversation(token);
        this.props.fetchUsers(token);
        await this.props.socketsConnect(token);
        this.props.socketsSubscribe(ENDPOINT_BROKER);

    }

    getConversation(token) {
        const headers = {
            [JWT_TOKEN]: `Bearer ${token}`,
        };
        axios
            .get(Config.API_URL + `/api/user/conversation`, { headers })
            .then((res) => {
                this.setState({ conversation: res.data });
                this.setState({ isLoading: false });
            })
            .catch((err) => {
                console.log("Fail to get conversation: " + err)
                Alert.alert("Lỗi", "Tải thông tin thất bại!Xin thử lại!");
                this.setState({ isLoading: false });
            });
    }

    handleClick = (user, messageCache) => {
        this.props.navigation.navigate("ChattingBox", {
            user: user,
            messageCache: messageCache,
        });
    }

    render() {
        const {conversation} = this.state;
        const uriAvatar = getURIAvatarFromUserId(this.props.auth.userId);
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => {
                                this.props.navigation.dispatch(DrawerActions.toggleDrawer());
                            }}
                        >
                            <Icon name="menu"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Chat</Title>
                    </Body>
                    <Right>
                        <Thumbnail small source={{uri: uriAvatar}} />
                    </Right>
                </Header>
                <View contentContainerStyle={{flex: 1}}>
                    <View>
                        <SearchBar/>
                    </View>
                    <View style={styles.userSlide}>
                        <UserSlide onClick={this.handleClick} />
                    </View>
                    <FlatList
                        data={conversation}
                        renderItem={(data) => {
                            return <ChatItemBox
                                user={data.item.userInCon[0]}
                                keyExtractor={data.item.code}
                                onClick={this.handleClick}
                                lastMessage={data.item.messageCache[0]}
                                messageCache={data.item.messageCache}
                            />
                        }}
                    />
                </View>
            </Container>
        );
    };
}

const mapStateToProps = state => ({
    chatting: state.chatting,
    auth: state.auth
});
const mapDispatchToProps = {socketsSubscribe, socketsConnect, fetchUsers};
export default connect(mapStateToProps, mapDispatchToProps)(ChattingTableScreen);

const styles = StyleSheet.create({
    userSlide: {
        marginLeft: 17
    }
})
