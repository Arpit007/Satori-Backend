/**
 * Created by Home Laptop on 07-Oct-17.
 */
const express = require('express');
const router = express.Router();

const Resources = require('../model/resources');

router.get('/',function (req, res) {
   res.end('hi');
});

router.get('/all', function (req, res) {
    Resources.getAllResources()
        .then(function (resource) {
            res.json({ head : { code : Codes.Success, message : "Success" }, body : { res : resource } });
        })
        .catch(function (e) {
           console.log(e);
            res.json({ head : { code : Codes.Failed, message : e.toString() }, body : {} });
        });
});

router.post('/id', function (req, res) {
    if (typeof req.body.Ids === 'string')
        req.body.Ids = JSON.parse(req.body.Ids);
    
    Resources.getResourcesByID(req.body.Ids)
        .then(function (resource) {
           res.json({ head : { code : Codes.Success, message : "Success" }, body : { res : resource } });
       })
       .catch(function (e) {
           res.json({ head : { code : Codes.Failed, message : "Failed" }, body : {} });
       });
});

module.exports = router;