import React, {Component} from "react";

import {
    Text,
    TouchableOpacity,
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
import {DrawerActions} from "@react-navigation/native";
import {socketsConnect, socketsSubscribe} from "../../store/chat/action";
import {connect} from 'react-redux';
import {ENDPOINT_BROKER} from '../../constants/Constants';

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
                <Content>
                    <List>
                        <ListItem avatar button={true}
                                  onPress={() => {
                                      this.handleClick()
                                  }}>
                            <Left>
                                <Thumbnail source={require('../../assets/images/chatting/avatar/account-female.png')}/>
                            </Left>
                            <Body>
                                <Text>Kumar</Text>
                                <Text note>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note>3:43 pm</Text>
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    };
}

const mapStateToProps = state => ({
    chatting: state.chatting
});
const mapDispatchToProps = { socketsSubscribe, socketsConnect };
export default connect(mapStateToProps, mapDispatchToProps)(ChattingTableScreen);
