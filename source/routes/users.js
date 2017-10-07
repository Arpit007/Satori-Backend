const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.post('/login', function (req, res) {
    let xUser = null;
    User.Register(req.body.Number)
        .then(function (user) {
            xUser = user;
            if (typeof req.body.Contacts === 'string')
                req.body.Contacts = JSON.parse(req.body.Contacts);
            return user.GetContacts(req.body.Contacts)
                .then(function (contacts) {
                    res.json({ head : { code : Codes.Success, message : "Success" }, body : { contacts : contacts } });
                })
                .catch(function (e) {
                    throw User.ErrorCodes.Failed;
                });
        })
        .catch(function (e) {
            if (xUser) {
                return user.LogOut()
                    .then(function () {
                        res.json({ head : { code : Codes.Failed, message : e.toString() }, body : {} });
                    });
            }
            else res.json({ head : { code : Codes.Failed, message : e.toString() }, body : {} });
        });
});

router.post('/logout', function (req, res) {
    User.getUser(req.body.Number)
        .then(function (user) {
            return user.LogOut()
                .then(function () {
                    res.json({ head : { code : Codes.Success, message : "Success" }, body : {} });
                });
        })
        .catch(function (e) {
            res.json({ head : { code : Codes.Failed, message : e.toString() }, body : {} });
        });
});

router.post('/getContacts', function (req, res) {
    User.getUser(req.body.Number)
        .then(function (user) {
            if (typeof req.body.Contacts === 'string')
                req.body.Contacts = JSON.parse(req.body.Contacts);
            return user.GetContacts(req.body.Contacts)
                .then(function (contacts) {
                    res.json({ head : { code : Codes.Success, message : "Success" }, body : { contacts : contacts } });
                });
        })
        .catch(function (e) {
            res.json({ head : { code : Codes.Failed, message : e.toString() }, body : {} });
        });
});

router.post('/isOnline', function (req, res) {
    if (Clients[req.body.Number])
        res.json({ head : { code : 200, message : "Success" }, body : { status : "Online" } });
    else res.json({ head : { code : 400, message : "Failed" }, body : {} });
});

module.exports = router;
