import fetch from './fetch';
import { isUndefined, isFunction } from 'underscore';

export default ({
    fetch,

    defaults: {
        params: {},
        beforeSend() {},
        onComplete() {},
        headers: {
            /*Token {SOME_TOKEN}*/
        },
        contentTypeJson: false,
        credentials: 'include',
        fetchOptions: ''
    },

    /**
     * Triggered before the request is started
     * @private
     */
    onStart() {
        const before = this.defaults.beforeSend;
        before && before();
    },

    /**
     * Triggered on request error
     * @param  {Object} err Error
     * @param  {Function} [clbErr] Error callback
     * @private
     */
    onError(err, clbErr) {
        if (clbErr) {
            clbErr(err);
        } else {
            console.error(err);
        }
    },

    /**
     * Triggered on request response
     * @param  {string} text Response text
     * @private
     */
    onResponse(text, clb) {
        const complete = this.defaults.onComplete;
        const typeJson = this.defaults.contentTypeJson;
        const parsable = text && typeof text === 'string';
        const res = typeJson && parsable ? JSON.parse(text) : text;
        complete && complete(res);
        clb && clb(res);
    },

    /**
     * Request POST method
     * @param {String} url Requst url
     * @param {Object} data Object to post in request
     * @param {Function} clb Callback function on success
     * @param {Function} clbErr Callback function on error
     */
    post(url, data, clb, clbErr) {
        const body = {};

        for (let key in data) {
            body[key] = data[key];
        }

        this.request(url, {
            body
        }, clb, clbErr);
    },

    /**
     * Request PUT method
     * @param {String} url Requst url
     * @param {Object} data Object to post in request
     * @param {Function} clb Callback function on success
     * @param {Function} clbErr Callback function on error
     */
    put(url, data, clb, clbErr) {
        const body = {};

        for (let key in data) {
            body[key] = data[key];
        }

        this.request(url, {
            body: body,
            method: 'put'
        }, clb, clbErr);
    },

    /**
     * Request PATCH method
     * @param {String} url Requst url
     * @param {Object} data Object to post in request
     * @param {Function} clb Callback function on success
     * @param {Function} clbErr Callback function on error
     */
    patch(url, data, clb, clbErr) {
        const body = {};

        for (let key in data) {
            body[key] = data[key];
        }

        this.request(url, {
            body: body,
            method: 'patch'
        }, clb, clbErr);
    },

    /**
     * Request GET method
     * @param {String} url Requst url
     * @param {Function} clb Callback function on success
     * @param {Function} clbErr Callback function on error
     */
    get(url, clb, clbErr) {
        this.request(url, {
            method: 'get'
        }, clb, clbErr);
    },

    /**
     * Request DELETE method
     * @param {String} url Requst url
     * @param {Function} clb Callback function on success
     * @param {Function} clbErr Callback function on error
     */
    del(url, clb, clbErr) {
        this.request(url, {
            method: 'delete'
        }, clb, clbErr);
    },

    /**
     * Execute remote request
     * @param  {string} url Url
     * @param  {Object} [opts={}] Options
     * @param  {Function} [clb=null] Callback
     * @param  {Function} [clbErr=null] Error callback
     * @private
     */
    request(url, opts = {}, clb = null, clbErr = null) {
        const typeJson = this.defaults.contentTypeJson;
        const headers = this.defaults.headers || {};
        const params = this.defaults.params;
        //const reqHead = 'X-Requested-With';
        const typeHead = 'Content-Type';
        const bodyObj = opts.body || {};
        let fetchOptions;
        let body;

        for (let param in params) {
            bodyObj[param] = params[param];
        }

        //if (isUndefined(headers[reqHead])) {
        //    headers[reqHead] = 'XMLHttpRequest';
        //}

        // With `fetch`, have to send FormData without any 'Content-Type'
        // https://stackoverflow.com/questions/39280438/fetch-missing-boundary-in-multipart-form-data-post

        if (isUndefined(headers[typeHead]) && typeJson) {
            headers[typeHead] = 'application/json; charset=utf-8';
        }

        if (typeJson) {
            body = JSON.stringify(bodyObj);
        } else {
            body = new FormData();

            for (let bodyKey in bodyObj) {
                body.append(bodyKey, bodyObj[bodyKey]);
            }
        }
        fetchOptions = {
            method: opts.method || 'post',
            credentials: this.defaults.credentials,
            headers
        };

        // Body should not be included on GET and DELETE method
        if (fetchOptions.method !== 'get' && fetchOptions.method !== 'delete') {
            fetchOptions.body = body;
        }

        const fetchOpts = this.defaults.fetchOptions || {};
        const addOpts = isFunction(fetchOpts) ?
            fetchOpts(fetchOptions) :
            fetchOptions;

        this.onStart();
        this.fetch(url, {
                ...fetchOptions,
                ...(addOpts || {})
            })
            .then(res =>
                ((res.status / 200) | 0) == 1 ?
                res.text() :
                res.text().then(text => Promise.reject(text))
            )
            .then(text => this.onResponse(text, clb))
            .catch(err => this.onError(err, clbErr));
    }
});