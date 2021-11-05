let real_url = 'https://www.nowmedia.co.kr';
let test_url = 'https://www.nowmedia.co.kr';
let base = window.location.href.indexOf(real_url) > -1 ? real_url : window.location.href.indexOf(test_url) > -1 ? test_url : real_url;

export default {
    url: base + '/api',
    timeout: 6 * 1000 * 10 * 10 * 2, // 20분
};