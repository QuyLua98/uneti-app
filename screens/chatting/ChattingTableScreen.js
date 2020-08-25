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
import {setUpChatBox, setUpConversations} from "../../store/chat/action";
import {socketsConnect} from "../../store/socket/action";
import {connect} from 'react-redux';
import {JWT_TOKEN} from '../../constants/Constants';
import SearchBar from "./components/SearchBar";
import UserSlide from "./components/UserSlide";
import ChatItemBox from "./components/ChatItemBox";
import axios from "axios";
import {Config} from "../../config";
import {_removeAsyncStorageData} from "../../components/AsyncStorageUtils";
import {getURIAvatarFromUserId} from "./components/Utils";
import {toggle} from "../../store/user/action";
import Loader from "./components/Loader";
import {entityToMessage} from "../../components/module/chatting/ConvertMessage";
import {getUserProfile} from "../../store/auth/action";

class ChattingTableScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
        }
    }

    componentDidMount() {
        this.setState({isLoading: true})
        InteractionManager.runAfterInteractions(async () => {
            const token = this.props.auth.token;
            if (token != undefined || token !== "") {
                await this.props.getUserProfile(token);
                if (!this.props.auth.signedIn) {
                    await _removeAsyncStorageData(JWT_TOKEN);
                    this.setState({isLoading: false})
                    this.props.navigation.goBack(null);
                }
                await this.props.socketsConnect(token);
                await this.props.setUpConversations();
                this.setState({isLoading: false})
            } else {
                this.props.navigation.goBack(null);
            }
        });
    }

    checkIsExistConversationOfTwoUser = async (userId) => {
        const {conversations} = this.props.chat;
        let isExist = false;
        for (let con of conversations) {
            if (conversations.hasOwnProperty(con)) {
                isExist = con.userInCon.some(u => u.id = userId);
                if (isExist) {
                    return con.id;
                }
            }
        }

        const {token} = this.props.auth;
        const headers = {
            [JWT_TOKEN]: `Bearer ${token}`,
        };
        return await axios
            .get(`${Config.CHAT_DOMAIN}/api/conversation/check-user-exist-con?userId=${userId}`, {headers})
            .then((res) => {
                return res.data;
            })
            .catch(() => {
                Alert.alert("Lỗi", "Có lỗi xảy ra.");
                this.setState({isLoading: false});
            });
    }

    createConversation = (otherUserId) => {
        const {token} = this.props.auth;
        const headers = {
            [JWT_TOKEN]: `Bearer ${token}`,
            'Content-Type': 'application/json',
        };

        axios
            .post(`${Config.CHAT_DOMAIN}/api/conversation/private/`, `${otherUserId}`, {headers})
            .then((res) => {
                return res.data;
            })
            .catch(() => {
                Alert.alert("Lỗi", "Có lỗi xảy ra.");
                this.setState({isLoading: false});
            });
    }

    handleClickItemUserSlide = async (userId, username) => {
        const conId = await this.checkIsExistConversationOfTwoUser(userId);
        if (conId) {
            const {conversations} = this.props.chat;
            const con = conversations.find(c => (c.id === conId));
            if (conversations.length === 0 || con == null) {
                this.props.setUpChatBox(conId, [], userId, username);
                this.props.navigation.navigate("ChattingBox");
            } else {
                const messages = con.messages.map(m => entityToMessage(m)).sort((m1, m2) => m2.createdAt - m1.createdAt);
                this.props.setUpChatBox(conId, messages, userId, username);
                this.props.navigation.navigate("ChattingBox");
            }
        } else {
            await this.createConversation(userId);
            this.props.setUpChatBox(conId, [], userId, username);
            this.props.navigation.navigate("ChattingBox");
        }
    }

    handleClick = (userIdReceive, usernameReceive, conId, message) => {
        // const messages = messageEntities.map(m => entityToMessage(m)).sort((m1, m2) => m2.createdAt - m1.createdAt);
        const messages = message.sort((m1, m2) => m2.createdAt - m1.createdAt);
        this.props.setUpChatBox(conId, messages, userIdReceive, usernameReceive);
        this.props.navigation.navigate("ChattingBox");
    }

    test = () => {
        this.props.toggle([]);
    }

    render() {
        const {isLoading} = this.state;
        const {conversations} = this.props.chat;
        const uriAvatar = getURIAvatarFromUserId(this.props.auth.userId);
        return (
            <Container>
                <Loader loading={isLoading}/>
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
                            <Thumbnail small source={{uri: uriAvatar}}/>
                        </TouchableOpacity>
                    </Right>
                </Header>
                <View contentContainerStyle={{flex: 1}}>
                    <View>
                        <SearchBar/>
                    </View>
                    <View style={styles.userSlide}>
                        <UserSlide onClick={this.handleClickItemUserSlide}/>
                    </View>
                    <FlatList
                        data={conversations}
                        renderItem={(data) => {
                            return <ChatItemBox
                                type={data.item.type}
                                users={data.item.userInCon}
                                conId={data.item.id}
                                keyExtractor={data.item.id.toString()}
                                onClick={this.handleClick}
                                lastMessage={data.item.messages[0]}
                                messages={data.item.messages}
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

const mapDispatchToProps = {socketsConnect, toggle, setUpChatBox, getUserProfile, setUpConversations};
export default connect(mapStateToProps, mapDispatchToProps)(ChattingTableScreen);

const styles = StyleSheet.create({
    userSlide: {
        marginLeft: 17
    }
})
