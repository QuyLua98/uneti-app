// import React from 'react';
// import axios from 'axios';
// import {connect} from 'react-redux';
// import * as RootNavigation from '../../navigation/LeftDrawerNavigator';
// import {logout} from "../../store/auth/action";
// import {Config} from "../../config"
//
// let request;
// const domain = Config.CHAT_DOMAIN;
//
// const ChatRequest = (props) => {
//     request = axios.create({
//         baseURL: domain,
//         timeout: 1000 * 60 * 5,
//     });
//
//     request.interceptors.response.use(response => {
//         return response.data;
//     }, error => {
//
//         if (error && error.response && error.response.status === 401) {
//             props.logout();
//             RootNavigation.navigate("ChattingLogin")
//         }
//         return Promise.reject(error);
//     });
//
//     request.interceptors.request.use(function (config) {
//         if (props.auth.signedIn) {
//             const accessToken = props.auth.token;
//             config.headers = {
//                 'Authorization': `Bearer ${accessToken}`,
//             }
//         }
//         return config;
//
//     }, function (error) {
//         return Promise.reject(error);
//     });
//
//     const getConversationById = (conId) => {
//         return request.get(`${domain}/conversation/${conId}`);
//     }
//
//
// }
//
// const mapStateToProps = state => ({
//     auth: state.auth
// });
// const mapDispatchToProps = {logout};
// export default connect(mapStateToProps, mapDispatchToProps)(ChatRequest);
