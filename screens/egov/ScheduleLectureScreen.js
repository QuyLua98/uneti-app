import * as React from "react";
import {EGOV_TOKEN} from "../../constants/Constants";
import {Config} from "../../config";
import ScheduleLectureItem from "../../components/ScheduleLectureItem";
import {StyleSheet, ActivityIndicator, Alert} from 'react-native';
import {
    View,
    Container,
    Header,
    Left,
    Body,
    Button,
    Icon,
    Title,
    Content,
    DatePicker,
} from "native-base";
import moment from "moment";
import axios from "axios";

export default class ScheduleLectureScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isExam: false,
            schedule: []
        }
    }

    componentDidMount() {
        const {token, isExam} = this.props.route.params;
        this.setState({token: token, isExam: isExam});
    }

    onDateChange = (date) => {
        this.setState({isLoading: true});
        let param = moment(date).format("YYYY-MM-DD").toString();

        const headers = {
            [EGOV_TOKEN]: this.state.token,
        };
        let url;
        if (this.state.isExam) {
            url = Config.MAIN_DOMAIN + `/api/egov/xem-lich-thi-theo-tuan?date=${param}`;
        } else {
            url = Config.MAIN_DOMAIN + `/api/egov/xem-lich-day-theo-tuan?date=${param}`;
        }
        axios
            .get(url, {headers})
            .then((res) => {
                this.setState({schedule: res.data});
                this.setState({isLoading: false});
            })
            .catch(() => {
                Alert.alert("Có lỗi xảy ra", "Tải thông tin thất bại!Xin thử lại!");
                this.setState({isLoading: false});
                this.props.navigation.goBack();
            });
    };

    onClickGoBack = () => {
        this.props.navigation.goBack();
    }

    _loadingBlock() {
        return (
            <View style={{flex: 1, justifyContent: "center"}}>
                <ActivityIndicator
                    animating={this.state.isLoading}
                    size="large"
                    color="#0000ff"
                />
            </View>
        );
    }

    render() {
        const {schedule, isExam} = this.state;
        return (
            <Container style={{backgroundColor: '#f2f2f2'}}>
                <Header>
                    <Left>
                        <Button transparent onPress={this.onClickGoBack}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>Lịch {isExam ? "coi thi" : "dạy"}</Title>
                    </Body>
                </Header>
                <View style={styles.datePicker}>
                    <DatePicker
                        defaultDate={new Date()}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText="Vui lòng chọn một ngày trong tuần "
                        placeHolderTextStyle={{fontSize: 18, color: '#0019ff'}}
                        textStyle={{fontSize: 18, color: '#0019ff'}}
                        onDateChange={this.onDateChange}
                    />
                    <View style={{alignItems: 'center', justifyContent: "center"}}>
                        <Icon name="calendar"/>
                    </View>
                </View>
                <View style={{height: 5, backgroundColor: "#E9EBEE"}}/>
                {this.state.isLoading ? this._loadingBlock() :
                    <Content style={{flex: 1}}>
                        <View>
                            {schedule === undefined || schedule.length === 0 ? (
                                <></>
                            ) : (
                                schedule.map((item) => {
                                    return item.listMonDay.map((item2, index) => {
                                        return (<ScheduleLectureItem
                                            key={index}
                                            date={item.ngayDay}
                                            thu={item.thu}
                                            buoi={item.buoi}
                                            schedule={item2}
                                        />)
                                    });
                                })
                            )}
                        </View>
                    </Content>}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    datePicker: {
        backgroundColor: '#fff',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});
