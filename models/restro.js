const mongoose = require('mongoose');

const restroSchema = mongoose.Schema({
    username: {type: String, unique: true},
    name: {type: String, unique:true},
    city: {type: String, unique: true},
    state: {type: String, unique:true},
    country: {type: String, unique:true},
    rating: {type: Number, unique:true},
    image: {type: String, unique: true},
    menu: [{
        name:{type:String, unique:true},
        type: {type:String, unique:true},
        price: {type:String,unique:true},
        rating:{type:String,unique:true},
        image:{type:String,unique:true}
    }],
    speciality: {type:String, unique:true}
});

module.exports = mongoose.model('restro', restroSchema);