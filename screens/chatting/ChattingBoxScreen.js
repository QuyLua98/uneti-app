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
import {DrawerActions} from "@react-navigation/native";
import {GiftedChat, Actions, Send} from 'react-native-gifted-chat';
import {socketsMessageSend} from "../../store/chat/action";
import {ENDPOINT_SEND_MESSAGE} from "../../constants/Constants";
import Colors from "../../constants/Colors";

class ChattingBoxScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: null,
            messages: [],
        }
    }

    componentDidMount() {
        const {userId} = this.props.route.params;
        this.setState({userId: userId});
    }

    onSend = (messages) => {
        const newMessage = [...messages, ...this.state.messages];
        this.setState({messages: newMessage});
        this.props.socketsMessageSend(messages, ENDPOINT_SEND_MESSAGE, null);
    }

    render() {
        const {userId, messages} = this.state;
        const {navigation} = this.props;
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
    chatting: state.chatting
});
const mapDispatchToProps = {socketsMessageSend};
export default connect(mapStateToProps, mapDispatchToProps)(ChattingBoxScreen);

const styles = StyleSheet.create({})
