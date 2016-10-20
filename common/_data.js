/**
 * Created by kylejohnson on 26/09/2016.
 * A thin data layer
 */
module.exports = {
    token: '',
    type: '',

    status: function (response) { //handle ajax requests
        if (response.status >= 200 && response.status < 300) {
            return Promise.resolve(response);
        } else {
            response.text()
                .then((err)=> {
                    log(response.url, response.status, err);
                });
            return Promise.reject(response);
        }
    },

    get: function (url, data) {
        return this._request('get', url, data || null);
    },

    dummy: function (data) {
        return function () {
            return new Promise(function (resolve) {
                resolve(data);
            });
        };
    },

    put: function (url, data) {
        return this._request('put', url, data);
    },

    post: function (url, data) {
        return this._request('post', url, data);
    },

    delete: function (url, data) {
        return this._request('delete', url, data);
    },

    _request: function (method, url, data) {
        var options = {
                timeout: 60000,
                method: method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8'
                }
            },
            req;

        if (window.token) { //add auth tokens to headers of all requests
            options.headers['Authorization'] = window.token;
        }

        if (data) {
            options.body = JSON.stringify(data);
        } else if (method == "post" || method == "put") {
            options.body = "{}";
        }

        req = fetch(url, options);
        return req
            .then(this.status)
            .then(function (response) { //always return json
                if (response._body)
                    return response.json();
            })
            .then(function (response) {
                log(url, 200, response);
                if (!response || !response.error)
                    return response;
                else {
                    return Promise.reject(response);
                }
            });

    },

    setToken: function (_token) {//set the token for future requests
        this.token = _token;
    }
};
