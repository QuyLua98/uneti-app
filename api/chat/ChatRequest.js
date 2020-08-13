import React from 'react';
import axios from 'axios';
import {Config as Configs} from "../config";
import {connect} from 'react-redux';
import * as RootNavigation from '../../navigation/LeftDrawerNavigator';
import {logout} from "../../store/auth/action";

class ChatRequest extends React.Component {
    constructor(props) {
        super(props);
        const timeout = 1000 * 60 * 5;
        const request = axios.create({
            baseURL: Configs.CHAT_DOMAIN,
            timeout: timeout,
        })

        request.interceptors.response.use(response => {
            return response.data;
        }, error => {

            if (error && error.response && error.response.status === 401) {
                this.props.logout();
                RootNavigation.navigate("ChattingLogin")
            }
            return Promise.reject(error);
        });

        request.interceptors.request.use(function (config) {
            if (this.props.auth.signedIn) {
                const accessToken = this.props.auth.token;
                config.headers = {
                    'Authorization': `Bearer ${accessToken}`,
                }
            }
            return config;

        }, function (error) {
            return Promise.reject(error);
        });
    };
}

const mapStateToProps = state => ({
    auth: state.auth
});
const mapDispatchToProps = {logout};
export default connect(mapStateToProps, mapDispatchToProps)(ChatRequest);
