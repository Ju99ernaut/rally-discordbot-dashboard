import fetch from './fetch';
import config from '@/config';
import queryString from './queryString';

export default (endpoint, params = {}, clb = () => {}) => {
    fetch(`${config.coingeckoApi}/${endpoint}${queryString(params)}`)
        .then((res) => res.json())
        .then((response) => {
            clb(response);
        })
        .catch(() => console.log("Failed to get market data."));
};