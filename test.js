const api = require('./index');
api.init('user', 'pass');
api.createOrder(454, 12, '/return', '/fail');