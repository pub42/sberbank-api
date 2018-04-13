const request = require('  request');

const orderLink = "https://3dsec.sberbank.ru/payment/rest/register.do";

module.exports = {
    /**
     * Function to initialize sberbank data in module
     * @param userName
     * @param password
     * @returns {*}
     */
    init: function (userName, password) {
        if (!userName)
            return {error: {message: 'Username is required!'}};
        if (!password)
            return {error: {message: 'Password is required!'}};
        this.userName = userName;
        this.password = password;
    },

    /**
     * Look Sberbank API REST
     * @param orderNumber
     * @param amount
     * @param returnUrl
     * @returns {*}
     */
    createOrder: function (orderNumber, amount, returnUrl) {
        if (!this.password || !this.username)
            return {error: {message: 'First initialize!'}};

        let params = {};
        params.userName = this.userName;
        params.password = this.password;

        if (!orderNumber)
            return {error: {message: 'Order number is required!'}};
        if (!amount)
            return {error: {message: 'Amount is required!'}};
        if (!returnUrl)
            return {error: {message: 'Return url is required!'}};

        params.orderNumber = orderNumber;
        params.amount = amount;
        params.returnUrl = returnUrl;

        const argsName = ['failUrl', 'currency', 'description', 'language',
            'pageView', 'clientId', 'merchantLogin', 'jsonParams', 'sessionTimeout', 'expirationDate', 'bindingId',
            'features'];

        argsName.forEach((e, i) => {
            if (arguments[i + 3])
                params[e] = arguments[i + 3];
        });

        return sendRequest(orderLink, 'GET', params);
    }
};

/**
 * Private method to to send requests
 * @param url
 * @param method
 * @param params
 * @returns {Promise<String>}
 */
function sendRequest(url, method, params) {
    return new Promise(resolve => {
        let link = url + '?';

        for (let i in params) {
            if (params.hasOwnProperty(i))
                link += i + '=' + params[i] + '&';
        }

        if (params)
            link = link.substr(0, link.length - 1);

        request(link, function (err, res, body) {
            resolve(body.toString());
        });
    });
}
