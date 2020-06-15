import React, {Component} from "react";
import axios from 'axios';
import {Config} from "../config";
import {EGOV_TOKEN} from "../constants/Constants";
import {StyleSheet, Text, View, Image, TouchableOpacity, ActivityIndicator, Modal, AsyncStorage} from "react-native";
import {
    Container,
    Content,
    Header,
    Body,
    Right,
    Left,
    Button,
    Icon, ListItem, List,
} from "native-base";

export default class EgovScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "D2A73242126C31F1B2EEC9A1AD7D15F1E572472C6932E4D088B5A5FD1E8A2435815545D4FDE89F5C7CBD1BA9468BB77E0BCAB4F43A05C2D5CC0C900AD6FDFBF44341DCC70A4B790B9\n" +
                "77732418B56772C4C532B464C739559F3F7F243782F6A66",
            lecture: {
                ten: "",
                ngaySinh: "",
                img: "",
                gioiTinh: "",
                noiSinh: "",
                donVi: "",
                loaiNhanSu: "",
                chucVu: "",
                phongBan: "",
                toBoMon: "",
            },
            luong: null,
            isModalSalaryVisible: false,
            isModalProfileVisible: false,
            isLoading: false,
        };
    }

    componentDidMount() {
        this.setState({isLoading: true});
        const {token} = this.props.route.params;
        this.setState({token: token});

        // const { token } = this.state;

        const headers = {
            [EGOV_TOKEN]: token,
        };

        axios
            .get(Config.API_URL + `/api/egov/profile`, {headers})
            .then((res) => {
                this.setState({lecture: res.data});
                this.setState({isLoading: false});
            })
            .catch(() => {
                alert("Có lỗi xảy ra!");
                this.setState({isLoading: false});
            });

        axios
            .get(Config.API_URL + `/api/egov/xem-luong`, {headers})
            .then((res) => {
                console.log(res.data);
                this.setState({luong: res.data});
                this.setState({isLoading: false});
            })
            .catch(() => {
                this.setState({isLoading: false});
            });
    }

    logout = async () => {
        try {
            await AsyncStorage.removeItem(EGOV_TOKEN);
            this.props.navigation.goBack();
        } catch (err) {
        }
    };

    toggleModalSalary = () => {
        this.setState({isModalSalaryVisible: !this.state.isModalSalaryVisible});
    };

    toggleModalProfile = () => {
        this.setState({isModalProfileVisible: !this.state.isModalProfileVisible});
    };

    onClickMenu = () => {
        this.props.navigation.toggleDrawer();
    };

    lectureSchedule = () => {
        this.props.navigation.navigate("ScheduleLectureScreen", {
            token: this.state.token,
            isExam: false,
        });
    }

    examSchedule = () => {
        this.props.navigation.navigate("ScheduleLectureScreen", {
            token: this.state.token,
            isExam: true,
        });
    }

    render() {
        const {isModalSalaryVisible, isModalProfileVisible, lecture, isLoading, luong} = this.state;
        if (isLoading) {
            return (<View style={{flex: 1, justifyContent: "center"}}>
                <ActivityIndicator
                    animating={this.state.isLoading}
                    size="large"
                    color="#0000ff"
                />
            </View>)
        }
        return (
            <>
                <Container>
                    {isModalSalaryVisible || isModalProfileVisible ? <Image
                        style={{width: '100%', opacity: 0.8, position: 'absolute', zIndex: 999}}
                        source={require('../assets/images/black-background.png')}/> : <></>}
                    <Header>
                        <Left>
                            <Button
                                transparent
                                iconLeft
                                style={{height: 30, marginRight: 15}}
                                onPress={this.onClickMenu}
                            >
                                <Icon name="menu" style={{color: "#fff"}}/>
                            </Button>
                        </Left>
                        <Body/>
                        <Right>
                            <TouchableOpacity activeOpacity={0.6} onPress={this.logout}>
                                <Text style={{marginRight: 10, fontSize: 15, color: "#fff"}}>Đăng xuất</Text>
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <Content>
                        <View style={styles.header}/>
                        <Image
                            style={styles.avatar}
                            source={{
                                uri: lecture.img,
                            }}
                        />
                        <View style={styles.body}>
                            <View style={styles.bodyContent}>
                                <Text style={styles.name}>{lecture.ten}</Text>
                                <TouchableOpacity onPress={this.toggleModalProfile}>
                                    <Text style={styles.info}>Xem thông tin chi tiết</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this.lectureSchedule}
                                    style={[styles.buttonContainer, {backgroundColor: "#a2cc5a"}]}
                                >
                                    <Text style={{fontSize: 15, color: "#fff"}}>
                                        Xem lịch dạy
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.examSchedule} style={styles.buttonContainer}>
                                    <Text style={{fontSize: 15, color: "#fff"}}>
                                        Xem lịch coi thi
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={[styles.buttonContainer, {backgroundColor: "#e04f4f"}]}
                                    onPress={this.toggleModalSalary}
                                >
                                    <Text style={{fontSize: 15, color: "#fff"}}>
                                        Xem bảng lương
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Content>
                </Container>
                <Modal
                    transparent={true}
                    animationType={"slide"}
                    visible={isModalProfileVisible}
                >
                    <View style={{
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.8)'
                    }}>
                        <View style={[styles.modalInsideView, {backgroundColor: '#efefef', height: 550}]}>
                            <Content style={styles.profileContent}>
                                <List style={{margin: 0}}>
                                    <ListItem style={styles.profileFields}>
                                        <Text>Ngày sinh: {lecture.ngaySinh}</Text>
                                    </ListItem>
                                    <ListItem style={styles.profileFields}>
                                        <Text>Giới tính: {lecture.gioiTinh}</Text>
                                    </ListItem>
                                    <ListItem style={styles.profileFields}>
                                        <Text>Nơi sinh: {lecture.noiSinh}</Text>
                                    </ListItem>
                                    <ListItem style={styles.profileFields}>
                                        <Text>Đơn vị: {lecture.donVi}</Text>
                                    </ListItem>
                                    <ListItem style={styles.profileFields}>
                                        <Text>Loại nhân sự: {lecture.loaiNhanSu}</Text>
                                    </ListItem>
                                    <ListItem style={styles.profileFields}>
                                        <Text>Chức vụ: {lecture.chucVu}</Text>
                                    </ListItem>
                                    <ListItem style={styles.profileFields}>
                                        <Text>Phòng ban: {lecture.phongBan}</Text>
                                    </ListItem>
                                    <ListItem style={styles.profileFields}>
                                        <Text>Tổ bộ môn: {lecture.toBoMon}</Text>
                                    </ListItem>
                                </List>
                            </Content>
                            <TouchableOpacity
                                style={[styles.buttonContainer, styles.buttonClose, {
                                    backgroundColor: "#e04f4f",
                                    width: 100
                                }]}
                                onPress={this.toggleModalProfile}
                            >
                                <Text style={{fontSize: 15, color: "#fff"}}>
                                    Đóng
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    transparent={true}
                    animationType={"slide"}
                    visible={isModalSalaryVisible}
                >
                    <View style={{
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.8)'
                    }}>
                        <View style={styles.modalInsideView}>
                            <View style={styles.salaryContent}>
                                {luong != null ? <>
                                    <Text style={styles.titleSalary}>Các khoản thu nhập: </Text>
                                    <List>
                                        <ListItem
                                            itemDivider
                                            style={{flexDirection: "column"}}
                                        >
                                            <View style={styles.bodyListView}>
                                                <Text style={styles.bodyRowText}>Nội dung</Text>
                                                <Text style={styles.bodyRowText}>Số tiền</Text>
                                                <Text style={styles.bodyRowText}>Tính thuế</Text>
                                            </View>
                                            {luong.luong.map(l => (
                                                <View style={styles.data}>
                                                    <Text style={styles.dataRowText}>{l.noiDung}</Text>
                                                    <Text style={styles.dataRowText}>{l.soTien}</Text>
                                                    <Text style={styles.dataRowText}>{l.tinhThue}</Text>
                                                </View>))}
                                        </ListItem>
                                    </List>
                                    <Text style={styles.titleSalary}>Các khoản khấu trừ: </Text>
                                    <List>
                                        <ListItem
                                            itemDivider
                                            style={{flexDirection: "column"}}
                                        >
                                            <View style={styles.bodyListView}>
                                                <Text style={styles.bodyRowText}>Nội dung</Text>
                                                <Text style={styles.bodyRowText}>Số tiền</Text>
                                                <Text style={styles.bodyRowText}>Tính thuế</Text>
                                            </View>
                                            {luong.khauTru.map(l => (
                                                <View style={styles.data}>
                                                    <Text style={styles.dataRowText}>{l.noiDung}</Text>
                                                    <Text style={styles.dataRowText}>{l.soTien}</Text>
                                                    <Text style={styles.dataRowText}>{l.tinhThue}</Text>
                                                </View>))}
                                        </ListItem>
                                    </List>
                                    <Text style={[styles.titleSalary, {fontWeight: 'bold', marginTop: 10}]}>Thực lãnh
                                        lương cơ bản: {luong.luongCoBan}</Text>
                                    <Text style={[styles.titleSalary, {fontWeight: 'bold'}]}>Thực lãnh lương tăng
                                        thêm: {luong.luongTang}</Text>
                                </> : <Text style={styles.titleSalary}>Lương tháng hiện tại chưa có.</Text>
                                }
                            </View>
                            <TouchableOpacity
                                style={[styles.buttonContainer, styles.buttonClose, {
                                    backgroundColor: "#e04f4f",
                                    width: 100
                                }]}
                                onPress={this.toggleModalSalary}
                            >
                                <Text style={{fontSize: 15, color: "#fff"}}>
                                    Đóng
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </>

        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00BFFF",
        height: 200,
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
        alignSelf: "center",
        position: "absolute",
        marginTop: 130,
    },
    name: {
        fontSize: 22,
        color: "#000",
        fontWeight: "600",
    },
    body: {
        marginTop: 40,
    },
    bodyContent: {
        flex: 1,
        alignItems: "center",
        padding: 30,
    },
    // name: {
    //   fontSize: 28,
    //   color: "#696969",
    //   fontWeight: "600",
    // },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginBottom: 10,
        textDecorationLine: "underline",
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: "center",
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 5,
        width: 350,
        borderRadius: 10,
        backgroundColor: "#00BFFF",
    },
    modalInsideView: {
        // alignItems: 'flex-start',
        backgroundColor: "#fff",
        height: 400,
        width: '90%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#c7c7c7'
    },
    profileContent: {
        paddingTop: 10,
        paddingRight: 20,
    },
    profileFields: {
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
    },
    salaryContent: {
        padding: 10,
    },
    buttonClose: {
        alignSelf: 'center'
    },
    bodyListView: {
        flexDirection: "row"
    },
    data: {
        borderColor: "#d3d3d3",
        borderWidth: 1,
        flexDirection: "row"
    },
    bodyRowText: {
        flex: 1,
        fontSize: 10,
        textAlign: "center"
    },
    dataRowText: {
        flex: 1,
        fontSize: 10,
        fontWeight: "700",
        textAlign: "center"
    },
    titleSalary: {
        marginBottom: 10,
        color: '#000',
        fontSize: 16,
        fontWeight: '600'
    }
});
