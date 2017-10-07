/**
 * Created by Home Laptop on 07-Oct-17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = mongoose.Types.ObjectId;

const resourceType = require('./resourceType');

const ResourceSchema = new Schema({
    Type : { type : Number, required : true, index : true },
    Url : { type : String, required : true }
});

const Resource = mongoose.model('Resource', ResourceSchema);

//Resource.create({Type:1, Url:'Hello'},{Type:1,Url:'hi'},{Type:3, Name:'Yooo'}, {Type: 4, Name: 'Wow'});

Resource.getResource = function (ID) {
    return Resource.findById(new ObjectID(ID))
        .then(function (resource) {
           return { ID : resource._id.str, Url : resource.Url };
        });
};

Resource.getAllResources = function () {
    return resourceType.getResources()
        .then(function (resourceTypes) {
            let Data = {};
            let promise = Promise.resolve("");
            resourceTypes.forEach(function (resourceType) {
                promise = promise.then(function () {
                    return Resource.find({ Type : resourceType.Type }, { Type : 0 })
                        .then(function (resources) {
                            let array = [];
                            resources.forEach(function (resource) {
                                array.push({ ID : resource._id.toString(), Url : resource.Url });
                            });
                            Data[ resourceType.Name ] = array;
                        });
                });
            });
            return promise.then(function () {
                return Data;
            });
        });
};

Resource.getResourcesByID = function (Ids) {
  let promise = Promise.resolve("");
  let Data = {};
  Ids.forEach(function (Id) {
     promise = promise.then(function () {
         return Resource.findById(new ObjectID(Id))
             .then(function (res) {
                if(res)
                    Data[Id] = res.Url;
             });
     }) ;
  });
  return promise.then(function () {
     return Data;
  });
};

module.exports = Resource;