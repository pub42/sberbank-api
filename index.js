let userName;
let password;
const orderLink = "https://3dsec.sberbank.ru/payment/rest/register.do";

module.exports = {
    init: function (userName, password) {
        if (!userName)
            return {error: {message: 'Username is required!'}};
        if (!password)
            return {error: {message: 'Password is required!'}};
        this.userName = userName;
        this.password = password;
    },

    createOrder: function (orderNumber, amount, returnUrl, failUrl, currency, description, language, pageView, clientId,
                           merchantLogin, jsonParams, sessionTimeout, expirationDate, bindingId, features) {
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

        sendRequest(orderLink, 'GET', params)
    }
};

function sendRequest(url, method, params) {
    let link = url + '?';

    for(let i in params) {
        if (params.hasOwnProperty(i))
            link += i + '=' + params[i] + '&';
    }

    if (params)
        link = link.substr(0, link.length - 1);

    console.log(link);

    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", url, false);
    xmlHttp.send();
    console.log(xmlHttp.responseText);
}