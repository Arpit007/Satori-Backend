/**
 * Created by Home Laptop on 07-Oct-17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResourceTypeSchema = new Schema({
    Type : { type : Number, required : true, index : true },
    Name : { type : String, required : true }
});

const ResourceType = mongoose.model('ResourceType', ResourceTypeSchema);

ResourceType.getResources = function () {
    return ResourceType.find({}, { _id : 0 });
};


function FillData() {
    ResourceType.create({ Type : 1, Name : "Eye" },
        { Type : 2, Name : "Nose" },
        { Type : 3, Name : "Moustache" },
        { Type : 4, Name : "Hat" },
        function (err) {
            if (err)
                console.log(err);
        });
}

ResourceType.find({})
    .count({})
    .then(function (count) {
        if (!count)
            FillData();
    });

module.exports = ResourceType;