let base = window.location.origin.indexOf("localhost") || window.location.origin.indexOf("192") > -1 ? "https://findw.co.kr" : window.location.origin;
// let base = window.location.origin;

export default {
    url: base + '/api',
    timeout: 6 * 1000 * 10 * 10 * 2, // 20분
};