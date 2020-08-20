import React from "react";
import {Text, View, StyleSheet, Image, TouchableOpacity, SafeAreaView, StatusBar} from "react-native";
import TabBarIcon from "./TabBarIcon";
import {ScrollView} from "react-native-gesture-handler";
import {_retrieveAsyncStorageData} from "./AsyncStorageUtils";
import {JWT_TOKEN} from "../constants/Constants";
import {isValidToken} from "../utils/TokenUtils";

const DrawerContentComponent = ({navigation, self}) => {
    return (
        <SafeAreaView>
            <ScrollView contentContainerStyle={styles.container}>
                <View>
                    <View style={styles.image}>
                        <Image
                            style={{width: 200, height: 200}}
                            source={require("../assets/images/icon.png")}
                        />
                    </View>
                    <View style={styles.wrapper}>
                        <View style={styles.itemRow}>
                            <TabBarIcon name="md-home"/>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Home");
                                }}
                            >
                                <Text style={styles.item}>Trang chủ</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemRow}>
                            <TabBarIcon name="md-paper"/>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("About");
                                }}
                            >
                                <Text style={styles.item}>Giới thiệu</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemRow}>
                            <TabBarIcon name="md-school"/>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Educate");
                                }}
                            >
                                <Text style={styles.item}>Đào tạo</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemRow}>
                            <TabBarIcon name="md-person"/>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Login");
                                }}
                            >
                                <Text style={styles.item}>Cán bộ - Giảng viên</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemRow}>
                            <TabBarIcon name="md-search"/>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Student");
                                }}
                            >
                                <Text style={styles.item}>Thông tin sinh viên</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemRow}>
                            <TabBarIcon name="md-person"/>
                            <TouchableOpacity
                                onPress={async () => {
                                    if(self.auth.signedIn) {
                                        navigation.navigate("ChattingLogin", {
                                            screen: "ChattingContent",
                                        });
                                    }else {
                                        const token = await _retrieveAsyncStorageData(JWT_TOKEN);
                                        const isValid = await isValidToken(token);
                                        if(token != null && isValid) {
                                            self.setToken(token);
                                            navigation.navigate("ChattingLogin", {
                                                screen: "ChattingContent"
                                            });
                                        }else {
                                            navigation.navigate("ChattingLogin");
                                        }
                                    }
                                }}
                            >
                                <Text style={styles.item}>Chatting</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemRow}>
                            <TabBarIcon name="md-pin"/>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Map");
                                }}
                            >
                                <Text style={styles.item}>Vị trí</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.itemRow}>
                            <TabBarIcon name="md-send"/>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Contact");
                                }}
                            >
                                <Text style={styles.item}>Liên hệ</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    image: {
        marginTop: 20,
    },
    wrapper: {
        marginTop: 20,
    },
    item: {
        fontSize: 20,
        marginLeft: 20,
    },
    itemRow: {
        flexDirection: "row",
        padding: 15,
    },
});

export default DrawerContentComponent;
