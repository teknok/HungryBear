const mongoose = require('mongoose');


const citySchema = mongoose.Schema({
    name: {type: String, unique: true},
    state: {type: String, unique:true},
    country: {type: String, unique:true},
    num: {type: String, unique: true},
    image: {type: String, unique: true},
    restro: [{
        restroId: {type: mongoose.Schema.Types.ObjectId , ref: 'City'},
        name : {type:String, default: ''},
        image: {type:String, default: ''}
    }],
});

module.exports = mongoose.model('city', citySchema);