/**
 * Created by Home Laptop on 06-Oct-17.
 */
const Config = require('../config');
let io = require('socket.io');
const User = require('../model/user');

global.Clients = {};

module.exports = function (app) {
    io = io.listen(app);
    
    io.on('connection', function (socket) {
        console.log('Client Connected');
        socket.on('verify', function (data) {
            User.getUser(data)
                .then(function (user) {
                    if (!user)
                        socket.disconnect();
                    else {
                        socket.Number = data;
                        setUp(socket);
                    }
                })
                .catch(function (e) {
                    socket.disconnect();
                });
        });
    });
    
    
    const setUp = function (socket) {
        Clients[ socket.Number ] = socket;
        
        socket.on('disconnect', function () {
            delete Clients[ socket.Number ];
        });
        
        socket.on('peerStatus', function (data) {
            if (Clients[ data ])
                socket.emit('peerStatus', JSON.stringify({ peer : data, status : "Online" }));
            else socket.emit('peerStatus', JSON.stringify({ peer : data, status : "Offline" }));
        });
        //Write Events Here
        
    };
};