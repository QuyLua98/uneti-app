import axios from 'axios';
import {Config as Configs} from "../config";
import {connect} from 'react-redux';

const createRequest = (baseURL) => {

    let timeout = 1000*60*5;
    const request = axios.create({
        baseURL: baseURL,
        timeout: timeout,

    });

    request.interceptors.response.use(response => {
        return response.data;
    }, error => {

        /**
         * perform redirect to login page when server response with status 401 ( un authorization )
         *
         */
        if (error && error.response && error.response.status == 401) {
            auth.logout(); // call logout to remove current user & token.
            router.push({path: pages.login.path});
        }
        return Promise.reject(error);
    });

    request.interceptors.request.use(function (config) {

        /**
         * add Authorization header to request if user authenticated, run before sent request
         */
        if (auth.isAuthenticated()) {
            const accessToken = auth.getAccessToken();
            config.headers = {
                'Authorization': `Bearer ${accessToken}`,
            }
        }
        return config;

    }, function (error) {
        return Promise.reject(error);
    });

    return request;
};

 createRequest(Configs.CHAT_DOMAIN);
const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(createRequest);
