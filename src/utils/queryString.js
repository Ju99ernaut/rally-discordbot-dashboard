import querystring from 'querystring';

export default (params = {}) => {
    if (typeof params === 'object' && Object.keys(params).length) {
        return `?${querystring.stringify(params)}`;
    } else {
        console.log('Params should be a non empty object');
        return '';
    }
}