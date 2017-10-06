/**
 * Created by Home Laptop on 06-Oct-17.
 */
const Config = require('../config');
let io = require('socket.io');
const User = require('../model/user');

io = io.listen(Config.port);

io.on('connection', function (socket) {
    socket.on('verify', function (data) {
        User.getUser(data)
            .then(function (user) {
                if (!user)
                    socket.disconnect();
            })
            .catch(function (e) {
               socket.disconnect();
            })
            .then(setUp);
    });
});


const setUp = function (socket) {
    //Events Here
};