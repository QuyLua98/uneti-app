import React, {Component} from "react";

import {
    StyleSheet,
    FlatList,
    Alert,
    TouchableOpacity,
    InteractionManager
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
import {setUpChatBox, subscribe} from "../../store/chat/action";
import {socketsConnect} from "../../store/socket/action";
import {connect} from 'react-redux';
import {ENDPOINT_BROKER, JWT_TOKEN} from '../../constants/Constants';
import SearchBar from "./components/SearchBar";
import UserSlide from "./components/UserSlide";
import ChatItemBox from "./components/ChatItemBox";
import axios from "axios";
import {Config} from "../../config";
import {_retrieveAsyncStorageData} from "../../components/AsyncStorageUtils";
import {getURIAvatarFromUserId} from "./components/Utils";
import {fetchUsers, toggle} from "../../store/user/action";
import Loader from "./components/Loader";

class ChattingTableScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            conversation: []
        }
    }

    componentDidMount() {
        console.log("did mount")
        this.setState({isLoading: true})
        InteractionManager.runAfterInteractions(async () => {
            const token = this.props.auth.token;
            if(token !== null || token !== "") {
                this.getConversation(token);
                this.props.fetchUsers(token);
                await this.props.socketsConnect(token);
                this.props.subscribe(ENDPOINT_BROKER);
                this.setState({isLoading: false})
            } else {
                this.props.navigation.goBack(null);
            }
        });
    }

    getConversation(token) {
        const headers = {
            [JWT_TOKEN]: `Bearer ${token}`,
        };
        axios
            .get(Config.CHAT_DOMAIN + `/api/user/conversation`, { headers })
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

    checkIsExistConversationOfTwoUser = async (userId) => {
        const {conversation} = this.state;
        let isExist = false;
        for(let con in conversation) {
            if (conversation.hasOwnProperty(con)) {
                isExist = con.userInCon.some(u => u.id = userId);
                if(isExist) {
                    return con.id;
                }
            }
        }

        const {token} = this.props.auth;
        const headers = {
            [JWT_TOKEN]: `Bearer ${token}`,
        };
        return await axios
            .get(`${Config.CHAT_DOMAIN}/api/conversation/check-user-exist-con?userId=${userId}`, { headers })
            .then((res) => {
                return res.data;
            })
            .catch(() => {
                Alert.alert("Lỗi", "Có lỗi xảy ra.");
                this.setState({ isLoading: false });
            });
    }

    createConversation = (otherUserId) => {
        const {token} = this.props.auth;
        const headers = {
            [JWT_TOKEN]: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        axios
            .post(`${Config.CHAT_DOMAIN}/api/conversation/private/`, `${otherUserId}`,{ headers })
            .then((res) => {
                return res.data;
            })
            .catch(() => {
                Alert.alert("Lỗi", "Có lỗi xảy ra.");
                this.setState({ isLoading: false });
            });
    }

    handleClickItemUserSlide = async (userId, username) => {
        const conId = await this.checkIsExistConversationOfTwoUser(userId);
        console.log("conId" + conId)
        if(conId) {
            const {conversation} = this.state;
            if(conversation.length === 0) {
                this.props.setUpChatBox(conId, [], userId, username);
                this.props.navigation.navigate("ChattingBox");
            }else {
                const messages = conversation.filter(c => c.id = conId);
                this.props.setUpChatBox(conId, messages, userId, username);
                this.props.navigation.navigate("ChattingBox");
            }
        }else {
            await this.createConversation(userId);
            this.props.setUpChatBox(conId, [], userId, username);
            this.props.navigation.navigate("ChattingBox");
        }
    }

    handleClick = (userIdReceive, usernameReceive, conId, messages) => {
        this.props.setUpChatBox(conId, messages, userIdReceive, usernameReceive);
        this.props.navigation.navigate("ChattingBox");
    }

    test = () => {
        this.props.toggle([]);
    }

    render() {
        const {conversation, isLoading} = this.state;
        const uriAvatar = getURIAvatarFromUserId(this.props.auth.userId);
        return (
            <Container>
                <Loader loading={isLoading} />
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
                        <TouchableOpacity opacity={0.8} onPress={this.test}>
                            <Thumbnail small source={{uri: uriAvatar}} />
                        </TouchableOpacity>
                    </Right>
                </Header>
                <View contentContainerStyle={{flex: 1}}>
                    <View>
                        <SearchBar/>
                    </View>
                    <View style={styles.userSlide}>
                        <UserSlide onClick={this.handleClickItemUserSlide} />
                    </View>
                    <FlatList
                        data={conversation}
                        renderItem={(data) => {
                            return <ChatItemBox
                                user={data.item.userInCon[0]}
                                keyExtractor={data.item.code}
                                onClick={() => this.handleClick(data.item.userInCon[0].id, data.item.userInCon[0].username, data.item.id, data.item.messages)}
                                lastMessage={data.item.messages[0]}
                            />
                        }}
                    />
                </View>
            </Container>
        );
    };
}

const mapStateToProps = state => ({
    chat: state.chat,
    auth: state.auth
});

const mapDispatchToProps = {subscribe, socketsConnect, fetchUsers, toggle, setUpChatBox};
export default connect(mapStateToProps, mapDispatchToProps)(ChattingTableScreen);

const styles = StyleSheet.create({
    userSlide: {
        marginLeft: 17
    }
})
