import React, {Component} from "react";

import {connect} from 'react-redux';

import {
    SafeAreaView,
    StyleSheet,
    FlatList,
    KeyboardAvoidingView
} from "react-native";
import {
    Container,
    Body,
    Content,
    Button,
    Header,
    Icon,
    Left,
    Right,
    List,
    Title,
    ListItem,
    Thumbnail,
    Text
} from 'native-base';
import {GiftedChat, Actions, Send} from 'react-native-gifted-chat';
import {socketsMessageSend} from "../../store/chat/action";
import {ENDPOINT_SEND_MESSAGE} from "../../constants/Constants";
import Colors from "../../constants/Colors";
import {entityToMessage, messageToEntity} from "../../components/module/chatting/ConvertMessage";
import {getURIAvatarFromUserId} from "./components/Utils";

class ChattingBoxScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            messages: [],
            conId: null,
            userIdReceive: null,
            usernameReceive: null,
        }
    }

    componentDidMount() {
        const {userIdReceive, usernameReceive, messageCache, conId} = this.props.route.params;
        if (messageCache !== undefined) {
            const messages = messageCache.map(m => entityToMessage(m));
            this.setState({messages: messages});
        }
        this.setState({
            userIdReceive: userIdReceive,
            usernameReceive: usernameReceive,
            conId: conId
        });
    }

    onSend = (messages) => {
        const {userIdReceive, usernameReceive, conId} = this.state;
        const newMessage = [...messages, ...this.state.messages];
        this.setState({messages: newMessage});
        const messageEntity = messageToEntity(messages[0], userIdReceive, usernameReceive, conId);
        this.props.socketsMessageSend(messageEntity, ENDPOINT_SEND_MESSAGE);
    }

    render() {
        const {messages} = this.state;
        const {navigation} = this.props;
        const {userId} = this.props.auth;
        console.log(userId)
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => {
                                navigation.goBack();
                            }}
                        >
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Nguyễn Duy Quý</Title>
                    </Body>
                    <Right>
                        <Icon name="alert" style={{color: Colors.white}}/>
                    </Right>
                </Header>
                <GiftedChat
                    placeholder={"Aa"}
                    alwaysShowSend={true}
                    isAnimated
                    messages={messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: userId,
                        avatar: getURIAvatarFromUserId(userId)
                    }}
                    // renderActions={() => (
                    //     <Text>asdasd</Text>
                    // )}
                    renderSend={(props) => {
                        return <Send
                            {...props}
                            containerStyle={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                marginRight: 15,
                                marginLeft: 15,
                            }}
                        >
                            <Icon name="send" style={{color: Colors.tintColor}}/>
                        </Send>
                    }}
                />
                <KeyboardAvoidingView/>
            </Container>
        );
    };
};

const mapStateToProps = state => ({
    chatting: state.chatting,
    auth: state.auth
});
const mapDispatchToProps = {socketsMessageSend};
export default connect(mapStateToProps, mapDispatchToProps)(ChattingBoxScreen);

const styles = StyleSheet.create({})
