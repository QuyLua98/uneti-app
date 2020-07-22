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
    Thumbnail
} from 'native-base';
import LineChat from "./components/LineChat";
import {DrawerActions} from "@react-navigation/native";
import {GiftedChat} from 'react-native-gifted-chat';
import {socketsMessageSend} from "../../store/chat/action";
import {ENDPOINT_SEND_MESSAGE} from "../../constants/Constants";
import MessageStatus from "./components/MessageStatus";
import MessageType from "./components/MessageType";

class ChattingBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
        }


    }

    componentDidMount() {
        const {userId} = this.props.route.params;
        this.setState({userId: userId});
    }

    onSend = (messages) => {
        const messageEntity = {
            status: MessageStatus.SENT,
            type: MessageType.TEXT,
            content: messages[0].text,
            sender: "",
            sendToUser: messages[0].user._id,
            createdDate: messages[0].createdAt
        }
        this.props.socketsMessageSend(messageEntity, ENDPOINT_SEND_MESSAGE, null);
    }

    render() {
        const {userId} = this.state;
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
                    <Right/>
                </Header>
                <GiftedChat
                    messages={this.props.chatting.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: userId,
                    }}
                />
                {/*{*/}
                {/*    Platform.OS === 'android' && <KeyboardAvoidingView behavior="padding" />*/}
                {/*}*/}
            </Container>
        );
    };
};

const mapStateToProps = state => ({
    chatting: state.chatting
});
const mapDispatchToProps = {socketsMessageSend};
export default connect(mapStateToProps, mapDispatchToProps)(ChattingBox);

const styles = StyleSheet.create({})