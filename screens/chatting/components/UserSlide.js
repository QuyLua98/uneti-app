import React, {Component} from "react";
import {FlatList, StyleSheet, TouchableOpacity} from "react-native";
import {View, Text} from "native-base";
import Colors from "../../../constants/Colors";
import AvatarIcon from "./AvatarIcon";
import {connect} from "react-redux";

class UserSlide extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const props = this.props;
        const users = this.props.user.users;
        let currentUserId;
        if (this.props.auth) {
            currentUserId = this.props.auth.userId;
        }
        return (
            <View>
                {users === undefined || users.length !== 0 ? <FlatList
                        data={users}
                        horizontal={true}
                        renderItem={data => {
                            if (data.item.id !== currentUserId) {
                                return (
                                    <TouchableOpacity onPress={() => props.onClick(data.item.id, data.item.username)}
                                                      keyExtractor={data.item.id.toString()}>
                                        <AvatarIcon userId={data.item.id} isActive={data.item.active}/>
                                    </TouchableOpacity>
                                )
                            }
                        }}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                    /> :
                    <View style={styles.emptyContainer}>
                        <Text style={styles.text}>Hiện chưa có người hoạt động</Text>
                    </View>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    item: {
        height: 43,
        borderRadius: 13,
    },
    icon: {
        color: Colors.gray
    },
    input: {
        color: Colors.gray
    },
    emptyContainer: {
        height: 50,
        borderBottomWidth: 0.2,
        borderColor: Colors.gray,
        marginRight: 15
    },
    text: {
        textAlign: 'center',
        paddingTop: 10,
        color: Colors.gray
    }
})

const mapStateToProps = state => ({
    auth: state.auth,
    user: state.user,
});
export default connect(mapStateToProps)(UserSlide);