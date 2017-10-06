/**
 * Created by Home Laptop on 06-Oct-17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    Number : { type : String, required : true, index : true },
    Contacts : [ { type : String } ]
});

UserSchema.methods.LogOut = function () {
    return this.remove()
        .catch(function (e) {
            console.log(e);
            throw User.ErrorCodes.Failed;
        })
        .then(function () {
            return true;
        });
};

UserSchema.methods.GetContacts = function () {
    let Contacts = [];
    let promise = Promise.resolve("");
    const user = this;
    user.Contacts.forEach(function (contact) {
        promise = promise.then(function () {
            return User.findOne({ Number : contact })
                .then(function (tempUser) {
                    if (tempUser)
                        Contacts.push(tempUser.Number);
                });
        });
    });
    return promise.then(function () {
        return Contacts;
    }).catch(function (e) {
        console.log(e);
        throw User.ErrorCodes.Failed;
    });
};

UserSchema.methods.UpdateContacts = function (AddContacts = [], RemoveContacts = []) {
    const user = this;
    try {
        RemoveContacts.forEach(function (contact) {
            let index = user.Contacts.indexOf(contact);
            if (index !== -1)
                user.Contacts.splice(index, 1);
        });
        AddContacts.forEach(function (contact) {
            if (user.Contacts.indexOf(contact) === -1)
                user.Contacts.push(contact);
        });
    }
    catch (e) {
        throw User.ErrorCodes.Failed;
    }
    
    return user.save()
        .then(function () {
            return user.GetContacts();
        })
        .catch(function (e) {
            console.log(e);
            throw User.ErrorCodes.Failed;
        });
};

const User = mongoose.model('User', UserSchema);

User.Register = function (Number) {
    return User.find({ Number : Number })
        .count({})
        .catch(function (e) {
            console.log(e);
            throw User.ErrorCodes.Failed;
        })
        .then(function (count) {
            if (count > 0)
                throw User.ErrorCodes.Exists;
        })
        .then(function () {
            const user = new User();
            user.Number = Number;
            return user.save()
                .then(function () {
                    return user;
                })
                .catch(function (e) {
                    console.log(e);
                    throw User.ErrorCodes.Failed;
                });
        });
};

User.getUser = function (Number) {
    return User.findOne({ Number : Number })
        .catch(function (e) {
            console.log(e);
            throw User.ErrorCodes.Failed;
        })
        .then(function (user) {
            if (!user)
                throw User.ErrorCodes.DoesNotExists;
            return user;
        });
};

User.ErrorCodes = {
    Exists : "User Exists",
    DoesNotExists : "User Does Not Exists",
    Failed : "Failed"
};

module.exports = User;
