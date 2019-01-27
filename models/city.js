const mongoose = require('mongoose');


const citySchema = mongoose.Schema({
    name: {type: String, unique: true},
    country: {type: String, unique:true},
    image: {type: String, unique: true},
    restro: [{
        username: {type: String, default: ''},
        name: {type: String, default: ''},
        restroId: {type: mongoose.Schema.Types.ObjectId , ref: 'City'},
        image: {type:String, default: ''}
    }],
});

module.exports = mongoose.model('city', citySchema);