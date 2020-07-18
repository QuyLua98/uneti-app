import React, {Component} from "react";

import {
    StyleSheet,
    FlatList,
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
} from 'native-base';
import {DrawerActions} from "@react-navigation/native";
import {socketsConnect, socketsSubscribe} from "../../store/chat/action";
import {connect} from 'react-redux';
import {ENDPOINT_BROKER} from '../../constants/Constants';
import SearchBar from "./components/SearchBar";
import UserSlide from "./components/UserSlide";
import ChatItemBox from "./components/ChatItemBox";

class ChattingTableScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isRemember: false,
            isLoading: false,
            isLoadingToken: false,
        }
    }

    componentDidMount() {
        this.props.socketsConnect();
        // this.props.socketsSubscribe(ENDPOINT_BROKER);
    }

    handleClick = () => {
        // this.props.navigation.navigate('ChattingBox');
        this.props.socketsConnect();
    }

    render() {
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
                <View contentContainerStyle={{flex: 1}}>
                    <View>
                        <SearchBar/>
                    </View>
                    <View style={styles.userSlide}>
                        <UserSlide />
                    </View>
                    <FlatList
                        data={[",", ",", ""]}
                        renderItem={() => {
                            return <ChatItemBox/>
                        }}
                    />
                </View>
            </Container>
        );
    };
}

const mapStateToProps = state => ({
    chatting: state.chatting
});
const mapDispatchToProps = {socketsSubscribe, socketsConnect};
export default connect(mapStateToProps, mapDispatchToProps)(ChattingTableScreen);

const styles = StyleSheet.create({
    userSlide: {
        marginLeft: 17
    }
})
