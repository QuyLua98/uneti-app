import React, {Component} from "react";
import {FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert} from "react-native";
import {View, Text} from "native-base";
import Colors from "../../../constants/Colors";
import AvatarIcon from "./AvatarIcon";
import {_retrieveAsyncStorageData} from "../../../components/AsyncStorageUtils";
import {JWT_TOKEN} from "../../../constants/Constants";
import axios from "axios";
import {Config} from "../../../config";

export default class UserSlide extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoading: false
        }
    }

    componentDidMount() {
        this.getActiveUser().then(() => console.log("Get active user"))
    }

    async getActiveUser() {
        this.setState({isLoading: true});
        const token = await _retrieveAsyncStorageData(JWT_TOKEN);
        const headers = {
            [JWT_TOKEN]: `Bearer ${token}`,
        };
        axios
            .get(Config.API_URL + `/api/user/active`, {headers})
            .then((res) => {
                this.setState({users: res.data});
                this.setState({isLoading: false});
            })
            .catch((err) => {
                console.log(err)
                Alert.alert("Lỗi", "Tải thông tin thất bại!Xin thử lại!");
                this.setState({isLoading: false});
            });
    }

    render() {
        const props = this.props;
        const {users, isLoading} = this.state;
        console.log(users)
        if (isLoading) {
            return (
                <View style={styles.emptyContainer}>
                    <ActivityIndicator animating={true} size="small" color="#0000ff" />
                </View>
            )
        }
        return (
            <View>
                {users.length !== 0 ? <FlatList
                        data={users}
                        horizontal={true}
                        renderItem={data => {
                            return (
                                <TouchableOpacity onPress={() => props.onClick(data.item.username)}
                                                  keyExtractor={data.item.id}>
                                    <AvatarIcon userId={data.item.id} isActive={true}/>
                                </TouchableOpacity>
                            )
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