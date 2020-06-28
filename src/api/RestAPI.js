import BaseUrl from './BaseUrl';
import axios from 'axios';

const RestAPI = {
    doRestAPI: function (method, request, callback) {
        let url = BaseUrl.url;
        let requestInfo = {
            method: method,
            url: url
        }
        if (request !== null) {
            requestInfo.data = JSON.stringify(request);
        }
        axios(requestInfo).then(res => {
            callback(res.data);
        });
    },
    getPosts: function (callback) {
        this.doRestAPI("GET", null, callback);
    }
}

export default RestAPI;