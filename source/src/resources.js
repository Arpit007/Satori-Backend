/**
 * Created by Home Laptop on 08-Oct-17.
 */
const fs = require('fs');
const path = require('path');

const listResource = (dir, refPath = '/images/art', List = {}) => {
    fs.readdirSync(dir).forEach(folder => {
        let array = [];
        let tempPath = refPath + "/" + folder + "/";
        let fetchPath = path.join(dir,  folder);
        fs.readdirSync(fetchPath).forEach(file => {
            if (!fs.lstatSync(path.join(fetchPath,file)).isDirectory())
                array.push(tempPath + file);
        });
        List[ folder ] = array;
    });
    return List;
};

const listAvailable = function (dir, Files = []) {
    const Reply = {};
    Files.forEach(file => {
        Reply[ file ] = fs.existsSync(path.join(dir, file));
    });
    return Reply;
};

module.exports.listResource = listResource;
module.exports.listAvailable = listAvailable;