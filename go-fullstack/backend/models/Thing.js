const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
    title : {type:String, required:true},
    description : {type:String, required:true},
    imageUrl : {type:String, required:true},
    userId : {type:String, required:true},
    price : {type:Number, required:true},

})

module.exports = mongoose.model('Thing', thingSchema);


// imageUrl: "https://www.publicdomainpictures.net/pictures/10000/velka/1536-1249273362hbHb.jpg",
// imageUrl: "https://c.pxhere.com/photos/30/d6/photographer_camera_lens_slr_photography_hands-1079029.jpg!d",
