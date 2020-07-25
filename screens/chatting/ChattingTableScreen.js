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

class ChattingTableScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conversation: []
        }
    }

    async componentDidMount() {
        this.getConversation().then(() => console.log("Get list conversation"));
        const token = await _retrieveAsyncStorageData(JWT_TOKEN);
        await this.props.socketsConnect(token);
        this.props.socketsSubscribe(ENDPOINT_BROKER);

    }

    async getConversation() {
        const token = await _retrieveAsyncStorageData(JWT_TOKEN);
        const headers = {
            [JWT_TOKEN]: token,
        };
        axios
            .get(Config.API_URL + `/api/message/conversation/`, { headers })
            .then((res) => {
                this.setState({ conversation: res.data });
                this.setState({ isLoading: false });
            })
            .catch((err) => {
                console.log(err)
                Alert.alert("Lỗi", "Tải thông tin thất bại!Xin thử lại!");
                this.setState({ isLoading: false });
            });
    }

    handleClick = (userId) => {
        this.props.navigation.navigate("ChattingBox", {
            userId: userId,
        });
    }

    render() {
        const {conversation} = this.state;
        const {auth} = this.props;
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
                        {/*<Thumbnail small source={{uri: auth.avatar}} />*/}
                        <Thumbnail small source={require("../../assets/images/chatting/avatar/avatar-quy.jpg")} />
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
                        renderItem={(item) => {
                            return <ChatItemBox userId={item.id} keyExtractor={item.code} onClick={this.handleClick}/>
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
const mapDispatchToProps = {socketsSubscribe, socketsConnect};
export default connect(mapStateToProps, mapDispatchToProps)(ChattingTableScreen);

const styles = StyleSheet.create({
    userSlide: {
        marginLeft: 17
    }
})
