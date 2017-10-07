/**
 * Created by Home Laptop on 07-Oct-17.
 */
const express = require('express');
const router = express.Router();
const path = require('path');

const Resources = require('../src/resources');

router.get('/all', function (req, res) {
    try {
        res.json({
            head : { code : Codes.Success, message : "Success" },
            body : { res : Resources.listResource(path.join(__dirname, '../../public/images/art')) }
        });
    }
    catch (e) {
        console.log(e);
        res.json({ head : { code : Codes.Failed, message : e.toString() }, body : {} });
    }
});

router.post('/id', function (req, res) {
    if (typeof req.body.Ids === 'string')
        req.body.Ids = JSON.parse(req.body.Ids);
    try {
        res.json({
            head : { code : Codes.Success, message : "Success" },
            body : { res : Resources.listAvailable(path.join(__dirname, '../../public'), req.body.Ids) }
        });
    }
    catch (e) {
        console.log(e);
        res.json({ head : { code : Codes.Failed, message : e.toString() }, body : {} });
    }
});

module.exports = router;