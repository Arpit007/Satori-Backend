const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.post('/login', function (req, res) {
    User.Register(req.body.Number)
        .then(function (user) {
            return user.UpdateContacts(JSON.parse(req.body.newContacts), JSON.parse(req.body.remContacts))
                .then(function (contacts) {
                    res.json({ head : { code : Codes.Success, message : "Success" }, body : { contacts : contacts } });
                })
                .catch(function (e) {
                    return user.LogOut()
                        .then(function () {
                            throw User.ErrorCodes.Failed;
                        });
                });
        })
        .catch(function (e) {
            res.json({ head : { code : Codes.Failed, message : e.toString() }, body : {} });
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

router.post('/addContacts', function (req, res) {
    User.getUser(req.body.Number)
        .then(function (user) {
            return user.UpdateContacts(JSON.parse(req.body.newContacts), JSON.parse(req.body.remContacts))
                .then(function (contacts) {
                    res.json({ head : { code : Codes.Success, message : "Success" }, body : { contacts : contacts } });
                });
        })
        .catch(function (e) {
            res.json({ head : { code : Codes.Failed, message : e.toString() }, body : {} });
        });
});

router.post('/getContacts', function (req, res) {
    User.getUser(req.body.Number)
        .then(function (user) {
            return user.GetContacts()
                .then(function (contacts) {
                    res.json({ head : { code : Codes.Success, message : "Success" }, body : { contacts : contacts } });
                });
        })
        .catch(function (e) {
            res.json({ head : { code : Codes.Failed, message : e.toString() }, body : {} });
        });
});

module.exports = router;
